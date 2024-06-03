import React from 'react';
import { Bar } from 'react-chartjs-2';

export const QuotaSummary = ({ quotaSummary }) => {
    const data = {
        labels: ['Cuotas vencidas', 'Cuotas pagadas', 'Cuotas pagadas con vencimiento', 'Cuotas sin pagar sin vencimiento'],
        datasets: [
            {
                label: '# de Cuotas',
                data: [
                    quotaSummary.overdueQuotas,
                    quotaSummary.paidQuotas,
                    quotaSummary.paidOverdueQuotas,
                    quotaSummary.unpaidQuotas
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};