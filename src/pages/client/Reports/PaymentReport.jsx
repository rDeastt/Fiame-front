import React, { useState, useEffect } from 'react';
import { Box, Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import axios from 'axios';
import { urlGlobal } from "../../../environment/env.js";
import { useParams } from "react-router-dom";

export const PaymentReport = () => {
    const { id } = useParams(); //id de usuario
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [view, setView] = useState('plan'); // Estado para manejar la vista (plan o bolsa)
    const [quotaReportPayments, setQuotaReportPayments] = useState([]);
    const [paymentBagReport, setPaymentBagReport] = useState([]);
    const convertDate=(fecha)=>{
        if (fecha === null){
            return '-'
        }
        return new Date(fecha).toLocaleDateString();
    }
    useEffect(() => {
        if (view === 'plan') {
            axios.get(`${urlGlobal}paymentplan/reportePagos/${id}/${month}/${year}`)
                .then(response => setQuotaReportPayments(response.data))
                .catch(error => console.error(error));
        } else {
            axios.get(`${urlGlobal}paymentbag/reportepagos/${id}/${month}/${year}`)
                .then(response => setPaymentBagReport(response.data))
                .catch(error => console.error(error));
        }
    }, [id, month, year, view]);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 'calc(100vh - 64px)',
                backgroundColor: '#07AEBA',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: 4
            }}
        >
            <Container sx={{ backgroundColor: '#fff', padding: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl>
                            <InputLabel id="month-label">Mes</InputLabel>
                            <Select
                                labelId="month-label"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                <MenuItem value={1}>Enero</MenuItem>
                                <MenuItem value={2}>Febrero</MenuItem>
                                <MenuItem value={3}>Marzo</MenuItem>
                                <MenuItem value={4}>Abril</MenuItem>
                                <MenuItem value={5}>Mayo</MenuItem>
                                <MenuItem value={6}>Junio</MenuItem>
                                <MenuItem value={7}>Julio</MenuItem>
                                <MenuItem value={8}>Agosto</MenuItem>
                                <MenuItem value={9}>Setiembre</MenuItem>
                                <MenuItem value={10}>Octubre</MenuItem>
                                <MenuItem value={11}>Noviembre</MenuItem>
                                <MenuItem value={12}>Diciembre</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="year-label">Año</InputLabel>
                            <Select
                                labelId="year-label"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2024}>2024</MenuItem>
                                {/* Agrega más años si es necesario */}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            variant={view === 'plan' ? 'contained' : 'outlined'}
                            onClick={() => setView('plan')}
                            sx={{ marginRight: 2 }}
                        >
                            Plan de Pagos
                        </Button>
                        <Button
                            variant={view === 'bolsa' ? 'contained' : 'outlined'}
                            onClick={() => setView('bolsa')}
                        >
                            Bolsa de Pagos
                        </Button>
                    </Box>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#07AEBA' }}>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre del Negocio</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Monto pagado</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha de pago</TableCell>
                                {/* Agrega más cabeceras si es necesario */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {view === 'plan' ? (
                                quotaReportPayments.map((payment) => (
                                    <TableRow key={payment.paymentId}>
                                        <TableCell>{payment.paymentId}</TableCell>
                                        <TableCell>{payment.businessName}</TableCell>
                                        <TableCell>{payment.amount}</TableCell>
                                        <TableCell>{convertDate(payment.paymentDate)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                paymentBagReport.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{payment.business_name}</TableCell>
                                        <TableCell>{payment.pago_total}</TableCell>
                                        <TableCell>{payment.consumo_date}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};
