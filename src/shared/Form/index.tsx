import React, {FC, useEffect} from 'react';
import {addArticle, Article, editArticle} from "../../store/articles/articlesSlice/articlesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {RootState} from "../../store/store";
import {fetchAuthors} from "../../store/articles/articlesSlice/authorSlice";
import styles from './index.module.scss'
import Button from "../Button";

interface FromProps{
    article?: Article,
}
const From : FC<FromProps> = ({article}) => {
    const dispatch = useAppDispatch();
    const authors = useAppSelector((state:RootState) => state.authors.authors);
    const { control, handleSubmit, setValue, reset} = useForm<{title:string, text?: string, author_id: string}>({
        defaultValues: {
            title: '',
            text: '',
            author_id: '0',
        },
    });
    console.log(article)
    useEffect(() => {
        if (article) {
            setValue('title', article.title);
            setValue('text', article.text);
            setValue('author_id', String(article.author_id));
        }
    }, [article, setValue]);

    useEffect(() => {
        dispatch(fetchAuthors())
    }, []);

    const onSubmit: SubmitHandler<{ title: string; text?: string, author_id: string }> = (data) => {
        if (article) {
            dispatch(editArticle({ id:article.id, title:data.title, text:data.text, author_id: Number(data.author_id) }));
        } else {
            dispatch(addArticle({title:data.title, text:data.text, author_id: Number(data.author_id)}));
            reset({ title: '', text: '', author_id: '0' });
        }
    };

    return (
        <div className={styles.formBox}>
            <h4 className="">{!article ? 'Добавление новой статьи' : 'Редактирование статьи'}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label>Название:</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <input className={styles.elForm} type="text" {...field} />
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <label>Текст:</label>
                    <Controller
                        name="text"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <textarea className={styles.elForm} {...field} style={{resize:'none'}} />
                        )}
                    />
                </div>
                <div className={styles.field}>
                    <label>Автор:</label>
                    <Controller
                        name="author_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select {...field} className={styles.elForm}>
                                <option value="0" disabled >Select an author</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>
                <div className={styles.btn}>
                    <Button type="submit">{article ? 'Редактировать' : 'Добавить'}</Button>
                </div>
            </form>
        </div>
    );
}

export default From;
