import React, {useEffect, useRef, useState} from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {urlGlobal} from "../../../environment/env.js";
export const LoanBalanceChart = ({ businessId, startDate }) => {
    const [loanBalances, setLoanBalances] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axios.get(`${urlGlobal}paymentplan/loan-balance/${businessId}/${startDate}`)
            .then(response => {
                if (isMounted) {
                    setLoanBalances(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching loan balances:', error);
            });

        return () => {
            isMounted = false;
        };
    }, [businessId, startDate]);

    const data = {
        labels: loanBalances.map(lb => new Date(lb.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Saldo de Préstamos',
                data: loanBalances.map(lb => lb.balance),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fecha'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Saldo ($)'
                },
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};