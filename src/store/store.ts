import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articles/articlesSlice/articlesSlice';
import authorSlice from "./articles/articlesSlice/authorSlice";

const store = configureStore({
    reducer: {
        articles: articlesReducer,
        authors: authorSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
