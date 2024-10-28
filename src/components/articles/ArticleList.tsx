import React, { useEffect } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchArticles } from '../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../store/store';

const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const articles = useSelector((state: RootState) => state.articles.articles);
    const articleStatus = useSelector((state: RootState) => state.articles.status);
    console.log(articles)
    useEffect(() => {
        if (articleStatus === 'idle') {
            dispatch(fetchArticles());
        }
    }, [articleStatus, dispatch]);

    return (
        <div>
            <h1>Articles</h1>
            <button>Create</button>
            <button>Demo</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.author?.name}</td>
                        <td>{article.title}</td>
                        <td>
                            <button><a href={`/article/${article.id}`}>Edit</a></button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArticleList;
