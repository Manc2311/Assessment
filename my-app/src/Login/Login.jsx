
import React, { useState } from "react";
import {
    Container, TextField, Button, Typography, Paper, Box,
    Divider
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", {
                mobile,
                password,
            });
            localStorage.setItem("token", res.data.token);
            window.location.href = "/calculator";
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        }
    };
    const inputStyle = {
        backgroundColor: '#fff',
        borderRadius: 1,
    };
    return (
        <Container maxWidth="sm" sx={{ mt: 6, my: 4, px: { xs: 2, sm: 4 } }}>
            <Paper elevation={3} sx={{
                p: { xs: 2, sm: 4 },
                backgroundColor: '#f7f5fc',
                borderRadius: 3,

            }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                            sx={inputStyle}

                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={inputStyle}

                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Login
                        </Button>
                        <Typography variant="body2" align="center">
                            Don't have an account?{' '}
                            <Link to={'/register'} underline="hover">
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}
