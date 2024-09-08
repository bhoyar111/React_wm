import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Col, Row, Form } from 'react-bootstrap';

export default function FormDesign(props) {

    const { handleSubmit, handleChange, values, errors } = props;

    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4} xl={3}>
                        <TextField
                            id="Country"
                            label="Country Name"
                            variant="outlined"
                            size="small"
                            name="country_name"
                            value={values.country_name}
                            onChange={handleChange}
                        />
                        {errors.country_name && <small className="text-danger">{errors.country_name}</small>}
                    </Form.Group>
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
