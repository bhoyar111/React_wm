import React, { useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateRole';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id } = useParams();


    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/role-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.role !== undefined ){
                const { role } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    if(key !== 'password') formInputObj[key] = role[key];
                }
                formInputObj.eid = true;
                setValues({ ...formInputObj });

            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            delete values.eid; // remove eid from values object
            const editResponse = await AuthApi.put(`/admin/role-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.role !== undefined ){
                toast.success(`Role edit successfully`);
                props.history.push("/roles");
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
        role_name   : "",
        description : "",
        permission  : ""
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
                            backlink="roles"
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
