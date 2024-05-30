import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import './detailsClient.css'
import {
    Container,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Checkbox
} from '@mui/material';

export const DetailsClientPage = () => {
    const { id } = useParams();
    const [paymentplan, setPaymentPlan] = useState(null);
    const [quotas,setQuotas] = useState(null)

    useEffect(() => {
        const fetchPaymentPlan = async () => {
            try {
                const response = await axios.get(`${urlGlobal}paymentplan/getPaymentPlans/${id}`);
                const paymentPlanData = response.data;
                if (Array.isArray(paymentPlanData) && paymentPlanData.length > 0) {
                    setPaymentPlan(paymentPlanData[0]);
                } else {
                    setPaymentPlan(null);
                }
                const quotasResponse = await axios.get(`${urlGlobal}paymentplan/getQuotas/${id}`);
                const quotas = quotasResponse.data;

            } catch (error) {
                console.error('Error fetching payment plans:', error);
            }
        };
        fetchPaymentPlan();
    }, [id]);
    useEffect(() => {
        const fetchQuotas = async () => {
            try {
                const quotasResponse = await axios.get(`${urlGlobal}paymentplan/getQuotas/${id}`);
                const quotas = quotasResponse.data;
                setQuotas(quotas);
            } catch (error) {
                console.error('Error fetching quotas:', error);
            }
        };
        fetchQuotas();
    }, [id]);

    if (!paymentplan) {
        return <Typography variant="h6">Loading...</Typography>;
    }
    const handleCheckboxChange = (event, quota) => {
        if (!quota.payed && event.target.checked) {
            console.log('Hola Mundo');
        }
    };
    const estado = (q)=>{
        let msg = "";
        if (q.outofdate && !q.payed){
            msg = 'Vencido'
        }else if (q.outofdate && q.payed){
            msg = 'Pagado con mora'
        }else if (!q.outofdate && !q.payed){
            msg = 'Dentro de plazo'
        }else {
            msg = 'Pagado'
        }
        return msg;
    }

    return (
        <div className={"container-detailsC"}>
            <Container maxWidth={"md"} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' ,marginTop:'20px' }}>
                <Typography variant="h4" gutterBottom>Detalle de prestamo</Typography>
                <TextField
                    label="DNI del Cliente"
                    value={paymentplan.dni}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Límite de Crédito"
                    value={paymentplan.client ? paymentplan.client.credit_limit : ''}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="La tasa de interés"
                    value={paymentplan.interest_type}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Tasa de interés"
                    value={""+(paymentplan.interest_rate * 100).toFixed(2)+"%"}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="La tasa de interés moratoria"
                    value={""+(paymentplan.late_payment_rate * 100).toFixed(2)+"%"}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="La capitalización"
                    value={paymentplan.capitalization}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Costo Total"
                    value={paymentplan.total_amount}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Monto financiado"
                    value={"S/"+ paymentplan.loan_requested}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>N°</TableCell>
                                <TableCell>TNM</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Cuota</TableCell>
                                <TableCell>Interés</TableCell>
                                <TableCell>Vencimiento</TableCell>
                                <TableCell>Mora</TableCell>
                                <TableCell>Int. Comp.</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Pagado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quotas && quotas.map((quota, index) => (
                                <TableRow key={quota.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{(paymentplan.interest_rate * 100).toFixed(2)}%</TableCell>
                                    <TableCell>{quota.type}</TableCell>
                                    <TableCell>{"S/"+quota.amount}</TableCell>
                                    <TableCell>{(paymentplan.interest_rate * 100).toFixed(2)}%</TableCell>
                                    <TableCell>{new Date(quota.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{quota.moraAmount}</TableCell>
                                    <TableCell>{quota.icompamount}</TableCell>
                                    <TableCell>{estado(quota)}</TableCell>
                                    <TableCell><Checkbox
                                        checked={quota.payed}
                                        onChange={(event) => handleCheckboxChange(event, quota)}
                                        disabled={quota.payed}
                                    /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
};
