import React, {FC} from 'react';
import {Article} from "../../store/articles/articlesSlice/articlesSlice";
import {useAppDispatch} from "../../hooks/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import styles from './index.module.scss'
import Button from "../Button";
import {addAuthors} from "../../store/authors/authorsSlice/authorSlice";


interface FromProps{
    article?: Article,
}
const FromAuthors : FC<FromProps> = ({}) => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, reset,  formState: { errors }} = useForm<{name:string}>({
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
                    <label>Полное имя:</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Field is required"}}
                        render={({ field }) => (
                            <>
                                <input className={styles.elForm} type="text" {...field} />
                                {errors.name && <span style={{color:'black'}}>{errors.name.message}</span>}
                            </>
                        )}
                    />
                </div>
                <div className={styles.btn}>
                    <Button type="submit">{'Добавить'}</Button>
                </div>
            </form>
        </div>
    );
}

export default FromAuthors;
