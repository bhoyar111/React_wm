import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '/../../../useForm';
import validate from '../../validate/validateTechnology';

import PageHeader from '/../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Add(props) {

    const submit = async () => {
        try {
            const saveResponse = await AuthApi.post("/technology-add", values);
            const { status, data } = saveResponse;
            if( status === 201 && data.technology !== undefined ){
                toast.success(`technology added successfully`);
                props.history.push('/technology');
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
    )

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <PageHeader
                            title="Add"
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
