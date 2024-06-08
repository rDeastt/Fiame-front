import React, {useEffect, useState} from 'react';
import './businessList.css';
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import {Link} from "react-router-dom";

export const BusinessItem = ({ data, type }) => {
    const { business, quotas, list_pay_without_instalments } = data;
    const [totalWithInterest, setTotalWithInterest] = useState('N/A');
    const [totalWithoutInterest, setTotalWithoutInterest] = useState('N/A'); // Estado para el total sin interés

    useEffect(() => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Enero es 0
        const year = today.getFullYear();

        const fetchTotals = async () => {
            try {
                if (type === 'paymentbag') {
                    const responseWithInterest = await axios.get(`${urlGlobal}paymentbag/totalwithinterests/${data.client?.id}/${business.id}/${day}/${month}/${year}`);
                    setTotalWithInterest(responseWithInterest.data);
                    console.log("Total with interest:", responseWithInterest.data);
                    const responseWithoutInterest = await axios.get(`${urlGlobal}paymentbag/totalconsumed/${data.client?.id}/${business.id}`);
                    setTotalWithoutInterest(responseWithoutInterest.data);
                    console.log("Total without interest:", responseWithoutInterest.data);
                }
            } catch (error) {
                console.error('Error fetching totals:', error);
            }
        };

        fetchTotals();
    }, [data, business, type]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const renderPaymentPlanInfo = () => {
        const sortedQuotas = quotas ? quotas.sort((a, b) => a.id - b.id) : [];
        const nextQuota = sortedQuotas.find(quota => !quota.payed);

        return (
            <div className="quota-info">
                <p className="info-item">Cuota: {nextQuota ? nextQuota.amount : 'N/A'}</p>
                <p className="info-item">Vencimiento: {nextQuota ? formatDate(nextQuota.date) : 'N/A'}</p>
                <p className="info-item">Monto: {nextQuota.amount + nextQuota.moraAmount + nextQuota.icompamount}</p>
            </div>
        );
    };

    const renderPaymentBagInfo = () => {
        return (
            <div className="quota-info">
                <p className="info-item">Total de pago por consumo (sin interés): {totalWithoutInterest}</p>
                <p className="info-item">Total de pago por consumo (con interés): {totalWithInterest}</p>
                <p className="info-item">Vencimiento: {formatDate(data.day_with_month_payment)}</p>
                <p className="info-item">Tipo de préstamo: Consumos Reiterativos</p>
            </div>
        );
    };

    return (
        <div className="business-item">
            <img src={"src/assets/tienda.jpg"} alt="Business" className="business-image" />
            <div className="business-info">
                <p className="info-item">Nombre: {business.name}</p>
                <p className="info-item">RUC: {business.ruc}</p>
                {type === 'paymentplan' ? renderPaymentPlanInfo() : renderPaymentBagInfo()}
            </div>
            <div className="action-container">
                {type === 'paymentplan' && quotas && quotas.length > 0 ? (
                    (() => {
                        const sortedQuotas = quotas.sort((a, b) => a.id - b.id);
                        const nextQuota = sortedQuotas.find(quota => !quota.payed);
                        return (
                            <div className={`status ${nextQuota && nextQuota.outofdate ? 'overdue' : 'within-term'}`}>
                                <p>{nextQuota && nextQuota.outofdate ? 'Plazo vencido, Interes con mora' : 'Dentro del plazo'}</p>
                            </div>
                        );
                    })()
                ) : (
                    <div className="status within-term">
                        <p>Dentro del plazo</p>
                    </div>
                )}
                <Link to={type === 'paymentplan' ? `/Client/Details/${data.id}` : `/Client/DetailsBag/${data.client.id}/${business.id}`}>
                    <button className="details-button">Más detalles</button>
                </Link>
            </div>
        </div>
    );
};
