// import React from "react";
// import { useState,useEffect } from "react";
// import axios from "axios";

// export default function Calculator() {
//   const [types, setTypes] = useState([]);
//   const [input, setInput] = useState({ age: '', premium: '', term: '', policyType: '' });

//   useEffect(() => {
//     axios.get('http://localhost:3000/api/types').then(res => setTypes(res.data));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post('http://localhost:3000/api/calculate', input);
//     localStorage.setItem('illustration', JSON.stringify(res.data));
//     window.location.href = '/illustration';
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Age" type="number" value={input.age} onChange={e => setInput({ ...input, age: e.target.value })} />
//       <input placeholder="Premium" type="number" value={input.premium} onChange={e => setInput({ ...input, premium: e.target.value })} />
//       <input placeholder="Term" type="number" value={input.term} onChange={e => setInput({ ...input, term: e.target.value })} />
//       <select value={input.policyType} onChange={e => setInput({ ...input, policyType: e.target.value })}>
//         <option value="">Select Policy</option>
//         {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
//       </select>
//       <button type="submit">Calculate</button>
//     </form>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Select, MenuItem, Button,
  InputLabel, FormControl, Typography, Grid,
  Paper,
  Divider
} from '@mui/material';
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
    axios.get('http://localhost:3000/api/types').then(res => setTypes(res.data));
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/calculate', input);
      console.log(res,'data');
      debugger
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
        <Paper elevation={3}  sx={{
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
