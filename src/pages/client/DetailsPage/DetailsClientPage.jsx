import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";

export const DetailsClientPage = () => {
    const { id } = useParams();
    const [paymentplan, setPaymentPlan] = useState({});

    useEffect(() => {
        const fetchPaymentPlan = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getPaymentPlans/' + id);
                const paymentPlanData = response.data;
                setPaymentPlan(paymentPlanData);
            } catch (error) {
                console.error('Error fetching payment plans:', error);
            }
        };
        fetchPaymentPlan();
    }, [id]);

    console.log(paymentplan);

    return (
        <div style={{ backgroundColor: '#00b0f0' }}>
            <div className="container-detalles">
                <table>
                    <tbody>
                    <tr>
                        <td>DNI:</td>
                        <td>{paymentplan.dni}</td>
                    </tr>
                    <tr>
                        <td>Límite de Crédito:</td>
                        <td>{paymentplan.client && paymentplan.client.credit_limit}</td>
                    </tr>
                    <tr>
                        <td>Tasa de Interés:</td>
                        <td>{paymentplan.interest_rate}</td>
                    </tr>
                    <tr>
                        <td>Tipo de Tasa de Interés:</td>
                        <td>{paymentplan.interest_type}</td>
                    </tr>
                    <tr>
                        <td>Tasa de Interés Moratoria:</td>
                        <td>{paymentplan.late_payment_rate}</td>
                    </tr>
                    <tr>
                        <td>Capitalización:</td>
                        <td>{paymentplan.capitalization}</td>
                    </tr>
                    <tr>
                        <td>Costo Total:</td>
                        <td>{paymentplan.total_amount}</td>
                    </tr>
                    <tr>
                        <td>Cuotas:</td>
                        <td>
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                    <th>Pagado</th>
                                    <th>Fuera de Fecha</th>
                                    <th>Tipo</th>
                                    <th>Monto de Mora</th>
                                    <th>Monto de Capital</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paymentplan.quotas && paymentplan.quotas.map(quota => (
                                    <tr key={quota.id}>
                                        <td>{quota.id}</td>
                                        <td>{quota.amount}</td>
                                        <td>{quota.date}</td>
                                        <td>{quota.payed ? 'Sí' : 'No'}</td>
                                        <td>{quota.outofdate ? 'Sí' : 'No'}</td>
                                        <td>{quota.type}</td>
                                        <td>{quota.moraAmount}</td>
                                        <td>{quota.icompamount}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

