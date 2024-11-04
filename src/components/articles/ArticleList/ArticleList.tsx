import React, { useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {Article, clearMessages, fetchArticles, openModal} from '../../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../../store/store';
import Button from "../../../shared/Button";
import styles from './index.module.scss';
import '../../../app/g-styles.scss';
import ModalWindow from "../../../shared/ModalWindow";
import Load from "../../../shared/Loading";
import ArticlesTable from "../ArticlesTable";
import Message from "../../../shared/Message";
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import ErrorMessage from "../../../shared/Error";
import {startEndDemo} from "../../../store/articles/demo/demoSlice";




const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const demoStatus = useAppSelector((state: RootState) => state.demo.demo);
    // const articlesList = useAppSelector((state: RootState) => state.articles.articles);
    const articleStatus = useAppSelector((state: RootState) => state.articles.status);
    const message= useAppSelector((state: RootState) => state.articles.error);
    const statusModal = useAppSelector((state: RootState) => state.articles.isOpenModal);
    const articleModal = useAppSelector((state: RootState) => state.articles.articleModal);
    const delMessage = useAppSelector((state: RootState) => state.articles.delMessage);
    const articles = useAppSelector((state: RootState) =>
        demoStatus ? state.demo.articles : state.articles.articles
    );

    useEffect(() => {
        if (articleStatus === 'idle') {
            dispatch(fetchArticles());
        }
    }, [articleStatus]);


    useEffect(() => {
        setTimeout(()=>{
            dispatch(clearMessages());
        },5000)

    }, [delMessage]);

    const demo = () =>{
        console.log('starts')
        dispatch(startEndDemo())
    }

    return (
        <>
            {articleStatus ==='failed' ? <ErrorMessage textError={message}/>  :
                <>
                    { articleStatus!=='loading' ?
                        (<div>
                            {delMessage!=='' && <Message text={delMessage}/>}
                                <div className={styles.btnContainer}>
                                    <ButtonLink link={'/article/add'} ><div className={styles.addArticle}>Создать<span className={styles.smallPlus}>+</span></div></ButtonLink>
                                    <Button type={"button"} onClick={demo}> {!demoStatus ? <span>Демо</span> : <span>Отключить демо</span>}</Button>
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
