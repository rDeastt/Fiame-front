import React, {useEffect, useState} from 'react';
import {BusinessList} from "../../../components/client/businessList/BusinessList.jsx";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";

export const MainPageClient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const user = storedUser ? JSON.parse(storedUser) : null
    console.log(user);
    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getPaymentPlans/' + user.id);
                const paymentPlansData = response.data; // Verifica que response.data sea un array
                setPaymentPlans(paymentPlansData);
            } catch (error) {
                console.error('Error fetching payment plans:', error);
            }
        };

        fetchPaymentPlans();
    }, [user.id]);

    console.log(paymentplans);
    return (
        <>
            <div className="main-page-client">
                <div className="container-paymentplans">
                    <BusinessList paymentplans={paymentplans}/>
                </div>
            </div>
        </>
    );
};

