import React, {useEffect} from 'react';
import Layout from "../../components/layout/Layout";
import From from "../../shared/Form";
import styles from './index.module.scss'
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../store/store";
import {clearMessages} from "../../store/articles/articlesSlice/articlesSlice";
import Message from "../../shared/Message";
function AddArticle() {
    const dispatch = useAppDispatch();
    let messageAdd = useAppSelector((state:RootState) => state.articles.addMessage);
    const statusAdd = useAppSelector((state:RootState) => state.articles.status);

    useEffect(() => {
        setTimeout(()=>{
            setTimeout(()=>{
                dispatch(clearMessages());
            },5000)
        },4000)
    }, [statusAdd,messageAdd]);
    return (
        <Layout>
            <div className="">
                {messageAdd!=='' &&  <Message text={messageAdd}/>}
            </div>
            <div className={styles.btnLink}>
                <ButtonLink link={'/'}>Все статьи</ButtonLink>
            </div>
            <div className={styles.formArea}>
                <From />
            </div>
        </Layout>
    );
}

export default AddArticle;
