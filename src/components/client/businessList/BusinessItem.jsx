import React from 'react';
import './businessList.css';

export const BusinessItem = ({ plan }) => {
    const { business, quotas } = plan;
    // Ordenar las cuotas por su id
    const sortedQuotas = quotas.sort((a, b) => a.id - b.id);
    // Encontrar la próxima cuota no pagada
    const nextQuota = sortedQuotas.find(quota => !quota.payed);

    return (
        <div className="business-item">
            <img src={"src/assets/tienda.jpg"} alt="Business" className="business-image"/>
            <div className="business-info">
                <p className="info-item">Nombre: {business.name}</p>
                <p className="info-item">RUC: {business.ruc}</p>
                <div className="quota-info">
                    <p className="info-item">Cuota: {nextQuota ? nextQuota.amount : 'N/A'}</p>
                    <p className="info-item">Vencimiento: {nextQuota ? new Date(nextQuota.date).toLocaleDateString() : 'N/A'}</p>
                    <p className="info-item">Monto total: {plan.total_amount}</p>
                </div>
            </div>
            <div className="action-container">
                <div className={`status ${nextQuota && nextQuota.outofdate ? 'overdue' : 'within-term'}`}>
                    <p>{nextQuota && nextQuota.outofdate ? 'Plazo vencido, Interes con mora' : 'Dentro del plazo'}</p>
                </div>
                <button className="details-button">Más detalles</button>
            </div>
        </div>
    );
};

