import React, {useEffect, useState} from 'react';
import {ClientList} from "../../../components/business/clientList/ClientList.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";

export const ActiveClients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const [paymentbags, setPaymentBags] = useState([]);
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate()
    console.log(user);

    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getPaymentPlansBusiness/' + user.id);
                const paymentPlansData = response.data;
                setPaymentPlans(paymentPlansData);
                console.log(paymentPlansData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentPlans([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment plans:', error);
                }
            }
        };

        const fetchPaymentBags = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentbag/allbags/' + user.id);
                const paymentBagsData = response.data;
                setPaymentBags(paymentBagsData);
            } catch (error) {
                    if (error.response && error.response.status === 404) {
                    setPaymentBags([]); // Si es un 404, simplemente deja el array vacío
                 } else {
                     console.error('Error fetching payment bags:', error);
                }
            }
};

fetchPaymentPlans();
fetchPaymentBags();
}, [user.id]);
return (
<>
    <div className="main-page-business">
        <div className="container-paymentplans">
            <ClientList paymentplans={paymentplans} paymentbags={paymentbags}/>
        </div>
    </div>
</>
);
};