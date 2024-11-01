import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articles/articlesSlice/articlesSlice';
import modalReducer from "./articles/ModalSlice/ModalSlice";

const store = configureStore({
    reducer: {
        articles: articlesReducer,
        modal: modalReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
