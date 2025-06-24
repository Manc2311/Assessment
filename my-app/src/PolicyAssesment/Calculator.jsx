
import React, { useEffect, useState } from 'react';
import {
    Container, TextField, Select, MenuItem, Button,
    InputLabel, FormControl, Typography, Grid,
    Paper,
    Divider
} from '@mui/material';
import APIURL from '../APIURL';
import axios from 'axios';

export default function Calculator() {
    const [types, setTypes] = useState([]);
    const [input, setInput] = useState({
        dob: '',
        sumAssured: '',
        premium: '',
        frequency: '',
        pt: '',
        ppt: '',
        policyType: ''
    });

    useEffect(() => {
        axios.get(`${APIURL.url}/api/types`).then(res => setTypes(res.data));
    }, []);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${APIURL.url}/api/calculate`, input);
            localStorage.setItem('illustrationId', JSON.stringify(res.data.id));
            window.location.href = '/illustration';
        } catch (err) {
            alert(err.response?.data?.errors?.join('\n') || 'Calculation failed');
        }
    };

    const inputStyle = {
        backgroundColor: '#fff',
        borderRadius: 1,
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{
                p: { xs: 2, sm: 4 },
                backgroundColor: '#f7f5fc',
                borderRadius: 3,
            }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#3D3B60', fontWeight: 600 }}>Policy Benefit Calculator</Typography>

                <Divider sx={{ mb: 3 }} />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                name="dob"
                                value={input.dob}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                                sx={inputStyle}

                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Sum Assured (₹)"
                                type="number"
                                name="sumAssured"
                                value={input.sumAssured}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={inputStyle}

                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Modal Premium (₹)"
                                type="number"
                                name="premium"
                                value={input.premium}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={inputStyle}

                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth required sx={inputStyle}>
                                <InputLabel>Premium Frequency</InputLabel>
                                <Select
                                    name="frequency"
                                    value={input.frequency}
                                    onChange={handleChange}
                                    label="Premium Frequency"


                                >
                                    <MenuItem value="Yearly">Yearly</MenuItem>
                                    <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth required sx={inputStyle}>
                                <InputLabel>Policy Type</InputLabel>
                                <Select
                                    name="policyType"
                                    value={input.policyType}
                                    onChange={handleChange}
                                    label="Policy Type"

                                >
                                    <MenuItem value="">Select Policy</MenuItem>
                                    {types.map(t => (
                                        <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Policy Term (Years)"
                                type="number"
                                name="pt"
                                value={input.pt}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={inputStyle}

                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Premium Paying Term (Years)"
                                type="number"
                                name="ppt"
                                value={input.ppt}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={inputStyle}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                Calculate
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    );
}
