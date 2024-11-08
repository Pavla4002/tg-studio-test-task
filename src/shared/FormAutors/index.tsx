import React, {FC} from 'react';
import {Article} from "../../store/articles/articlesSlice/articlesSlice";
import {useAppDispatch} from "../../hooks/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from './index.module.scss'
import Button from "../Button";
import {addAuthors} from "../../store/authors/authorsSlice/authorSlice";
import Input, {FormDataAuthor} from "../Input/Input";


interface FromProps{
    article?: Article,
}
const FromAuthors : FC<FromProps> = () => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, reset} = useForm<FormDataAuthor>({
        defaultValues: {
            name:''
        },
    });

    const onSubmit: SubmitHandler<{name:string}> = (data) => {
        dispatch(addAuthors(data));
        reset({name: ''})
    }

    return (
        <div className={styles.formBox}>
            <h4 className="">{'Добавление нового автора'}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <Input name={"name"} label={"Полное имя"} control={control} rules={{required: 'Обязательное поле'}}/>
                </div>
                <div className={styles.btn}>
                    <Button type="submit">{'Добавить'}</Button>
                </div>
            </form>
        </div>
    );
}

export default FromAuthors;
