import React, {useEffect} from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/hooks';
import {fetchArticleById} from '../../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../../store/store';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const article = useSelector((state: RootState) =>
        state.articles.articles.find(a => a.id === Number(id))
    );


    useEffect(() => {
        dispatch(fetchArticleById(Number(id)));
    }, [article, dispatch]);


    return (
        <>
            {!article ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>{article.title}</h1>
                    <p>Author: {article.author?.name}</p>
                    <p>{article.text}</p>
                    <a href="/">Back to Articles</a>
                </div>
            )}
        </>

    );
};

export default ArticleDetail;
