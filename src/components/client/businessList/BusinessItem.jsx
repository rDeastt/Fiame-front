import React, {useEffect, useState} from 'react';
import './businessList.css';
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import {Link} from "react-router-dom";

export const BusinessItem = ({ data, type }) => {
    const { business, quotas, list_pay_without_instalments } = data;
    const [totalWithInterest, setTotalWithInterest] = useState('N/A');

    useEffect(() => {
        if (type === 'paymentbag') {
            const fetchTotalWithInterest = async () => {
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1; // Enero es 0
                const year = today.getFullYear();

                try {
                    const response = await axios.get(`${urlGlobal}paymentbag/totalwithinterests/${data.client?.id}/${business.id}/${day}/${month}/${year}`);
                    setTotalWithInterest(response.data);
                } catch (error) {
                    console.error('Error fetching total with interest:', error);
                }
            };

            fetchTotalWithInterest();
        }
    }, [data, business, type]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const renderPaymentPlanInfo = () => {
        const sortedQuotas = quotas.sort((a, b) => a.id - b.id);
        const nextQuota = sortedQuotas.find(quota => !quota.payed);

        return (
            <div className="quota-info">
                <p className="info-item">Cuota: {nextQuota ? nextQuota.amount : 'N/A'}</p>
                <p className="info-item">Vencimiento: {nextQuota ? formatDate(nextQuota.date) : 'N/A'}</p>
                <p className="info-item">Monto total: {data.total_amount}</p>
            </div>
        );
    };

    const renderPaymentBagInfo = () => {
        return (
            <div className="quota-info">
                <p className="info-item">Total de pago por consumo: {totalWithInterest}</p>
                <p className="info-item">Vencimiento: {formatDate(data.day_with_month_payment)}</p>
                <p className="info-item">Tipo de préstamo: consumos reiterativos</p>
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
                <Link to={"/Client/Details/"+data.id}>
                    <button className="details-button">Más detalles</button>
                </Link>
            </div>
        </div>
    );
};

