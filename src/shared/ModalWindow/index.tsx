import React from 'react';
import styles from './index.module.scss';
import Button from "../Button";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {
    Article,
    closeModal,
    deleteArticleById,
} from "../../store/articles/articlesSlice/articlesSlice";
import {RootState} from "../../store/store";
import {delArticleDemo} from "../../store/demo/demoSlice/demoSlice";


interface ModalWindowProps {
    articleModal: Article | null;
    status: boolean;
}

function ModalWindow({articleModal, status=false}:ModalWindowProps){
    const dispatch = useAppDispatch();
    const demoStatus = useAppSelector((state:RootState) => state.demo.demo);
    const closeModalFunc = () => {
        dispatch(closeModal());
    };

    const deleteArticle = () => {
        if (!demoStatus){
            dispatch(deleteArticleById(Number(articleModal!.id)));
        }else{
            dispatch(delArticleDemo(Number(articleModal!.id)));
        }
        closeModalFunc();
    };

    return (
        <div className={styles[status ? 'open' : 'close']} style={{position:'absolute', top:'0', left:'0', width:'100vw',height:'100vh', background:'rgba(255, 255, 255, 0.6)', display:'flex', justifyContent:'center'}}>
            <div className={styles.modal}>
                <div className={styles.closeModalBlock}><Button type={"button"} onClick={closeModalFunc}><span className={styles.textCloseBtn}>Закрыть</span></Button></div>
                <h5 className={styles.title}>Вы уверены, что хотите удалить статью "{articleModal?.title}"?</h5>
                <div className={styles.btnContainer}>
                    <Button type={"button"} onClick={deleteArticle}>Да</Button>
                    <span>/</span>
                    <Button type={"button"} onClick={closeModalFunc}>Нет</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;
