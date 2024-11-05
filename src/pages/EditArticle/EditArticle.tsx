import React, {useEffect} from 'react';

import {useParams} from "react-router-dom";
import Form from "../../shared/Form";
import Layout from "../../components/layout/Layout";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../store/store";
import {useSelector} from "react-redux";
import {clearMessages, fetchArticleById, fetchArticles} from "../../store/articles/articlesSlice/articlesSlice";
import Load from "../../shared/Loading";
import Message from "../../shared/Message";
import MyError from "../../shared/Error";
import ErrorMessage from "../../shared/Error";
import styles from "../AddArticle/index.module.scss";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import {clearMessagesDemo} from "../../store/articles/demo/demoSlice";

function EditArticle() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const demoStatus = useAppSelector((state: RootState) => state.demo.demo);
    const articleStatus = useAppSelector((state: RootState) => state.articles.status);
    const error = useAppSelector((state: RootState) => state.articles.error);
    const message = useAppSelector((state: RootState) => demoStatus ? state.demo.editMessage : state.articles.editMessage);
    const article = useAppSelector((state: RootState) =>
        !demoStatus ?  state.articles.article :  state.demo.articles.find(article => article.id===Number(id)));

    useEffect(() => {
        if (!demoStatus){
            dispatch(fetchArticleById(Number(id)));
        }
    }, []);

    useEffect(() => {
        setTimeout(()=>{
            dispatch(clearMessages());
            dispatch(clearMessagesDemo());
        },4000)
    }, [message]);


    return (
        <Layout>
            {
                articleStatus!== 'failed' ?
                    <div>
                        {!article ? (
                            <Load/>
                        ) : (
                            <>
                                {message!=='' && <Message text={message}/> }
                                <div className={styles.btnLink}>
                                    <ButtonLink link={'/'}>Все статьи</ButtonLink>
                                </div>
                                <div className={styles.formArea}>
                                    <Form article={article}/>
                                </div>

                            </>

                        )}
                    </div>
                    :
                    <div>
                        <ErrorMessage textError={error}/>
                    </div>
            }
        </Layout>
    );
}

export default EditArticle;
