// src/pages/ManageCustomers.js

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Header from '../../components/Header';

const ManageCustomers = () => {
    const theme = useTheme();
    const colors = theme.palette.mode;

    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123456789' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987654321' },
    ]);

    const handleEdit = (id) => {
        console.log('Edit Customer with ID:', id);
    };

    const handleDelete = (id) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
        console.log('Deleted Customer with ID:', id);
    };

    const handleView = (id) => {
        console.log('View Customer with ID:', id);
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box display="flex" justifyContent="space-around">
                        <EditIcon
                            style={{ cursor: 'pointer', color: colors.primary[500] }}
                            onClick={() => handleEdit(id)}
                        />
                        <VisibilityIcon
                            style={{ cursor: 'pointer', color: colors.primary[500] }}
                            onClick={() => handleView(id)}
                        />
                        <DeleteIcon
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => handleDelete(id)}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="MANAGE CUSTOMERS" subtitle="Manage Existing Customers" />
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid
                    rows={customers}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default ManageCustomers;
