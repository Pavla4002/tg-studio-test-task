import React, {FC, ReactNode} from 'react';
import styles from './index.module.scss';

interface ButtonLinkProps{
    children: ReactNode;
    link: string;
}

const  ButtonLink : FC<ButtonLinkProps> = ({children,link}) => {
    return (
        <a href={link} className={styles.link}>{children}</a>
    );
}

export default ButtonLink;
