import {Action, createSlice} from '@reduxjs/toolkit';
import {Article, clearMessages} from "../articlesSlice/articlesSlice";



interface AppStateDemo{
    demo: boolean,
    message: string,
    articles: Article[],
    delMessage: string;
    addMessage: string;
    editMessage: string;
}

const initialState: AppStateDemo = {
    demo: false,
    message:'',
    articles:[],
    delMessage:'',
    addMessage:'',
    editMessage:'',
};

const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        startEndDemo: (state) => {
            state.demo = !state.demo;
        },
        addArticleDemo: (state, action: {payload:Article}) => {
            let oldArr =  state.articles;
            state.articles = [...state.articles, action.payload];
            if (state.articles.length!==oldArr.length){
                state.addMessage ='Статья успешно добавлена'
            }else{
                state.addMessage ='Статья не добавлена'
            }
        },
        editArticleDemo: (state, action) => {
            state.demo = true;
        },
        delArticleDemo: (state, action) => {
            state.demo = true;
        },
        clearMessagesDemo: (state) => {
            state.addMessage = '';
            state.delMessage = '';
            state.editMessage = '';
        },
    },
    extraReducers: () => {},
});

export default demoSlice.reducer;
export const {startEndDemo,addArticleDemo,clearMessagesDemo} = demoSlice.actions;
