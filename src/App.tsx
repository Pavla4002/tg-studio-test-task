import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ArticleList from './components/articles/ArticleList';
import ArticleDetail from './components/articles/ArticleDetail';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/*<Switch>*/}
                <Route path="/" Component={ArticleList} />
                <Route path="/article/:id" Component={ArticleDetail} />
                {/*</Switch>*/}
            </Routes>
        </Router>

    );
};

export default App;
