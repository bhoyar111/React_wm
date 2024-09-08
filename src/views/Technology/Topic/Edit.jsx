import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useParams } from "react-router-dom";

import { AuthApi } from '../../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../../useForm';
import validate from '../../../../validate/validateStage';

import PageHeader from '../../../../containers/PageHeader';

import FormDesign from './FormDesign';

export default function Edit(props) {

    const { id, sub_crop_id } = useParams();

    const [subCrops, setSubCrops] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/admin/stage-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.stage !== undefined ){
                const { stage } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = stage[key];
                }
                setValues({ ...formInputObj });

                if (data.sub_crops !== undefined ) setSubCrops(data.sub_crops);

            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const formData = new FormData();
              for ( let [key] of Object.entries(values) ) {
                  formData.append(key, values[key]);
              }
            const editResponse = await AuthApi.put(`/admin/stage-update/${id}`, formData);
            const { status, data } = editResponse;
            if( status === 201 && data.stage !== undefined ){
                toast.success(`Stage details edit successfully`);
                props.history.push(`/stages/${sub_crop_id}`);
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
      stage_name  : "",
      sub_crop_id : sub_crop_id,
      doc_url     : "",
      have_sub_stage: "",
      description   : ""
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
                            title="Stage Edit"
                            backlink={`stages/${sub_crop_id}`}
                        />
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            subCrops={subCrops}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
