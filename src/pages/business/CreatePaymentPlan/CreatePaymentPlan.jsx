import React, {useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import Swal from "sweetalert2";

export const CreatePaymentPlan = () => {
    const [dni, setDni] = useState('');
    const [creditLimit, setCreditLimit] = useState(0);
    const [client, setClient] = useState({});
    const [interestType, setInterestType] = useState('Efectiva');
    const [interestRate, setInterestRate] = useState(0);
    const [capitalization, setCapitalization] = useState('Anual');
    const [moratoriumInterestRate, setMoratoriumInterestRate] = useState(0);
    const [paymentTerm, setPaymentTerm] = useState(1);
    const [gracePeriodType, setGracePeriodType] = useState('Total');
    const [gracePeriod, setGracePeriod] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [initialQuota, setInitialQuota] = useState(0);
    const storedUser = sessionStorage.getItem('Usuario');
    const business = storedUser ? JSON.parse(storedUser) : null;
    const [paymentPlan, setPaymentPlan] = useState({});

    const searchCreditLimit = async (event) => {
        event.preventDefault(); // Prevent page reload
        try {
            const response = await axios.get(`${urlGlobal}client/existClient/${dni}`);
            if (!response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No existe ningun Usuario con este DNI',
                    footer: 'Verifica que el DNI este escrito correctamente',
                    customClass: {
                        confirmButton: 'my-custom-button'
                    },
                    buttonsStyling: false
                });
            } else {
                try {
                    const responseClient = await axios.get(`${urlGlobal}client/findbydni/${dni}`);
                    setClient(responseClient.data);
                    setCreditLimit(responseClient.data.credit_limit); // Assuming the response contains a creditLimit field
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const validateFields = () => {
        return !(!dni || !interestRate || !moratoriumInterestRate || !totalCost || !initialQuota || totalCost <= 0);

    };
    const generatePlan=()=>{
        const today = new Date();
        const DataForm = {
            dni: dni,
            credit_limit: creditLimit,
            interest_rate: interestRate/100,
            interest_type: interestType,
            capitalization: capitalization,
            late_payment_rate: moratoriumInterestRate/100,
            term: paymentTerm,
            type_grace_period:gracePeriodType,
            grace_period: gracePeriod,
            total_amount: totalCost,
            initial_quota: initialQuota,
            initial_date: today,
            client_id :client.id,
            business_id: business.id
        }
        try {
            const paymentPlanResponse = axios.post(urlGlobal+"paymentplan",DataForm)
            setPaymentPlan(paymentPlanResponse.data);
        }catch (error){
            console.log(error)
            return false;
        }
        return true;
    }
    const handleGenerateLoan = () => {
        if (!validateFields()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos antes de continuar.',
                customClass: {
                    confirmButton: 'my-custom-button'
                },
                buttonsStyling: false
            });
        }else if ((totalCost-initialQuota) > client.credit_limit){
            Swal.fire({
                title: "¿Seguro que desean continuar?",
                text: "El prestamo solicitado supera el limite de credito del Cliente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, deso continuar de todas formas"
            }).then((result) => {
                if (result.isConfirmed) {
                    generatePlan();
                    Swal.fire({
                        title: "Plan de pago generado!",
                        text: "Generaste un plan de pago para el cliente " + client.name + " " + client.lastname,
                        icon: "success",
                        customClass: {
                            confirmButton: 'my-custom-button'
                        },
                        buttonsStyling: false
                    });
                }
            });
        }else {
            generatePlan();
            Swal.fire({
                title: "Plan de pago generado!",
                text: "Generaste un plan de pago para el cliente " + client.name + " " + client.lastname,
                icon: "success",
                customClass: {
                    confirmButton: 'my-custom-button'
                },
                buttonsStyling: false
            });
        }
    };

    return (
        <Box sx={{ backgroundColor: '#07AEBA', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 600, width: '100%', backgroundColor: 'white', borderRadius: 2, padding: 3, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom>Registro de Prestamo</Typography>
                <TextField
                    label="DNI del Cliente"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={searchCreditLimit} variant="contained" color="primary">Buscar</Button>

                <TextField
                    label="Límite de Crédito"
                    value={creditLimit}
                    onChange={(e) => setCreditLimit(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 }, readOnly: true }}
                />

                <FormControlLabel
                    control={<Checkbox checked={interestType === 'Efectiva'} onChange={() => setInterestType('Efectiva')} />}
                    label="Efectiva"
                />
                <FormControlLabel
                    control={<Checkbox checked={interestType === 'Nominal'} onChange={() => setInterestType('Nominal')} />}
                    label="Nominal"
                />

                <TextField
                    label="Tasa de interés"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    fullWidth
                    margin="normal"
                    type="number" // Cambiado a "text" para permitir números decimales
                    InputProps={{
                        inputProps: {
                            min: 0, // Mínimo permitido
                        },
                        endAdornment: <span>%</span>,
                    }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id={"select-cap"}>Selecciona la capitalización</InputLabel>
                    <Select
                        labelId="select-cap"
                        label="Selecciona la capitalización"
                        value={capitalization}
                        onChange={(e) => setCapitalization(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="Anual">Anual</MenuItem>
                        <MenuItem value="Semestral">Semestral</MenuItem>
                        <MenuItem value="Cuatrimestral">Cuatrimestral</MenuItem>
                        <MenuItem value="Trimestral">Trimestral</MenuItem>
                        <MenuItem value="Bimestral">Bimestral</MenuItem>
                        <MenuItem value="Mensual">Mensual</MenuItem>
                        <MenuItem value="Quincenal">Quincenal</MenuItem>
                        <MenuItem value="Diaria">Diaria</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Tasa de interés moratoria"
                    value={moratoriumInterestRate}
                    fullWidth
                    onChange={(e) => setMoratoriumInterestRate(e.target.value)}
                    margin="normal"
                    type={'number'}
                    InputProps={{
                        inputProps: {
                            min: 0, // Mínimo permitido
                        },
                        endAdornment: <span>%</span>,
                    }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id={"select-term"}>Plazo de pago</InputLabel>
                    <Select
                        label="Plazo de pago"
                        value={paymentTerm}
                        onChange={(e) => setPaymentTerm(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value={1}>1 mes</MenuItem>
                        <MenuItem value={2}>2 meses</MenuItem>
                        <MenuItem value={3}>3 meses</MenuItem>
                        {/* Add more options as necessary */}
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={<Checkbox checked={gracePeriodType === 'Total'} onChange={() => setGracePeriodType('Total')} />}
                    label="Periodo de Gracia Total"
                />
                <FormControlLabel
                    control={<Checkbox checked={gracePeriodType === 'Parcial'} onChange={() => setGracePeriodType('Parcial')} />}
                    label="Periodo de Gracia Parcial"
                />

                <TextField
                    label="Número de cuotas del periodo de gracia"
                    value={gracePeriod}
                    onChange={(e) => setGracePeriod(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                />

                <TextField
                    label="Costo Total"
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                />

                <TextField
                    label="Cuota Inicial"
                    value={initialQuota}
                    onChange={(e) => setInitialQuota(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                />

                <Button variant="contained" color="primary" onClick={handleGenerateLoan} fullWidth>
                    Generar Prestamo
                </Button>
            </Box>
        </Box>
    );
};