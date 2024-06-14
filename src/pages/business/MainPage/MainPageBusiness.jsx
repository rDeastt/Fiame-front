import React, {useEffect, useState} from 'react';
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import {QuotaSummary} from "../../../components/business/Charts/QuotaSummary.jsx";
import {LoanBalanceChart} from "../../../components/business/Charts/LoanBalanceChart.jsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Box, Container, Grid, Paper, TextField} from "@mui/material";
import moment from "moment";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

// Registrar componentes con Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);
export const MainPageBusiness = () => {
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [quotaSummary, setQuotaSummary] = useState([]);
    const [startDate, setStartDate] = useState(moment().subtract(7, 'days').format('YYYY-MM-DD'));

    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getPaymentPlansBusiness/' + user.id);
                const paymentPlansData = response.data;
                setPaymentPlans(paymentPlansData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentPlans([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment plans:', error);
                }
            }
        };

        const fetchQuotaSummary = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getQuotaSummaryByBusiness/' + user.id);
                setQuotaSummary(response.data);
            } catch (error) {
                console.error('Error fetching quota summary:', error);
            }
        }

        fetchPaymentPlans();
        fetchQuotaSummary();
    }, [user.id]);

    const handleDateChange = (newDate) => {
        setStartDate(newDate.format('YYYY-MM-DD'));
    };

    console.log(quotaSummary);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ bgcolor: '#07AEBA', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container maxWidth="xl" sx={{ padding: 4, borderRadius: 2 }}>
                    <h2>Dashboard de Negocios</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <QuotaSummary quotaSummary={quotaSummary} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{padding: 2}}>
                                <h2>Evolución del Saldo de los Préstamos</h2>
                                <MobileDatePicker
                                    label="Fecha de inicio"
                                    inputFormat="MM/DD/YYYY"
                                    value={moment(startDate)}
                                    onChange={(newDate) => handleDateChange(newDate)}
                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                />
                                <LoanBalanceChart businessId={user.id} startDate={startDate}/>
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </LocalizationProvider>
    );
};