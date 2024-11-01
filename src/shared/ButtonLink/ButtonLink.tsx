import React, {FC} from 'react';
import styles from './index.module.scss';

interface ButtonLinkProps{
    children: string;
    link: string;
}

const  ButtonLink : FC<ButtonLinkProps> = ({children,link}) => {
    return (
        <a href={link} className={styles.link}>{children}</a>
    );
}

export default ButtonLink;
