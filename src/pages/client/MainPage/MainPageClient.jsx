import React, { useEffect, useState } from 'react';
import { BusinessList } from "../../../components/client/businessList/BusinessList.jsx";
import axios from "axios";
import { urlGlobal } from "../../../environment/env.js";
import './MainPageClient.css'; // Import CSS for styling

export const MainPageClient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const [paymentbags, setPaymentBags] = useState([]);
    const [creditLimit, setCreditLimit] = useState(0);
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log(user);

    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getPaymentPlansClient/' + user.id);
                const paymentPlansData = response.data;
                setPaymentPlans(paymentPlansData.filter(plan => !plan.payed)); // Filtrar planes de pago que no están pagados
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
                const response = await axios.get(urlGlobal + 'paymentbag/allbagsperClient/' + user.id);
                const paymentBagsData = response.data;
                setPaymentBags(paymentBagsData.filter(bag => !bag.payed)); // Filtrar bolsas de pago que no están pagadas
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentBags([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment bags:', error);
                }
            }
        };

        const fetchCreditLimit = async () => {
            try {
                const response = await axios.get(urlGlobal + `client/limit/${user.id}`);
                setCreditLimit(response.data);
            } catch (error) {
                console.error('Error fetching credit limit:', error);
            }
        };

        fetchPaymentPlans();
        fetchPaymentBags();
        fetchCreditLimit();
    }, [user.id]);

    console.log(paymentplans, paymentbags, creditLimit);
    return (
        <>
            <div className="main-page-client">
                <div className="credit-limit-box">
                    <p>Límite de Crédito</p>
                    <div className="credit-limit-value">S/{creditLimit}</div>
                </div>
                <div className="container-paymentplans">
                    <BusinessList paymentplans={paymentplans} paymentbags={paymentbags} />
                </div>
            </div>
        </>
    );
};
