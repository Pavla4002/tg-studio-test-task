import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Articles from "../../pages/Articles";
import Article from "../../pages/Article";
import AddArticle from "../../pages/AddArticle";
import ErrorPage from "../../pages/Error/ErrorPage";

const RouterApp: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Articles} />
                <Route path="/article/:id" Component={Article} />
                <Route path="/article/add" Component={AddArticle} />
                <Route path="*" Component={ErrorPage} />
            </Routes>
        </Router>
    );
};

export default RouterApp;
