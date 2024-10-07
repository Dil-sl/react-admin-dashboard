// src/pages/CreateCustomer.js

import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../../components/Header';

const CreateCustomer = () => {
    const handleFormSubmit = (values) => {
        console.log('Customer Created:', values);
        // Add customer creation logic here (e.g., API call)
    };

    return (
        <Box m="20px">
            <Header title="CREATE CUSTOMER" subtitle="Add New Customer" />

            <Formik
                initialValues={initialCustomerValues}
                validationSchema={customerSchema}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Name"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Email"
                                name="email"
                                type="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Phone"
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const customerSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    phone: yup.string().required("Required"),
});

const initialCustomerValues = {
    name: '',
    email: '',
    phone: '',
};

export default CreateCustomer;
