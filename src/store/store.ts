import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articles/articlesSlice/articlesSlice';
import authorSlice from "./authors/authorsSlice/authorSlice";
import demoSlice from "./demo/demoSlice/demoSlice";

const store = configureStore({
    reducer: {
        articles: articlesReducer,
        authors: authorSlice,
        demo: demoSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
