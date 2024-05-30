import { TextField, Typography } from '@mui/material';

export const PaymentPlanDetail = ({ paymentplan }) => {
    return (
        <>
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
                value={"" + (paymentplan.interest_rate * 100).toFixed(2) + "%"}
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                label="La tasa de interés moratoria"
                value={"" + (paymentplan.late_payment_rate * 100).toFixed(2) + "%"}
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
                value={"S/" + paymentplan.loan_requested}
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
        </>
    );
};