import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


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

export const deleteArticleById = createAsyncThunk<number, number>(
    'articles/deleteArticleById',
    async (id) => {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    }
);

export const addArticle = createAsyncThunk<number, { title: string; text?:string, author_id: number }>(
    'articles/addArticle',
    async (article) => {
        console.log(article)
        const response = await axios.post(apiUrl,article);
        return response.data;
    }
);

export const editArticle = createAsyncThunk<Article, Article>(
    'articles/editArticle',
    async (article) => {
        const response = await axios.put(`${apiUrl}/${article.id}`,article);
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
    isOpenModal: boolean;
    articleModal: Article | null;
    delMessage: string;
    addMessage: string;
    editMessage: string;
}

const initialState: AppState = {
    articles: [],
    status: 'idle',
    error: null,
    isOpenModal: false,
    articleModal: null,
    delMessage: '',
    addMessage: '',
    editMessage:'',
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpenModal = true;
            state.articleModal = action.payload;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
            state.articleModal = null;
        },
        clearMessages: (state) => {
            state.delMessage = '';
            state.addMessage = '';
            state.editMessage = '';
        },
    },
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
            })
            .addCase(deleteArticleById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteArticleById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = state.articles.filter(article => article.id!== Number(action.payload))
                state.delMessage = 'Статья успешно удалена';
            })
            .addCase(deleteArticleById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
                state.delMessage = action.error.message ||'Error occurred';
            })
            .addCase(addArticle.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addArticle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.addMessage = 'Статья успешно добавлена'
            })
            .addCase(addArticle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
            })
            .addCase(editArticle.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editArticle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.editMessage = 'Статья успешно обновлена'
            })
            .addCase(editArticle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
            });
    },
});

export default articlesSlice.reducer;
export const { openModal, closeModal, clearMessages} = articlesSlice.actions;
