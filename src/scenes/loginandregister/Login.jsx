import React from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, Button, Typography, Box, Card, CardContent, CardMedia } from "@mui/material";

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
            <Card sx={{ maxWidth: 400, padding: 2, boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    alt="Login Image"
                    height="140"
                    image="https://via.placeholder.com/400" // Replace with your image URL
                />
                <CardContent>
                    <Typography variant="h5" sx={{ color: theme.palette.primary.main, mb: 2, textAlign: 'center' }}>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            label="Username"
                            fullWidth
                            margin="normal"
                            sx={{
                                input: {
                                    color: theme.palette.primary.TextField
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
                                    color: theme.palette.primary.TextField
                                },
                                label: {
                                    color: theme.palette.grey[500]
                                },
                                fieldset: {
                                    borderColor: theme.palette.grey[500]
                                },
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.primary.label,
                                textAlign: 'right',
                                mb: 2,
                                cursor: 'pointer'
                            }}
                            onClick={() => alert("Redirecting to forgot password...")} // Replace with your logic
                        >
                            Forgot Password?
                        </Typography>
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
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
