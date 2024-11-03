import styles from "./index.module.scss";
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import Button from "../../../shared/Button";
import {useAppDispatch} from "../../../hooks/hooks";
import {Article, openModal} from "../../../store/articles/articlesSlice/articlesSlice";
import '../../../app/g-styles.scss';

interface ArticlesTableProps {
    articles: Article[],
}
function ArticlesTable({articles}:ArticlesTableProps) {
    const dispatch = useAppDispatch();
    const openModalFunc = (article: Article) => {
        dispatch(openModal(article));
    };
    return (
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
                    <td>{article.title}</td>
                    <td className={styles.tdBtns}>
                        <ButtonLink link={`/article/${article.id}`}>Редактировать</ButtonLink>
                        <Button type={"button"} onClick={()=>openModalFunc(article)} article={article}>Удалить</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ArticlesTable;