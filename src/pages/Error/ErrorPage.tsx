import styles from './index.module.scss';
import Layout from "../../shared/Layout/Layout";

function ErrorPage() {
    return (
        <Layout>
            <div className={styles.errorPage}>
                <div className={styles.errorPageContent}>
                    <h2>404</h2>
                    <span>The page was not found :(</span>
                </div>

            </div>
        </Layout>
    );
}

export default ErrorPage;
