import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../../components/Header";

const ManageStocks = () => {
    const theme = useTheme();
    const colors = theme.palette.mode;

    const handleEdit = (id) => {
        console.log("Edit stock", id);
    };

    const handleDelete = (id) => {
        console.log("Delete stock", id);
    };

    const handleView = (id) => {
        console.log("View stock", id);
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "stockName", headerName: "Stock Name", flex: 1 },
        { field: "stockQuantity", headerName: "Quantity", type: "number" },
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
            <Header title="MANAGE STOCKS" subtitle="Manage Existing Stocks" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={mockStockData} columns={columns} checkboxSelection />
            </Box>
        </Box>
    );
};

const mockStockData = [
    { id: 1, stockName: "Stock 1", stockQuantity: 50 },
    { id: 2, stockName: "Stock 2", stockQuantity: 100 },
    // Add more stocks as needed
];

export default ManageStocks;
