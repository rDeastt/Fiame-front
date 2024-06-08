import React, { useState } from 'react';
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
import { urlGlobal } from "../../../environment/env.js";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CreatePaymentPlan = () => {
    const [dni, setDni] = useState('');
    const [creditLimit, setCreditLimit] = useState(0);
    const [client, setClient] = useState({});
    const [consumptionDate, setConsumptionDate] = useState(new Date());
    const [interestType, setInterestType] = useState('');
    const [specificInterestType, setSpecificInterestType] = useState('');
    const [canGeneratePaymentBag, setCanGeneratePaymentBag] = useState(false);
    const [paymentBagGenerated, setPaymentBagGenerated] = useState(false);
    const [interestRate, setInterestRate] = useState(0);
    const [capitalization, setCapitalization] = useState('Anual');
    const [moratoriumInterestRate, setMoratoriumInterestRate] = useState(0);
    const [paymentTerm, setPaymentTerm] = useState(1);
    const [gracePeriodType, setGracePeriodType] = useState('Total');
    const [gracePeriod, setGracePeriod] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [initialQuota, setInitialQuota] = useState(0);
    const [selectedForm, setSelectedForm] = useState('Anualidad');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('2024');
    const [storeConsumption, setStoreConsumption] = useState(0);

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
        if (selectedForm === 'Anualidad') {
            return !(!dni || !interestRate || !moratoriumInterestRate || !totalCost || !initialQuota || totalCost <= 0);
        } else {
            return !(!dni || !day || !month || !year || !interestRate || !moratoriumInterestRate || !storeConsumption || !paymentBagGenerated);
        }
    };

    const handleRegisterConsumption = async () => {
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
        } else {
            const DataForm2 = {
                consumption_store: storeConsumption,
                interest_type: specificInterestType,
                interest_rate: interestRate / 100,
                capitalization: interestType === 'Efectiva' ? 'NO' : capitalization,
                consumption_date: consumptionDate.toISOString().split('T')[0], // Convert to LocalDate format (yyyy-mm-dd)
                late_payment_rate: moratoriumInterestRate / 100,
                client_id: client.id,
                business_id: business.id
            };
            console.log(DataForm2);
            try {
                const response = await axios.post(`${urlGlobal}paymentbag/registerconsumo`, DataForm2);
                const message = response.data;
                if (message.includes("Registrado satisfactoriamente")) {
                    Swal.fire({
                        title: "Consumo registrado!",
                        text: message,
                        icon: "success",
                        customClass: {
                            confirmButton: 'my-custom-button'
                        },
                        buttonsStyling: false
                    }).then(() => {
                        resetForm(); // Reset form after successful registration
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: message,
                        customClass: {
                            confirmButton: 'my-custom-button'
                        },
                        buttonsStyling: false
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el consumo.',
                    customClass: {
                        confirmButton: 'my-custom-button'
                    },
                    buttonsStyling: false
                });
            }
        }
    };

    const resetForm = () => {
        setDni('');
        setCreditLimit(0);
        setClient({});
        setConsumptionDate(new Date());
        setInterestType('');
        setSpecificInterestType('');
        setCanGeneratePaymentBag(false);
        setPaymentBagGenerated(false);
        setInterestRate(0);
        setCapitalization('Anual');
        setMoratoriumInterestRate(0);
        setPaymentTerm(1);
        setGracePeriodType('Total');
        setGracePeriod(0);
        setTotalCost(0);
        setInitialQuota(0);
        setDay('');
        setMonth('');
        setYear('2024');
        setStoreConsumption(0);
    };

    const generatePlan = () => {
        const today = new Date();
        const DataForm = {
            dni: dni,
            credit_limit: creditLimit,
            interest_rate: interestRate / 100,
            interest_type: specificInterestType,
            capitalization: capitalization,
            late_payment_rate: moratoriumInterestRate / 100,
            term: paymentTerm,
            type_grace_period: gracePeriodType,
            grace_period: gracePeriod,
            total_amount: totalCost,
            initial_quota: initialQuota,
            initial_date: today,
            client_id: client.id,
            business_id: business.id
        }
        try {
            const paymentPlanResponse = axios.post(urlGlobal + "paymentplan", DataForm)
            setPaymentPlan(paymentPlanResponse.data);
        } catch (error) {
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
        } else if ((totalCost - initialQuota) > client.credit_limit) {
            Swal.fire({
                title: "¿Seguro que deseas continuar?",
                text: "El prestamo solicitado supera el limite de credito del Cliente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, deseo continuar de todas formas"
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
        } else {
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

    const handleGeneratePaymentBag = async () => {
        if (!dni || !client.id || !business.id || !day || !month || !year) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos antes de continuar.',
                customClass: {
                    confirmButton: 'my-custom-button'
                },
                buttonsStyling: false
            });
            return;
        }

        try {
            const response = await axios.get(`${urlGlobal}paymentbag/exist/${client.id}/${business.id}`);
            if (response.data) {
                setPaymentBagGenerated(true);
                Swal.fire({
                    title: "Ya existe una bolsa de pago",
                    text: "Para este cliente ya existe una bolsa de pago en esta tienda.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, deseo continuar de todas formas"
                });
            } else {
                await axios.post(`${urlGlobal}paymentbag/create/${client.id}/${business.id}/${day}/${month}/${year}`);
                setPaymentBagGenerated(true);
                Swal.fire({
                    title: "Bolsa de pago generada!",
                    text: "Has generado una bolsa de pago para la fecha seleccionada.",
                    icon: "success",
                    customClass: {
                        confirmButton: 'my-custom-button'
                    },
                    buttonsStyling: false
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#07AEBA', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 600, width: '100%', backgroundColor: 'white', borderRadius: 2, padding: 3, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button variant={selectedForm === 'Anualidad' ? "contained" : "outlined"} onClick={() => setSelectedForm('Anualidad')}>Anualidad</Button>
                    <Button variant={selectedForm === 'Consumo en tienda' ? "contained" : "outlined"} onClick={() => setSelectedForm('Consumo en tienda')}>Consumo en tienda</Button>
                </Box>
                {selectedForm === 'Anualidad' ? (
                    <>
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
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
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
                            label="Tasa de interés moratorio"
                            value={moratoriumInterestRate}
                            onChange={(e) => setMoratoriumInterestRate(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                },
                                endAdornment: <span>%</span>,
                            }}
                        />

                        <TextField
                            label="Plazo de pago (en meses)"
                            value={paymentTerm}
                            onChange={(e) => setPaymentTerm(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                }
                            }}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select-grace">Selecciona tipo de período de gracia</InputLabel>
                            <Select
                                labelId="select-grace"
                                label="Selecciona tipo de período de gracia"
                                value={gracePeriodType}
                                onChange={(e) => setGracePeriodType(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Total">Total</MenuItem>
                                <MenuItem value="Parcial">Parcial</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Período de gracia (en meses)"
                            value={gracePeriod}
                            onChange={(e) => setGracePeriod(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                }
                            }}
                        />

                        <TextField
                            label="Costo total del bien"
                            value={totalCost}
                            onChange={(e) => setTotalCost(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                }
                            }}
                        />

                        <TextField
                            label="Cuota inicial"
                            value={initialQuota}
                            onChange={(e) => setInitialQuota(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                }
                            }}
                        />

                        <Button onClick={handleGenerateLoan} variant="contained" color="primary">Generar préstamo</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>Registro de Consumo en Tienda</Typography>
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
                        <TextField
                            label="Dia"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 31
                                }
                            }}
                        />
                        <TextField
                            label="Mes"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 12
                                }
                            }}
                        />
                        <TextField
                            label="Año"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 2024
                                }
                            }}
                        />
                        <Button onClick={handleGeneratePaymentBag} variant="contained" color="primary">Generar Bolsa de Pago</Button>
                        <TextField
                            label="Monto a Consumir"
                            value={storeConsumption}
                            onChange={(e) => setStoreConsumption(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                }
                            }}
                            disabled={!paymentBagGenerated && selectedForm === 'Consumo en tienda'} // <- Modificado
                        />
                        <Box display="flex" flexDirection="column" gap={2}>
                            <DatePicker
                                selected={consumptionDate}
                                onChange={(date) => setConsumptionDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="react-datepicker__input-container"
                                showPopperArrow={false}
                                customInput={<TextField fullWidth margin="normal" sx={{ backgroundColor: '#FFFFFF', borderRadius: '5px' }} label="Fecha de consumo" />}
                            />

                            <Box display="flex" gap={2}>
                                <FormControlLabel
                                    control={<Checkbox checked={interestType === 'Efectiva'} onChange={() => { setInterestType('Efectiva'); setSpecificInterestType(''); }} />}
                                    label="Efectiva"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={interestType === 'Nominal'} onChange={() => { setInterestType('Nominal'); setSpecificInterestType(''); }} />}
                                    label="Nominal"
                                />
                            </Box>

                            {interestType === 'Efectiva' && (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="select-effective-rate">Tipos de Tasa Efectiva</InputLabel>
                                    <Select
                                        labelId="select-effective-rate"
                                        label="Tipos de Tasa Efectiva"
                                        value={specificInterestType}
                                        onChange={(e) => setSpecificInterestType(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value="TET">TET</MenuItem>
                                        <MenuItem value="TEB">TEB</MenuItem>
                                        <MenuItem value="TEM">TEM</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            {interestType === 'Nominal' && (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="select-nominal-rate">Tipos de Tasa Nominal</InputLabel>
                                    <Select
                                        labelId="select-nominal-rate"
                                        label="Tipos de Tasa Nominal"
                                        value={specificInterestType}
                                        onChange={(e) => setSpecificInterestType(e.target.value)}
                                        fullWidth
                                    >
                                        <MenuItem value="TNT">TNT</MenuItem>
                                        <MenuItem value="TNB">TNB</MenuItem>
                                        <MenuItem value="TNM">TNM</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                        <TextField
                            label="Tasa de interés"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                },
                                endAdornment: <span>%</span>,
                            }}
                            disabled={!paymentBagGenerated && selectedForm === 'Consumo en tienda'} // <- Modificado
                        />
                        <TextField
                            label="Tasa de interés moratorio"
                            value={moratoriumInterestRate}
                            onChange={(e) => setMoratoriumInterestRate(e.target.value)}
                            fullWidth
                            margin="normal"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                },
                                endAdornment: <span>%</span>,
                            }}
                            disabled={!paymentBagGenerated && selectedForm === 'Consumo en tienda'} // <- Modificado
                        />
                        <Button onClick={handleRegisterConsumption} variant="contained" color="primary" disabled={!paymentBagGenerated}>Registrar Consumo</Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default CreatePaymentPlan;