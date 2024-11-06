import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Articles from "../../pages/Articles";
import Article from "../../pages/ArticlePage/Article";
import AddArticle from "../../pages/AddArticle/AddArticle";
import ErrorPage from "../../pages/Error/ErrorPage";
import EditArticle from "../../pages/EditArticle/EditArticle";

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
