import React from 'react';
import {Control, FieldValues, Path, PathValue, useController} from 'react-hook-form';
import styles from './index.module.scss'

export interface FormDataAuthor {
    name: string;
}

export interface FormDataArticles {
    title: string,
    text?: string,
    author_id: string
}

interface InputProps<T extends FieldValues>{
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    rules?: object;
}

const Input = <T extends FieldValues>({ name, label, type = 'text', placeholder = '', control, defaultValue,rules }: InputProps<T>) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
        rules
    });

    return (
        <div className={styles.field}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                {...field}
                type={type}
                id={name}
                name={name}
                className={styles.elForm}
                placeholder={placeholder}
            />
            {error && <span style={{color: 'whit', fontSize:'12px'}}>{error.message}</span>}
        </div>
    );
};

export default Input;