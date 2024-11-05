import React, {ReactNode} from 'react';
import styles from './index.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../store/store";
import Button from "../../shared/Button";
import {startEndDemo} from "../../store/articles/demo/demoSlice";
import {useNavigate} from "react-router-dom";


interface LayoutProps {
    children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const demoStatus = useAppSelector((state: RootState) => state.demo.demo);
    const navigate = useNavigate();
    const demo = () =>{
        dispatch(startEndDemo());
        navigate('/');
    }
    return (
        <>
            {demoStatus && <div className={styles.demoBox}> <span className={styles.demoMessage}>Включен демо режим </span><div><Button type={"button"} onClick={demo}>Отключить демо</Button></div></div>}
            <div className={styles.layout}>
                {children}
            </div>
        </>

    );
};

export default Layout;
