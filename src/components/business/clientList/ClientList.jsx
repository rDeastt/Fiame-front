import React, {useEffect} from 'react';
import './clientList.css';
import {ClientItem} from "./ClientItem.jsx";

export const ClientList = ({ paymentplans = [], paymentbags = [] }) => {
    useEffect(() => {
        console.log("Payment Plans: ", paymentplans);
        console.log("Payment Bags: ", paymentbags);
    }, [paymentplans, paymentbags]);

    return (
        <div className="business-list">
            {paymentplans.length > 0 && (
                <>
                    <h2>Planes de Pago</h2>
                    {paymentplans.map(plan => (
                        <ClientItem key={plan.id} data={plan} type="paymentplan" />
                    ))}
                </>
            )}
            {Array.isArray(paymentbags) && paymentbags.length > 0 && (
                <>
                    <h2>Bolsas de Pago por Consumo</h2>
                    {paymentbags.map(bag => (
                        <ClientItem key={bag.id} data={bag} type="paymentbag" />
                    ))}
                </>
            )}
        </div>
    );
};

