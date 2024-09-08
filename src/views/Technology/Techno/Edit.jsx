import React, { useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../validate/validateTechnology';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/technology-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.country !== undefined ){
                const { country } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = country[key];
                }
                setValues({ ...formInputObj });

            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/technology-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.technology !== undefined ){
                toast.success(`technology edit successfully`);
                props.history.push("/technology");
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            // setErrors
            const { response } = e;
            if(response !== undefined && Object.keys(response.data).length && response.data.error !== undefined ){
                setErrors(response.data.error); // if error from server side
            }
        }
    }

    const formInputObj = {
        technology_name   : "",
    };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        submit,
        validate,
        formInputObj
    );

    useEffect(() => {
        getEditData();
    }, []);

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Edit"
                            backlink="countries"
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
