import React, {useEffect} from 'react';
import {useSelector } from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {fetchArticleById} from '../../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../../store/store';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import Load from "../../../shared/Loading";
import ErrorMessage from "../../../shared/Error";


const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const articleStatus = useAppSelector((state: RootState) => state.articles.status);
    const message= useAppSelector((state: RootState) => state.articles.error);
    const article = useSelector((state: RootState) =>
        state.articles.articles.find(a => a.id === Number(id))
    );

    useEffect(() => {
        dispatch(fetchArticleById(Number(id)));
    }, []);


    return (
        <>
            {
                articleStatus!== 'failed' ?
                    <>
                        {!article ? (
                            <Load/>
                        ) : (
                            <div>
                                <div className={styles.titleAuthorRow}>
                                    <h1 className={styles.title}>{article.title}</h1>
                                    <p>Author: {article.author?.name}</p>
                                </div>

                                <p>{article.text}</p>
                            </div>
                        )}
                    </>
                    :
                    <>
                        <ErrorMessage textError={message}/>
                    </>
            }
        </>
    );
};

export default ArticleDetail;
