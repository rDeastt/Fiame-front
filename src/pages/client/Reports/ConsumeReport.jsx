import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { urlGlobal } from "../../../environment/env.js";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";

export const ConsumeReport = () => {
    const { id } = useParams(); //id de usuario
    const [paymentplans, setPaymentPlans] = useState([]);
    const [paymentBagReport, setPaymentBagReport] = useState([]);
    const [month, setMonth] = useState(1);
    const [view, setView] = useState('plan'); // Estado para manejar la vista (plan o bolsa)
    const [year, setYear] = useState(new Date().getFullYear());
    const convertDate=(fecha)=>{
        if (fecha === null){
            return '-'
        }
        return new Date(fecha).toLocaleDateString();
    }
    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/historyPaymentPlansClient/' + id);
                const paymentPlansData = response.data;
                setPaymentPlans(paymentPlansData.filter(plan => plan.payed)); // Filtrar planes de pago que stán pagados
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentPlans([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment plans:', error);
                }
            }
        };
        fetchPaymentPlans();
    }, [id]);

    useEffect(() => {
        if (view === 'bolsa') {
            const fetchPaymentBagReport = async () => {
                try {
                    const response = await axios.get(`${urlGlobal}paymentbag/reporteconsumos/${id}/${month}/${year}`);
                    setPaymentBagReport(response.data);
                } catch (error) {
                    console.error('Error fetching payment bag report:', error);
                }
            };
            fetchPaymentBagReport();
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
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Producto</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Costo del Producto</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha Solicitada</TableCell>
                                {/* Agrega más cabeceras si es necesario */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {view === 'plan' ? (
                                paymentplans.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>{payment.id}</TableCell>
                                        <TableCell>{payment.business.name}</TableCell>
                                        <TableCell>{payment.description}</TableCell>
                                        <TableCell>{payment.total_amount}</TableCell>
                                        <TableCell>{convertDate(payment.dayGenerated)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                paymentBagReport.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{payment.business_name}</TableCell>
                                        <TableCell>{payment.detalle}</TableCell>
                                        <TableCell>{payment.consumo_total}</TableCell>
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
