import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {strict} from "assert";

const apiUrl = 'http://localhost:8000/api/articles';

export const fetchArticles = createAsyncThunk<Article[], void>(
    'articles/fetchArticles',
    async () => {
        const response = await axios.get(apiUrl);
        return response.data;
    }
);

export const fetchArticleById = createAsyncThunk<Article, number>(
    'articles/fetchArticleById',
    async (id) => {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    }
);

export interface Article {
    id: number;
    author_id: number;
    title: string;
    text?: string;
    author?: {
        id: number;
        name: string;
    };
}

interface AppState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AppState = {
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
            })
            .addCase(fetchArticleById.pending, (state) => {
                    state.status = 'loading';
                })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = Array(action.payload);
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
            });
    },
});

export default articlesSlice.reducer;
