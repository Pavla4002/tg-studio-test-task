import React, {FC} from 'react';
import styles from './index.module.scss';
import Button from "../Button";
import {useAppDispatch} from "../../hooks/hooks";
import {Article, closeModal} from "../../store/articles/articlesSlice/articlesSlice";


interface ModalWindowProps {
    articleModal: Article | null;
    status: boolean;
}
const ModalWindow : FC<ModalWindowProps> = ({articleModal, status=false}) => {
    const dispatch = useAppDispatch();
    const closeModalFunc = () => {
        dispatch(closeModal());
    };
    return (
        <div className={styles[status ? 'open' : 'close']} style={{position:'absolute', top:'0', left:'0', width:'100vw',height:'100vh', background:'rgba(255, 255, 255, 0.6)', display:'flex', justifyContent:'center'}}>
            <div className={styles.modal}>
                <div className={styles.closeModalBlock}><Button type={"button"} onClick={closeModalFunc}><span className={styles.textCloseBtn}>Закрыть</span></Button></div>
                <h5 className={styles.title}>Вы уверены, что хотите удалить статью "{articleModal?.title}"?</h5>
                <div className={styles.btnContainer}>
                    <Button type={"button"}>Да</Button>
                    <Button type={"button"} onClick={closeModalFunc}>Нет</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;
