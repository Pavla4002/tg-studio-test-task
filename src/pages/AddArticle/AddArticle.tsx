import React from 'react';
import Layout from "../../components/layout/Layout";
import From from "../../shared/Form";
import styles from './index.module.scss'
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
function AddArticle() {
    return (
        <Layout>
            <div className={styles.btnLink}>
                <ButtonLink link={'/'}>Все статьи</ButtonLink>
            </div>
            <div className={styles.formArea}>
                <From />
            </div>
        </Layout>
    );
}

export default AddArticle;
