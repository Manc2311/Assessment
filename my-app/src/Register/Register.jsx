import { useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Typography,
  Paper, Grid,
  Divider
} from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ name: '', dob: '', mobile: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', form);
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed');
    }
  };
  const inputStyle = {
    backgroundColor: '#fff',
    borderRadius: 1,
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 6,my: 4,px: { xs: 2, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 },
       backgroundColor: '#f7f5fc',
          borderRadius: 3,

       }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#3D3B60', fontWeight: 600 }}>
          User Registration
        </Typography>
           <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={6} item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                sx={inputStyle}

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}

              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
