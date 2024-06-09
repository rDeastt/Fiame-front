import React from 'react';
import './businessList.css';
import { BusinessItem } from "./BusinessItem.jsx";

export const BusinessList = ({ paymentplans = [], paymentbags = [] }) => {
    return (
        <div className="business-list">
            {paymentplans.length > 0 && (
                <>
                    <h2>Planes de Pago</h2>
                    {paymentplans.map(plan => (
                        <BusinessItem key={plan.id} data={plan} type="paymentplan" />
                    ))}
                </>
            )}
            {Array.isArray(paymentbags) && paymentbags.length > 0 && (
                <>
                    <h2>Bolsas de Pago por Consumo</h2>
                    {paymentbags.map(bag => (
                        <BusinessItem key={bag.id} data={bag} type="paymentbag" />
                    ))}
                </>
            )}
        </div>
    );
};
