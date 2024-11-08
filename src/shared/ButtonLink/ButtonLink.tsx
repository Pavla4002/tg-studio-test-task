import React, {ReactNode} from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";

interface ButtonLinkProps{
    children: ReactNode;
    link: string;
}

function ButtonLink({children,link}:ButtonLinkProps) {
    return (
        <Link to={link} className={styles.link}>{children}</Link>
    );
}

export default ButtonLink;
