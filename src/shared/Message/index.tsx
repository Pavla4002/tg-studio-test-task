import React from 'react';
import styles from './index.module.scss';

interface MessageProps{
    text: string;
}

function Message({text}: MessageProps) {
    return (
        <div className={styles.messageArea}>
            <span>{text}</span>
        </div>
    );
}

export default Message;
