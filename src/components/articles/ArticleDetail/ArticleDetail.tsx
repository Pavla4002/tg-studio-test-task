import React, {useEffect} from 'react';
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
    const demoStatus = useAppSelector((state: RootState) => state.demo.demo);
    const articleStatus = useAppSelector((state: RootState) => state.articles.status);
    const message= useAppSelector((state: RootState) => state.articles.error);
    const article = useAppSelector((state: RootState) =>
        !demoStatus ?  state.articles.article :  state.demo.articles.find(article => article.id=== Number(id)));

    console.log(article)

    useEffect(() => {
        if (!demoStatus){
            dispatch(fetchArticleById(Number(id)));
        }
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
