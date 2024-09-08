import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, errors } = props;

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="RoleName"
                            label="Role Name"
                            variant="outlined"
                            size="small"
                            name="role_name"
                            value={values.role_name}
                            onChange={handleChange}
                        />
                        {errors.role_name && <small className="text-danger">{errors.role_name}</small>}
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="Description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* <Form.Group as={Col} xs={12} md={6} lg={4} xl={4}>
                        <TextField
                            id="permission"
                            label="Permission"
                            variant="outlined"
                            size="small"
                            name="permission"
                            value={values.permission}
                            onChange={handleChange}
                        />
                    </Form.Group> */}
                    <Col xs={12} className="mt-3">
                        <Button type="submit" variant="contained" size="small" color="primary" className="text-white">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
