import React, { useEffect } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchArticles } from '../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const article = useSelector((state: RootState) =>
        state.articles.articles.find(a => a.id === Number(id))
    );
    console.log(article)
    useEffect(() => {
        if (!article) {
            dispatch(fetchArticles());
        }
    }, [article, dispatch]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <p>Author: {article.author?.name}</p>
            <p>{article.text}</p>
            <a href="/">Back to Articles</a>
        </div>
    );
};

export default ArticleDetail;
