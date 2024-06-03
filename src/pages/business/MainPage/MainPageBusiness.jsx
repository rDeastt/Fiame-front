import React, {useEffect, useState} from 'react';
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import {QuotaSummary} from "../../../components/business/Charts/QuotaSummary.jsx";

export const MainPageBusiness = () => {
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [quotaSummary, setQuotaSummary] = useState([]);
    console.log(user);
    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getPaymentPlansBusiness/' + user.id);
                const paymentPlansData = response.data;
                setPaymentPlans(paymentPlansData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentPlans([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment plans:', error);
                }
            }
        };
        const fetcQuotaSummary = async ()=>{
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/getQuotaSummaryByBusiness/' + user.id)
                setQuotaSummary(response.data);
            }catch (error){
                console.error('Error fetching quotasummary:', error);
            }
        }
        fetchPaymentPlans()
        fetcQuotaSummary()
    }, [user.id]);
    console.log(quotaSummary);
    return (
        <>
            <p>graficos</p>
            <QuotaSummary quotaSummary={quotaSummary}/>
        </>
    );
};