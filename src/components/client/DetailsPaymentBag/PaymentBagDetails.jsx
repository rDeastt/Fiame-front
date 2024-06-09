import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { urlGlobal } from '../../../environment/env.js';
import './PaymentBagDetails.css';
import {
    Box, Checkbox, CircularProgress,
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


export const PaymentBagDetails = () => {
    const { clientId, businessId } = useParams();
    const [paymentBag, setPaymentBag] = useState(null);
    const [totalConsumed, setTotalConsumed] = useState(null);

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

        fetchPaymentBag();
        fetchTotalConsumed();
    }, [clientId, businessId]);

    if (!paymentBag || totalConsumed === null) {
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
// const PaymentBagDetails = () => {
//     const { clientId, businessId } = useParams();
//     const [paymentBag, setPaymentBag] = useState(null);
//     const [totalConsumed, setTotalConsumed] = useState(null); // Nuevo estado para almacenar el total consumido
//
//     useEffect(() => {
//         const fetchPaymentBag = async () => {
//             try {
//                 const response = await axios.get(`${urlGlobal}paymentbag/specificpaymentbag/${clientId}/${businessId}`);
//                 setPaymentBag(response.data);
//             } catch (error) {
//                 console.error('Error fetching payment bag details:', error);
//             }
//         };
//
//         const fetchTotalConsumed = async () => { // Nueva función para obtener el total consumido
//             try {
//                 const response = await axios.get(`${urlGlobal}paymentbag/totalconsumed/${clientId}/${businessId}`);
//                 setTotalConsumed(response.data);
//             } catch (error) {
//                 console.error('Error fetching total consumed:', error);
//             }
//         };
//
//         fetchPaymentBag();
//         fetchTotalConsumed(); // Llamada a la nueva función
//     }, [clientId, businessId]);
//
//     if (!paymentBag || totalConsumed === null) { // Asegúrate de que ambas solicitudes estén completas
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className="container-details">
//             <div className="content-container-details">
//                 <div className="payment-bag-details">
//                     <h1>Detalle de Bolsa de Pago</h1>
//                     <div className="details-section">
//                         <p>DNI del Cliente: {paymentBag.client.dni}</p>
//                         <p>Límite de Crédito: {paymentBag.client.credit_limit}</p>
//                         <p>Total de todos los consumos: {totalConsumed}</p> {/* Utiliza el nuevo estado */}
//                         <p>Fecha de pago de la bolsa de pago: {paymentBag.day_with_month_payment}</p>
//                     </div>
//                     <h2>Consumos</h2>
//                     <table className="consumptions-table">
//                         <thead>
//                         <tr>
//                             <th>Consumo de tienda</th>
//                             <th>Tipo de interés</th>
//                             <th>Tasa de interés</th>
//                             <th>Capitalización</th>
//                             <th>Fecha del consumo</th>
//                             <th>Tasa de interés moratoria</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {paymentBag.list_pay_without_instalments.map(consumption => (
//                             <tr key={consumption.idInstalment}>
//                                 <td>{consumption.consumption_store}</td>
//                                 <td>{consumption.interest_type}</td>
//                                 <td>{consumption.interest_rate}</td>
//                                 <td>{consumption.capitalization}</td>
//                                 <td>{consumption.consumption_date}</td>
//                                 <td>{consumption.late_payment_rate}</td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PaymentBagDetails;
