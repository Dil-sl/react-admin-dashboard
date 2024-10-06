import React from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, Button, Typography, Box } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
    const theme = useTheme(); // Get the current theme

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle authentication logic here
        setIsAuthenticated(true); // Example for setting authentication
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <form onSubmit={handleLogin}>
                <Typography variant="h1" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    Login
                </Typography>
                <TextField
                    variant="outlined"
                    label="Username"
                    fullWidth
                    margin="normal"
                    sx={{
                        input: {
                            color: theme.palette.primary.main
                        },
                        label: {
                            color: theme.palette.grey[500]
                        },
                        fieldset: {
                            borderColor: theme.palette.grey[500]
                        },
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    sx={{
                        input: {
                            color: theme.palette.primary.main
                        },
                        label: {
                            color: theme.palette.grey[500]
                        },
                        fieldset: {
                            borderColor: theme.palette.grey[500]
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.background.default,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                        }
                    }}
                    fullWidth
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default Login;