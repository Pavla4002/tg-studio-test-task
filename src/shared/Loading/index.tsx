import React from 'react';
import styles from './index.module.scss';

function Load() {
    return (
        <div className={styles.loadArea}>
            <div className={styles.loadContent}>
                <span className={styles.loading}>Loading...</span>
            </div>

        </div>
    );
}

export default Load;
