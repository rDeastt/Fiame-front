import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { urlGlobal } from '../../../environment/env.js';
import './PaymentBagDetails.css';

const PaymentBagDetails = () => {
    const { clientId, businessId } = useParams();
    const [paymentBag, setPaymentBag] = useState(null);
    const [totalConsumed, setTotalConsumed] = useState(null); // Nuevo estado para almacenar el total consumido

    useEffect(() => {
        const fetchPaymentBag = async () => {
            try {
                const response = await axios.get(`${urlGlobal}paymentbag/specificpaymentbag/${clientId}/${businessId}`);
                setPaymentBag(response.data);
            } catch (error) {
                console.error('Error fetching payment bag details:', error);
            }
        };

        const fetchTotalConsumed = async () => { // Nueva función para obtener el total consumido
            try {
                const response = await axios.get(`${urlGlobal}paymentbag/totalconsumed/${clientId}/${businessId}`);
                setTotalConsumed(response.data);
            } catch (error) {
                console.error('Error fetching total consumed:', error);
            }
        };

        fetchPaymentBag();
        fetchTotalConsumed(); // Llamada a la nueva función
    }, [clientId, businessId]);

    if (!paymentBag || totalConsumed === null) { // Asegúrate de que ambas solicitudes estén completas
        return <div>Loading...</div>;
    }

    return (
        <div className="container-details">
            <div className="content-container-details">
                <div className="payment-bag-details">
                    <h1>Detalle de Bolsa de Pago</h1>
                    <div className="details-section">
                        <p>DNI del Cliente: {paymentBag.client.dni}</p>
                        <p>Límite de Crédito: {paymentBag.client.credit_limit}</p>
                        <p>Total de todos los consumos: {totalConsumed}</p> {/* Utiliza el nuevo estado */}
                        <p>Fecha de pago de la bolsa de pago: {paymentBag.day_with_month_payment}</p>
                    </div>
                    <h2>Consumos</h2>
                    <table className="consumptions-table">
                        <thead>
                        <tr>
                            <th>Consumo de tienda</th>
                            <th>Tipo de interés</th>
                            <th>Tasa de interés</th>
                            <th>Capitalización</th>
                            <th>Fecha del consumo</th>
                            <th>Tasa de interés moratoria</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paymentBag.list_pay_without_instalments.map(consumption => (
                            <tr key={consumption.idInstalment}>
                                <td>{consumption.consumption_store}</td>
                                <td>{consumption.interest_type}</td>
                                <td>{consumption.interest_rate}</td>
                                <td>{consumption.capitalization}</td>
                                <td>{consumption.consumption_date}</td>
                                <td>{consumption.late_payment_rate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentBagDetails;
