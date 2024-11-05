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
            state.articles = [];
            state.demo = !state.demo;
        },
        addArticleDemo: (state, action: {payload:Article}) => {
            if (state.articles.length<=3){
                let oldArr =  state.articles;
                state.articles = [...state.articles, action.payload];
                if (state.articles.length!==oldArr.length){
                    state.addMessage ='Статья успешно добавлена'
                }else{
                    state.addMessage ='Статья не добавлена'
                }
            }else{
                state.addMessage ='В режиме "Демо" можно добавить только 3 статьи'
            }
        },
        editArticleDemo: (state, action) => {
            const index = state.articles.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.articles[index] = {
                    ...state.articles[index],
                    ...action.payload
                };
                state.editMessage = 'Статья успешно отредактирована'
            }
        },
        delArticleDemo: (state, action) => {
            state.articles =  state.articles.filter((article)=>article.id!==action.payload);
            state.delMessage ='Статья удалена';
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
export const {startEndDemo,addArticleDemo,clearMessagesDemo,delArticleDemo,editArticleDemo} = demoSlice.actions;
