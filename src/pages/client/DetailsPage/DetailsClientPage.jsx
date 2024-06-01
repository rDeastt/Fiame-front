import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import './detailsClient.css'
import {
    Container,
    Typography,
} from '@mui/material';
import {QuotasTable} from "../../../components/client/DetailsPaymentPlan/QuotasTable.jsx";
import {PaymentPlanDetail} from "../../../components/client/DetailsPaymentPlan/PaymentPlanDetail.jsx";
import Swal from "sweetalert2";

export const DetailsClientPage = () => {
    const { id } = useParams();
    const [paymentplan, setPaymentPlan] = useState(null);
    const [quotas, setQuotas] = useState([]);

    useEffect(() => {
        const fetchPaymentPlan = async () => {
            try {
                const response = await axios.get(`${urlGlobal}paymentplan/getPaymentPlan/${id}`);
                const paymentPlanData = response.data;
                setPaymentPlan(paymentPlanData);

            } catch (error) {
                setPaymentPlan(null);
                console.error('Error fetching payment plans:', error);
            }
        };
        fetchPaymentPlan();
    }, [id]);

    useEffect(() => {
        const fetchQuotas = async () => {
            try {
                const quotasResponse = await axios.get(`${urlGlobal}paymentplan/getQuotas/${id}`);
                const quotas = quotasResponse.data;
                setQuotas(quotas);
            } catch (error) {
                console.error('Error fetching quotas:', error);
            }
        };
        fetchQuotas();
    }, [id]);

    const handleCheckboxChange = async (event, quota) => {
        if (!quota.payed && event.target.checked) {
            try {
                const response = await axios.get(`${urlGlobal}paymentplan/payQuota/${quota.id}`);
                const updatedQuotasResponse = await axios.get(`${urlGlobal}paymentplan/getQuotas/${id}`);
                const updatedQuotas = updatedQuotasResponse.data;
                setQuotas(updatedQuotas);

                Swal.fire({
                    title: "Cuota Pagada!",
                    text: response.data, // Assuming the response contains the message to display
                    icon: "success"
                });

            } catch (error) {
                console.error('Error paying quota:', error);
            }
        }
    };

    if (!paymentplan) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <div className="container-detailsC">
            <Container maxWidth="md" className="content-container-detailsC">
                <PaymentPlanDetail paymentplan={paymentplan} />
                <QuotasTable quotas={quotas} paymentplan={paymentplan} handleCheckboxChange={handleCheckboxChange} />
            </Container>
        </div>
    );
};
