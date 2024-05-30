import { TableCell, TableRow, Checkbox } from '@mui/material';

export const QuotaRow = ({ quota, paymentplan, handleCheckboxChange }) => {
    const estado = (q) => {
        let msg = "";
        if (q.outofdate && !q.payed) {
            msg = 'Vencido';
        } else if (q.outofdate && q.payed) {
            msg = 'Pagado con mora';
        } else if (!q.outofdate && !q.payed) {
            msg = 'Dentro de plazo';
        } else {
            msg = 'Pagado';
        }
        return msg;
    };
    const qType = (q)=>{
        let msg = ""
        if (q.type === "anualidad"){
            msg = "Cuota"
        }else {
            msg = "Intereses"
        }

        return msg
    }

    return (
        <TableRow key={quota.id}>
            <TableCell>{quota.id}</TableCell>
            <TableCell>{qType(quota)}</TableCell>
            <TableCell>{(quota.tem * 100).toFixed(2)}%</TableCell>
            <TableCell>{"S/" + quota.amount}</TableCell>
            <TableCell>{(paymentplan.interest_rate * 100).toFixed(2)}%</TableCell>
            <TableCell>{new Date(quota.date).toLocaleDateString()}</TableCell>
            <TableCell>{"S/"+quota.moraAmount}</TableCell>
            <TableCell>{"S/"+quota.icompamount}</TableCell>
            <TableCell>{estado(quota)}</TableCell>
            <TableCell>
                <Checkbox
                    checked={quota.payed}
                    onChange={(event) => handleCheckboxChange(event, quota)}
                    disabled={quota.payed}
                />
            </TableCell>
        </TableRow>
    );
};