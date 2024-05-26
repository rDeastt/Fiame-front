import React from 'react';

import './businessList.css';
import {BusinessItem} from "./BusinessItem.jsx";

export const BusinessList = ({ paymentplans }) => {
    return (
        <div className="business-list">
            {paymentplans.map(plan => (
                <BusinessItem key={plan.id} plan={plan}/>
            ))}
        </div>
    );
};

