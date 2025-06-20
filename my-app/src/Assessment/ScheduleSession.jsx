import {
  Container, Typography, TextField, Checkbox, FormControlLabel,
  Button, MenuItem, Grid, Paper, Divider, Autocomplete
} from '@mui/material';
import { useState } from 'react';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const patientsDB = [
  { name: 'John Doe', mobile: '9876543210', email: 'john@example.com' },
  { name: 'Jane Smith', mobile: '9123456780', email: 'jane@example.com' },
];


const patient = {

  name: '',
  mobile: '',
  whatsapp: '',
  email: '',
  address: ''
}

export default function ScheduleSession() {

  const [patientData, setPatientData] = useState(patient)
  const [whatsappSame, setWhatsappSame] = useState(true);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [sessionType, setSessionType] = useState('');
  const [patientList, setPatientList] = useState([
    { name: 'John Doe', mobile: '9876543210', email: 'john@example.com' },
    { name: 'Jane Smith', mobile: '9123456780', email: 'jane@example.com' }
  ]);
  const [existingPatient, setExistingPatient] = useState(null);


  const inputStyle = {
    backgroundColor: '#fff',
    borderRadius: 1,
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const newPatient = () => {

    const finalWhatsapp = whatsappSame ? patientData.mobile : patientData.whatsapp;

    let newData = { ...patientData, whatsapp: finalWhatsapp }

    setPatientList((prev) => [...prev, newData]);
    setPatientData(patient);
    setWhatsappSame(true);
  }
console.log(existingPatient,sessionType,time,date,'.........modata');

  const handleSubmit = () => {

    const data = {
      existingPatient,
      date,
      time,
      sessionType,
    };
    console.log('Scheduling session with:', data);
    
    setPatientData(patient);
    setDate(null);
    setExistingPatient(null);
    setTime(null);
    setSessionType('');
  };



  return (
    <Container maxWidth="sm" sx={{ my: 4, px: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: '#f7f5fc',
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#3D3B60', fontWeight: 600 }}>
          Schedule a New Session
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Patient Info */}
        <Typography variant="subtitle1" gutterBottom>
          Patient Information
        </Typography>


        <Grid container spacing={2}>
       
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={patientData.mobile}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>

          <Grid item xs={12} sm={3} display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={whatsappSame}
                  onChange={(e) => setWhatsappSame(e.target.checked)}
                  sx={{ color: '#3D3B60' }}
                />
              }
              label="WhatsApp same as Mobile"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            {!whatsappSame && (
              <TextField
                fullWidth
                label="WhatsApp Number"
                name="whatsapp"
                value={patientData.whatsapp}
                onChange={handleChange}
                sx={inputStyle}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email ID"
              name="email"
              value={patientData.email}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Address"
              name="address"
              value={patientData.address}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                backgroundColor: '#3D3B60',
                color: '#fff',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#57547a',
                },
              }}
              onClick={newPatient}
            >
              Add New Patient
            </Button>
          </Grid>
        </Grid>


        <Divider sx={{ my: 4 }} />

        {/* Existing Patient */}
        <Typography variant="subtitle1" gutterBottom>
          Search Existing Patient
        </Typography>
        <Autocomplete
          options={patientList}
          getOptionLabel={(option) => option ? `${option.name} (${option.mobile})` : ''}
          value={existingPatient}
          onChange={(e, val) => setExistingPatient(val)}
          renderInput={(params) => <TextField {...params} label="Select Patient" sx={inputStyle} />}
          sx={{ mb: 3 }}
        />

        {/* Session Details */}
        <Typography variant="subtitle1" gutterBottom>
          Session Details
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Select Date"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                renderInput={(params) => <TextField fullWidth {...params} sx={inputStyle} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Select Time"
                value={time}
                onChange={(newTime) => setTime(newTime)}
                renderInput={(params) => <TextField fullWidth {...params} sx={inputStyle} />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <TextField
          select
          fullWidth
          label="Session Type"
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          sx={{ mt: 3, ...inputStyle }}
        >
          <MenuItem value="in-person">In-Person</MenuItem>
          <MenuItem value="online">Online</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
            backgroundColor: '#3D3B60',
            color: '#fff',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#57547a',
            },
          }}
          onClick={handleSubmit}
        >
          Schedule Session
        </Button>
      </Paper>
    </Container>
  );
}
