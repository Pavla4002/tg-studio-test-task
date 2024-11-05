import React, {useEffect} from 'react';
import Layout from "../../components/layout/Layout";
import From from "../../shared/Form";
import styles from './index.module.scss'
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../store/store";
import {clearMessages, fetchArticles} from "../../store/articles/articlesSlice/articlesSlice";
import Message from "../../shared/Message";
import {clearMessagesDemo} from "../../store/articles/demo/demoSlice";
function AddArticle() {
    const dispatch = useAppDispatch();
    const demoStatus = useAppSelector((state:RootState) => state.demo.demo);
    const articles = useAppSelector((state:RootState) => state.articles.articles)
    const articlesDemo = useAppSelector((state:RootState) => state.demo.articles);
    let messageAdd = useAppSelector((state:RootState) => demoStatus ? state.demo.addMessage : state.articles.addMessage);
    console.log(articles)
    useEffect(() => {
        dispatch(fetchArticles());
        setTimeout(()=>{
            dispatch(clearMessages());
            dispatch(clearMessagesDemo())
        },5000)
    }, [messageAdd]);

    return (
        <Layout>
            <div className="">
                {messageAdd!=='' &&  <Message text={messageAdd}/>}
            </div>
            <div className={styles.btnLink}>
                <ButtonLink link={'/'}>Все статьи</ButtonLink>
            </div>
            {
                articlesDemo.length<3 ?
                    <div className={styles.formArea}>
                        <From />
                    </div>
                :
                    <Message text="В режиме 'Демо' можно создать лишь 3 статьи."/>
            }

        </Layout>
    );
}

export default AddArticle;
