import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const apiUrl = 'http://localhost:8000/api/authors';


export const fetchAuthors = createAsyncThunk<Author[], void>(
    'articles/fetchAuthors',
    async () => {
        const response = await axios.get(apiUrl);
        return response.data;
    }
);

export const addAuthors = createAsyncThunk<Author, {name: string}>(
    'articles/addAuthors',
    async (author) => {
        const response = await axios.post(apiUrl, author);
        return response.data;
    }
);


export interface Author {
    id: number;
    name: string;
}

interface AppStateAuthors {
    authors: Author[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message: string,
    addMessage: string
}

const initialState: AppStateAuthors = {
    authors: [],
    status: 'idle',
    error: null,
    message: '',
    addMessage:''
};

const authorSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.addMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.authors = action.payload;
                state.message = 'Данные об авторах загружены успешно'
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
                state.message = 'Ошибка загрузки данных'
            })
            .addCase(addAuthors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addAuthors.fulfilled, (state) => {
                state.status = 'succeeded';
                state.message = 'Новый автор успешно добавлен'
                state.addMessage = 'Новый автор успешно добавлен'
            })
            .addCase(addAuthors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error occurred';
                state.message = 'Ошибка отправления данных'
            });
    },
});

export default authorSlice.reducer;
export const {resetMessage} = authorSlice.actions
