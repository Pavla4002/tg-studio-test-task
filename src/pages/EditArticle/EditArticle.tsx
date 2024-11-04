import React from 'react';

import {useParams} from "react-router-dom";
import Form from "../../shared/Form";
import Layout from "../../components/layout/Layout";

function EditArticle() {
    const { id } = useParams<{ id: string }>();
    console.log(id)
    return (
        <Layout>
            <div className="">
                <Form/>
            </div>
        </Layout>
    );
}

export default EditArticle;
