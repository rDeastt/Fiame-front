import React from 'react';
import { Bar } from 'react-chartjs-2';

export const QuotaSummary = ({ quotaSummary }) => {
    const data = {
        labels: ['Cuotas vencidas', 'Cuotas pagadas', 'Cuotas pagadas con vencimiento', 'Cuotas sin pagar sin vencimiento'],
        datasets: [
            {
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
        plugins: {
            title: {
                display: true,
                text: 'Resumen de Cuotas'
            },
            legend: {
                display: true, // Mostrar la leyenda
                position: 'top', // Posición de la leyenda
                labels: {
                    generateLabels: (chart) => {
                        const { data } = chart;
                        return data.labels.map((label, index) => ({
                            text: label,
                            fillStyle: data.datasets[0].backgroundColor[index],
                            hidden: false,
                        }));
                    },
                },
                onClick: (e, legendItem) => {
                    const index = legendItem.index;
                    const ci = legendItem.chart;
                    const meta = ci.getDatasetMeta(0);

                    // Alternar la visibilidad del dataset
                    meta.data[index].hidden = !meta.data[index].hidden;
                    ci.update();
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Número de Cuotas'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tipos de Cuotas'
                }
            }
        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};