import React, {useEffect, useState} from 'react';
import {BusinessList} from "../../../components/client/businessList/BusinessList.jsx";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import {useNavigate} from "react-router-dom";

export const MainPageClient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const [paymentbags, setPaymentBags] = useState([]);
    const user = storedUser ? JSON.parse(storedUser) : null;
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

        const fetchPaymentBags = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentbag/allbags/' + user.id);
                const paymentBagsData = response.data; // Verifica que response.data sea un array
                setPaymentBags(paymentBagsData);
            } catch (error) {
                console.error('Error fetching payment bags:', error);
            }
        };

        fetchPaymentPlans();
        fetchPaymentBags();
    }, [user.id]);

    console.log(paymentplans, paymentbags);
    return (
        <>
            <div className="main-page-client">
                <div className="container-paymentplans">
                    <BusinessList paymentplans={paymentplans} paymentbags={paymentbags} />
                </div>
            </div>
        </>
    );
};

