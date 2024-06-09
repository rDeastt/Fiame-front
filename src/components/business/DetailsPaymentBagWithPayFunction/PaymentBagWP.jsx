import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urlGlobal } from '../../../environment/env.js';
import Swal from "sweetalert2";
import {
    Box, Button, CircularProgress,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";

export const PaymentBagDetailsBusiness = () => {
    const { clientId, businessId } = useParams();
    const navigate = useNavigate();
    const [paymentBag, setPaymentBag] = useState(null);
    const [totalConsumed, setTotalConsumed] = useState(null);
    const [totalWithInterest, setTotalWithInterest] = useState(null);
    const [amountToPay, setAmountToPay] = useState('');

    useEffect(() => {
        const fetchPaymentBag = async () => {
            try {
                const response = await axios.get(`${urlGlobal}paymentbag/specificpaymentbag/${clientId}/${businessId}`);
                setPaymentBag(response.data);
            } catch (error) {
                console.error('Error fetching payment bag details:', error);
            }
        };

        const fetchTotalConsumed = async () => {
            try {
                const response = await axios.get(`${urlGlobal}paymentbag/totalconsumed/${clientId}/${businessId}`);
                setTotalConsumed(response.data);
            } catch (error) {
                console.error('Error fetching total consumed:', error);
            }
        };

        const fetchTotalWithInterest = async () => {
            try {
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                const response = await axios.get(`${urlGlobal}paymentbag/totalwithinterests/${clientId}/${businessId}/${day}/${month}/${year}`);
                setTotalWithInterest(response.data);
            } catch (error) {
                console.error('Error fetching total with interest:', error);
            }
        };

        fetchPaymentBag();
        fetchTotalConsumed();
        fetchTotalWithInterest();
    }, [clientId, businessId]);

    const handlePay = async () => {
        if (parseFloat(amountToPay) > totalWithInterest) {
            Swal.fire({
                title: 'Error',
                text: 'Has ingresado un valor mayor que el esperado.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        try {
            const response = await axios.post(`${urlGlobal}paymentbag/pay/${clientId}/${businessId}/${day}/${month}/${year}/${amountToPay}`);
            Swal.fire({
                title: 'Éxito',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/Business/ActiveClients');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al realizar el pago.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    if (!paymentBag || totalConsumed === null || totalWithInterest === null) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#07AEBA', minHeight: 'calc(100vh - 64px)', py: 4 }}>
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Detalle de Bolsa de Pago
                        </Typography>
                        <Box component="form" sx={{ mb: 2, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <TextField label="DNI del Cliente" value={paymentBag.client.dni} InputProps={{ readOnly: true }} fullWidth />
                            <TextField label="Límite de Crédito" value={paymentBag.client.credit_limit} InputProps={{ readOnly: true }} fullWidth />
                            <TextField label="Total de todos los consumos" value={totalConsumed} InputProps={{ readOnly: true }} fullWidth />
                            <TextField label="Fecha de pago de la bolsa de pago" value={paymentBag.day_with_month_payment} InputProps={{ readOnly: true }} fullWidth />
                        </Box>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Realizar Pago
                        </Typography>
                        <Box component="form" sx={{ mb: 2, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <TextField label="Total a pagar (con intereses hasta hoy)" value={totalWithInterest} InputProps={{ readOnly: true }} fullWidth />
                            <TextField
                                label="Monto a pagar"
                                value={amountToPay}
                                onChange={(e) => setAmountToPay(e.target.value)}
                                fullWidth
                            />
                        </Box>
                        <Button variant="contained" color="primary" onClick={handlePay}>
                            PAGAR
                        </Button>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                            Consumos
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ bgcolor: '#07AEBA' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Consumo de tienda</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipo de interés</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tasa de interés</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Capitalización</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha del consumo</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tasa de interés moratoria</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paymentBag.list_pay_without_instalments.map((consumption) => (
                                        <TableRow key={consumption.idInstalment}>
                                            <TableCell>{consumption.consumption_store}</TableCell>
                                            <TableCell>{consumption.interest_type}</TableCell>
                                            <TableCell>{consumption.interest_rate}</TableCell>
                                            <TableCell>{consumption.capitalization}</TableCell>
                                            <TableCell>{consumption.consumption_date}</TableCell>
                                            <TableCell>{consumption.late_payment_rate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};
