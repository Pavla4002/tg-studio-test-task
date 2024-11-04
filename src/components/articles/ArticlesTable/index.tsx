import styles from "./index.module.scss";
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import Button from "../../../shared/Button";
import {useAppDispatch} from "../../../hooks/hooks";
import {Article, openModal} from "../../../store/articles/articlesSlice/articlesSlice";
import '../../../app/g-styles.scss';
import React from "react";
import {Link} from "react-router-dom";

interface ArticlesTableProps {
    articles: Article[],
}
function ArticlesTable({articles}:ArticlesTableProps) {
    const dispatch = useAppDispatch();
    const openModalFunc = (article: Article) => {
        dispatch(openModal(article));
    };
    return (
        <div className={styles.tbContainer}>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th style={{width:'400px'}}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.author?.name}</td>
                        <td><Link to={`/article/${article.id}`} className={styles.linkArticle}>{article.title}</Link></td>
                        <td className={styles.tdBtns}>
                            <ButtonLink link={`/article/edit/${article.id}`}>Редактировать</ButtonLink>
                            <Button type={"button"} onClick={()=>openModalFunc(article)} article={article}>Удалить</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default ArticlesTable;
