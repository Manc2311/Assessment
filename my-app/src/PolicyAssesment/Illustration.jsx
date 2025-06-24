// export default function Illustration() {
//   const data = JSON.parse(localStorage.getItem('illustration')) || {};
//   return (
//     <table>
//       <thead>
//         <tr><th>Total Premium</th><th>Maturity Amount</th></tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>{data.totalPremium}</td>
//           <td>{data.maturityAmount}</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }

// export default function Illustration() {
//   const data = JSON.parse(localStorage.getItem('illustration')) || {
//     totalPremium: 0,
//     maturityAmount: 0,
//     rows: [] // array of each year's data
//   };


//   return (
//     <div>
//       {/* Summary table */}
//       <table border="1" cellPadding="8" style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>
//         <thead>
//           <tr>
//             <th>Total Premium</th>
//             <th>Maturity Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{data.totalPremium}</td>
//             <td>{data.maturityAmount}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Detailed Year-wise Illustration Table */}
//       <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'center' }}>
//         <thead>
//           <tr>
//             <th>Policy Year</th>
//             <th>Premium</th>
//             <th>Sum Assured</th>
//             <th>Bonus Rate</th>
//             <th>Bonus Amount</th>
//             <th>Total Benefit</th>
//             <th>Net Cashflows</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.rows?.map((row, index) => (
//             <tr key={index}>
//               <td>{row.policyYear}</td>
//               <td>{row.premium}</td>
//               <td>{row.sumAssured}</td>
//               <td>{row.bonusRate}</td>
//               <td>{row.bonusAmount}</td>
//               <td>{row.totalBenefit}</td>
//               <td>{row.netCashflow}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function Illustration() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const illustrationId = localStorage.getItem('illustrationId');

  useEffect(() => {
    if (!illustrationId) {
      setError('No illustration ID found.');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/api/illustration/${illustrationId}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load illustration.');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Illustration Summary
      </Typography>

      {/* Summary Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Total Premium</strong></TableCell>
              <TableCell align="center"><strong>Maturity Amount</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">₹ {data.totalPremium}</TableCell>
              <TableCell align="center">₹ {data.maturityAmount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>
        Year-wise Illustration
      </Typography>

      {/* Year-wise Details */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Policy Year</strong></TableCell>
              <TableCell align="center"><strong>Premium</strong></TableCell>
              <TableCell align="center"><strong>Sum Assured</strong></TableCell>
              <TableCell align="center"><strong>Bonus Rate</strong></TableCell>
              <TableCell align="center"><strong>Bonus Amount</strong></TableCell>
              <TableCell align="center"><strong>Total Benefit</strong></TableCell>
              <TableCell align="center"><strong>Net Cashflows</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.illustrationData?.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.policyYear}</TableCell>
                <TableCell align="center">₹ {row.premium}</TableCell>
                <TableCell align="center">₹ {row.sumAssured}</TableCell>
                <TableCell align="center">{row.bonusRate}</TableCell>
                <TableCell align="center">₹ {row.bonusAmount}</TableCell>
                <TableCell align="center">₹ {row.totalBenefit}</TableCell>
                <TableCell align="center">₹ {row.netCashflow}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

