import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {QuotaRow} from "./QuotaRow.jsx";
export const QuotasTable = ({ quotas, paymentplan, handleCheckboxChange }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead className={"table-headerD"}>
                    <TableRow>
                        <TableCell>N°</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>TEM</TableCell>
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
                    {quotas.map((quota) => (
                        <QuotaRow key={quota.id} quota={quota} paymentplan={paymentplan} handleCheckboxChange={handleCheckboxChange} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};