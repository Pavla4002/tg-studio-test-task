import React, {useEffect} from 'react';
import FormAuthors from "../../../shared/FormAutors";
import Layout from "../../../shared/Layout/Layout";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {RootState} from "../../../store/store";
import Message from "../../../shared/Message";
import styles from "../../ArticlesPages/AddArticle/index.module.scss";
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import {resetMessage} from "../../../store/authors/authorsSlice/authorSlice";


function AddAuthor() {
    const dispatch = useAppDispatch();
    let messageAdd = useAppSelector((state:RootState) => state.authors.addMessage);

    useEffect(() => {
        setTimeout(()=>{
            dispatch(resetMessage());
        },5000)
    }, [messageAdd,dispatch]);

    return (
        <Layout>
            <div className="">
                {messageAdd!=='' && <Message text={messageAdd}/>}
            </div>
            <div className={styles.btnLink}>
                <div className={styles.links}>
                    <ButtonLink link={'/'}>Все статьи</ButtonLink>
                    <ButtonLink link={'/article/add'}>Новая статья</ButtonLink>
                </div>
            </div>
            <div className={styles.formArea}>
                <FormAuthors/>
            </div>
        </Layout>
    );
}

export default AddAuthor;