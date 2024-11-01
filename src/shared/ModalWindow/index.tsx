import React, {FC} from 'react';
import styles from './index.module.scss';
import Button from "../Button";


interface ModalWindowProps {
    titleArticle: string;
    status: boolean;
}
const ModalWindow : FC<ModalWindowProps> = ({titleArticle, status=false}) => {
    console.log(titleArticle)
    return (
        <div className={styles[status ? 'open' : 'close']} style={{width:'100vw', height:'100vh', background: '#fffff', display:'flex', justifyContent:'center'}}>
            <div className={styles.modal}>
                <h5>Вы уверены, что хотите удалить статью  {titleArticle}?</h5>
                <div className={styles.btnContainer}>
                    <Button type={"button"}>Да</Button>
                    <Button type={"button"}>Нет</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;
