import React, {FC, ReactNode} from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";

interface ButtonLinkProps{
    children: ReactNode;
    link: string;
}

const  ButtonLink : FC<ButtonLinkProps> = ({children,link}) => {
    return (
        <Link to={link} className={styles.link}>{children}</Link>
    );
}

export default ButtonLink;
