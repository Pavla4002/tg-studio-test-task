import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Articles from "../../pages/Articles";
import Article from "../../pages/ArticalPage/Article";
import AddArticle from "../../pages/AddArticle/AddArticle";
import ErrorPage from "../../pages/Error/ErrorPage";
import EditArticle from "../../pages/EditArticle/EditArticle";

const RouterApp: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Articles} />
                <Route path="/article/:id" Component={Article} />
                <Route path="/article/add" Component={AddArticle} />
                <Route path="/article/edit/:id" Component={EditArticle} />
                <Route path="*" Component={ErrorPage} />
            </Routes>
        </Router>
    );
};

export default RouterApp;
