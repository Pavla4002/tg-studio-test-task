import React, { useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {Article, fetchArticles, openModal} from '../../../store/articles/articlesSlice/articlesSlice';
import { RootState } from '../../../store/store';
import Button from "../../../shared/Button";
import styles from './index.module.scss';
import '../../../app/g-styles.scss';
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import ModalWindow from "../../../shared/ModalWindow";




const ArticleList: React.FC = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state: RootState) => state.articles.articles);
    const articleStatus = useAppSelector((state: RootState) => state.articles.status);
    const statusModal = useAppSelector((state: RootState) => state.articles.isOpenModal);
    const articleModal = useAppSelector((state: RootState) => state.articles.articleModal);
    console.log(statusModal)
    console.log(articles)
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
                                    <Button type={"button"} onClick={()=>openModalFunc(article)} article={article}>Удалить</Button>
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
                <ModalWindow articleModal={articleModal} status={statusModal}/>
            )}
        </>
    );
};

export default ArticleList;
