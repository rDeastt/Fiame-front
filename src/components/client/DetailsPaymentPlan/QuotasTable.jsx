import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {QuotaRow} from "./QuotaRow.jsx";
export const QuotasTable = ({ quotas, paymentplan, handleCheckboxChange }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead className={"table-headerD"}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>N°</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipo</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TEM</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cuota</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Interés</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vencimiento</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mora</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Int. Comp.</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Pago</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pagado</TableCell>
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