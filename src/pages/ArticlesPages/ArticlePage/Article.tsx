import React from 'react';
import ArticleDetail from "../../../features/articles/ArticleDetail/ArticleDetail";
import Layout from "../../../shared/Layout/Layout";
import ButtonLink from "../../../shared/ButtonLink/ButtonLink";
import styles from './index.module.scss'


function Article() {
    return (
        <Layout>
            <div className={styles.btnBlock}>
                <ButtonLink link={'/'}>Все статьи</ButtonLink>
            </div>
            <ArticleDetail/>
        </Layout>
    );
}

export default Article;
