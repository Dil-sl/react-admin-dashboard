import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { TextField, Button, Typography, Box, Card, CardContent, CardMedia } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
    const theme = useTheme(); // Get the current theme
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // API call to the login endpoint
            const response = await axios.post(`https://localhost:7026/Auth/login`, {
                username: username,
                password: password,
            });

            if (response.status === 200 && response.data) {
                debugger;
                // Store response and set authentication on successful login
                localStorage.setItem("authToken", response.data.content); // Adjust based on actual token field
                setIsAuthenticated(true);
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid username or password.");
        }
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
                    {error && (
                        <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
