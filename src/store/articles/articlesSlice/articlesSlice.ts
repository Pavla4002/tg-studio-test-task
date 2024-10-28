import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/articles';

export const fetchArticles = createAsyncThunk<Article[], void>(
    'articles/fetchArticles',
    async () => {
        const response = await axios.get(apiUrl); // AJAX-запрос
        console.log(response.data)
        return response.data; // Возвращаем данные
    }
);

export const fetchArticleById = createAsyncThunk('articles/fetchArticleById', async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data; // Возвращаем данные
});

interface Article {
    id: number;
    author_id: number;
    title: string;
    text?: string;
    author?: {
        id: number;
        name: string;
    };
}

interface ArticlesState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ArticlesState = {
    articles: [],
    status: 'idle',
    error: null,
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
            });
    },
});

export default articlesSlice.reducer;
