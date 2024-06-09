import {useEffect, useState} from "react";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import {Link} from "react-router-dom";
import './historyPayment.css'
export const ClientItemHistory = ({ data, type }) => {
    const { business, client, quotas, list_pay_without_instalments, loan_requested, payed } = data;
    const [totalWithInterest, setTotalWithInterest] = useState('N/A');
    const [totalWithoutInterest, setTotalWithoutInterest] = useState('N/A');

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
                    console.log(responseWithInterest.data);
                    const responseWithoutInterest = await axios.get(`${urlGlobal}paymentbag/totalconsumed/${data.client?.id}/${business.id}`);
                    setTotalWithoutInterest(responseWithoutInterest.data);
                    console.log(responseWithoutInterest.data);
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
        const lastPayedQuota = sortedQuotas.filter(quota => quota.payed).sort((a, b) => new Date(b.dayPayed) - new Date(a.dayPayed))[0];

        return (
            <div className="quota-info-history">
                <p className="info-item-history">Monto del préstamo solicitado: {loan_requested}</p>
                <p className="info-item-history">Fecha del último pago: {lastPayedQuota ? formatDate(lastPayedQuota.dayPayed) : 'N/A'}</p>
            </div>
        );
    };

    const renderPaymentBagInfo = () => {
        return (
            <div className="quota-info-history">
                <p className="info-item-history">Total de pago por consumo (sin interés): {totalWithoutInterest}</p>
                <p className="info-item-history">Total de pago por consumo (con interés): {totalWithInterest}</p>
                <p className="info-item-history">Vencimiento: {formatDate(data.day_with_month_payment)}</p>
                <p className="info-item-history">Tipo de préstamo: Consumos Reiterativos</p>
            </div>
        );
    };

    return (
        <div className="business-item-history">
            <img src={"https://i.imgur.com/3PoiBzZ.png"} alt="Business" className="business-image-history" />
            <div className="business-info-history">
                <p className="info-item-history">Cliente: {client.name + " " + client.lastname}</p>
                <p className="info-item-history">DNI: {client.dni}</p>
                {type === 'paymentplan' ? renderPaymentPlanInfo() : renderPaymentBagInfo()}
            </div>
            <div className="action-container-history">
                {type === 'paymentplan' && quotas && quotas.length > 0 ? (
                    <div className={`status-history ${data.payed ? 'payed-history' : 'in-progress-history'}`}>
                        <p>{data.payed ? 'Pagado' : 'En proceso'}</p>
                    </div>
                ) : (
                    <div className={`status-history ${data.payed ? 'payed-history' : 'in-progress-history'}`}>
                        <p>{data.payed ? 'Pagado' : 'En proceso'}</p>
                    </div>
                )}
                <Link to={type === 'paymentplan' ? `/Business/Details/${data.id}` : `/Business/Details/${data.client.id}/${business.id}`}>
                    <button className="details-button-history">Más detalles</button>
                </Link>
            </div>
        </div>
    );
};