import React, {ReactNode} from 'react';
import styles from './index.module.scss'
import {Article} from "../../store/articles/articlesSlice/articlesSlice";

interface MyButton{
    children: string | ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    type: "submit" | "button";
    article?: Article;
}

function Button({children, onClick, type}:MyButton) {
    return (
        <button className={styles.btnDefault} onClick={onClick} type={type}>{children}</button>
    );
}

export default Button;
