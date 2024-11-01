import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Articles from "../../pages/Articles";
import Article from "../../pages/Article";

const RouterApp: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Articles} />
                <Route path="/article/:id" Component={Article} />
            </Routes>
        </Router>

    );
};

export default RouterApp;
