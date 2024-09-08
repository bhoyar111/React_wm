import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../useForm';
import validate from '../../../validate/validateTopic';

import PageHeader from '../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

    const { technology_id } = useParams();

    const submit = async () => {
        try {
            const formData = new FormData();
            for (let [key] of Object.entries(values)) {
                formData.append(key, values[key]);
            }

            const saveResponse = await AuthApi.post("/topic-add", formData);
            toast.success(`Topic added successfully`);
            props.history.push(`/topic/${technology_id}`);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            // setErrors
            const { response } = e;
            if (response !== undefined && Object.keys(response.data).length && response.data.error !== undefined) {
                setErrors(response.data.error); // if error from server side
            }
        }
    }

    const formInputObj = {
        technology_id: technology_id,
        topic_name: "",
        document: "",
        url: "",
    };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        submit,
        validate,
        formInputObj
    )

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Topic Add"
                            backlink={`topic/${technology_id}`}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
