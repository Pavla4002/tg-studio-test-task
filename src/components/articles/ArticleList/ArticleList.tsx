import React, { useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {Article, fetchArticles, openModal} from '../../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../../store/store';
import Button from "../../../shared/Button";
import styles from './index.module.scss';
import '../../../app/g-styles.scss';
import ModalWindow from "../../../shared/ModalWindow";
import Error from "../../../shared/Error";
import Load from "../../../shared/Loading";
import ArticlesTable from "../ArticlesTable";




const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state: RootState) => state.articles.articles);
    const articleStatus = useAppSelector((state: RootState) => state.articles.status);
    const message= useAppSelector((state: RootState) => state.articles.error);
    const statusModal = useAppSelector((state: RootState) => state.articles.isOpenModal);
    const articleModal = useAppSelector((state: RootState) => state.articles.articleModal);
    useEffect(() => {
        if (articleStatus === 'idle') {
            dispatch(fetchArticles());
        }
    }, [articleStatus, dispatch]);

    const openModalFunc = (article: Article) => {
        dispatch(openModal(article));
    };

    return (
        <>
            {articleStatus ==='failed' ? <Error textError={message}/>  :
                <>
                    { articleStatus!=='loading' ?
                        (<div>
                                <div className={styles.btnContainer}>
                                    <Button type={"button"}><div className={styles.addArticle}>Создать<span className={styles.smallPlus}>+</span></div></Button>
                                    <Button type={"button"}>Демо</Button>
                                </div>
                                    {articles.length>0 ?
                                        <ArticlesTable articles={articles}/>
                                        :
                                        <div className={styles.noDataBlock}><span>Нет данных для отображения.</span></div>
                                    }
                            </div>)
                        :
                        (<Load/>)
                    }

                    {statusModal && (
                        <ModalWindow articleModal={articleModal} status={statusModal}/>
                    )}
                </>
            }
        </>
    );
};

export default ArticleList;
