
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
import APIURL from '../APIURL';
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
            .get(`${APIURL.url}/api/illustration/${illustrationId}`)
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

