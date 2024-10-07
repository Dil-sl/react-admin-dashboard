import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

const CreateStock = () => {
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="CREATE STOCK" subtitle="Add New Stock" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialStockValues}
                validationSchema={stockSchema}
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
                                type="text"
                                label="Stock Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.stockName}
                                name="stockName"
                                error={!!touched.stockName && !!errors.stockName}
                                helperText={touched.stockName && errors.stockName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Stock Quantity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.stockQuantity}
                                name="stockQuantity"
                                error={!!touched.stockQuantity && !!errors.stockQuantity}
                                helperText={touched.stockQuantity && errors.stockQuantity}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Add Stock
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const stockSchema = yup.object().shape({
    stockName: yup.string().required("Required"),
    stockQuantity: yup.number().required("Required"),
});

const initialStockValues = {
    stockName: "",
    stockQuantity: "",
};

export default CreateStock;
