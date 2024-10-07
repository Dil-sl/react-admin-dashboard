import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../../components/Header";

const ManageProducts = () => {
    const theme = useTheme();
    const colors = theme.palette.mode;

    const handleEdit = (id) => {
        console.log("Edit product", id);
    };

    const handleDelete = (id) => {
        console.log("Delete product", id);
    };

    const handleView = (id) => {
        console.log("View product", id);
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "productName", headerName: "Product Name", flex: 1 },
        { field: "price", headerName: "Price", type: "number" },
        { field: "quantity", headerName: "Quantity", type: "number" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box display="flex" justifyContent="space-around">
                        <EditIcon
                            style={{ cursor: "pointer", color: colors.primary[500] }}
                            onClick={() => handleEdit(id)}
                        />
                        <VisibilityIcon
                            style={{ cursor: "pointer", color: colors.primary[500] }}
                            onClick={() => handleView(id)}
                        />
                        <DeleteIcon
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleDelete(id)}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="MANAGE PRODUCTS" subtitle="Manage Existing Products" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={mockProductData} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

const mockProductData = [
    { id: 1, productName: "Product 1", price: 100, quantity: 10 },
    { id: 2, productName: "Product 2", price: 150, quantity: 5 },
    // Add more products as needed
];

export default ManageProducts;
