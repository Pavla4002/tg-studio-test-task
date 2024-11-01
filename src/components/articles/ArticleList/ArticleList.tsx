import React, {MouseEventHandler, useEffect, useRef, useState} from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/hooks';
import {fetchArticles} from '../../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../../store/store';
import Button from "../../../shared/Button";
import styles from './index.module.scss';
import '../../../app/g-styles.scss';
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import ModalWindow from "../../../shared/ModalWindow";
import {openModal} from "../../../store/articles/ModalSlice/ModalSlice";


const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const articles = useSelector((state: RootState) => state.articles.articles);
    const articleStatus = useSelector((state: RootState) => state.articles.status);
    const statusModal = useSelector((state: RootState) => state.modal.isOpen);
    const textModal = useSelector((state: RootState) => state.modal.text);
    console.log(statusModal)
    console.log(articles)
    useEffect(() => {
        if (articleStatus === 'idle') {
            dispatch(fetchArticles());
        }
    }, [articleStatus, dispatch]);


    const openCloseModal = (textModal:string) => {
        dispatch(openModal(textModal)); // Измените статус модалки
    };


    return (
        <>
            { articles ?
                (<div>
                    <div className={styles.btnContainer}>
                        <Button type={"button"}><div className={styles.addArticle}>Создать<span className={styles.smallPlus}>+</span></div></Button>
                        <Button type={"button"}>Демо</Button>
                    </div>
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
                                <td className={styles.tdBtns}>
                                    <ButtonLink link={`/article/${article.id}`}>Редактировать</ButtonLink>
                                    <Button type={"button"} onClick={()=>openCloseModal(article.title)} article={article}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>)
                :
                (<div>Loading...</div>)
            }

            {statusModal && (
                <ModalWindow titleArticle={textModal} status={statusModal}/>
            )}
        </>

    );
};

export default ArticleList;
