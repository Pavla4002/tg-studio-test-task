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


export interface Author {
    id: number;
    name: string;
}

interface AppStateAuthors {
    authors: Author[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    message: string
}

const initialState: AppStateAuthors = {
    authors: [],
    status: 'idle',
    error: null,
    message: ''
};

const authorSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
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
            });
    },
});

export default authorSlice.reducer;

