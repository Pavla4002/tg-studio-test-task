import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Articles from "../../pages/ArticlesPages/AllArticles/Articles";
import Article from "../../pages/ArticlesPages/ArticlePage/Article";
import AddArticle from "../../pages/ArticlesPages/AddArticle/AddArticle";
import ErrorPage from "../../pages/Error/ErrorPage";
import EditArticle from "../../pages/ArticlesPages/EditArticle/EditArticle";

const RouterApp: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Articles/>} />
            <Route path="article/:id" element={<Article/>} />
            <Route path="article/add" element={<AddArticle/>} />
            <Route path="article/edit/:id" element={<EditArticle/>} />
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};

export default RouterApp;
