import React from 'react';
import styles from './index.module.scss';
interface ErrorProps{
    textError: string | null;
}
function ErrorMessage ({textError}:ErrorProps){
    return (
        <div className={styles.errorArea}>
            <div className={styles.errorContent}>
                <span>{textError}</span>
                <img src="/assets/sad.webp" alt="sadSmail.img" className={styles.image}/>
            </div>
        </div>
    );
}

export default ErrorMessage;
