import React, { useState, } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { HaveSubStage } from '../../../utils/constant';
import { SERVER_BASE_URL } from '../../../utils/api';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, setValues, errors } = props;

    const [displayUrl, setDisplayUrl] = useState('');

    const handleImgChange = (event) => {
        const { files, name } = event.target;
        let newUrl = ''
        let newSelectedFile = '';
        if (files && files.length) {
            const selectedFile = files[0];
            newUrl = URL.createObjectURL(selectedFile);
            newSelectedFile = selectedFile;
        }
        setDisplayUrl(newUrl);
        setValues({
            ...values,
            [name]: newSelectedFile
        });
    }

    // const handleChangeCkEditor = (event, editor) => {
    //   const data = editor.getData();
    //     setValues({
    //       ...values,
    //       description: data
    //   });
    // }

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Name"
                            label="Topic Name"
                            variant="outlined"
                            size="small"
                            name="topic_name"
                            value={values.topic_name}
                            onChange={handleChange}
                        />
                        {errors.topic_name && <small className="text-danger">{errors.topic_name}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <div className="custom-file upload">
                            <input
                                type="file"
                                className="custom-file-input shadow-none"
                                id="inputGroupFile02"
                                name="document"
                                onChange={handleImgChange}
                            />
                            <label
                                className="custom-file-label mb-0 shadow-none"
                                htmlFor="inputGroupFile02"
                                aria-describedby="inputGroupFileAddon02"
                            >
                                Documents Image
                            </label>
                        </div>
                        <div className="custom-file upload text-right">
                            {displayUrl &&
                                <a href={displayUrl} target="_blank">View</a>
                            }
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Name"
                            label="URL"
                            variant="outlined"
                            size="small"
                            name="url"
                            value={values.url}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Col xs={12} className="mt-3">
                        <Button type="submit" variant="contained" size="small" color="primary" className=" text-white">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
