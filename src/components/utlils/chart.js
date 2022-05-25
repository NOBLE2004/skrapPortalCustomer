export const PieChartDefaultOptions = {
    plugins: {
        legend: {
            display: true,
            position: "right",
            horizontalAlign: 'center',
            verticalAlign: 'left',
            labels: {
                usePointStyle: true,
                padding: 25,
                font: {
                    size: 12,
                    family: 'DM Sans',
                    weight: 700
                }
            }
        }
    },
    maintainAspectRatio: true,
    responsive: false,
    elements: {
        arc: {
            borderWidth: 0
        }
    }
};
export const DonutChartDefaultOptions = {
    plugins: {
        legend: {
            display: true,
            position: "right",
            horizontalAlign: 'center',
            verticalAlign: 'left',
            textAlign: 'center',
            labels: {
                usePointStyle: true,
                padding: 25,
                font: {
                    size: 12,
                    family: 'DM Sans',
                    weight: 700
                }
            }
        }
    },
    width: 200,
    maintainAspectRatio: true,
    responsive: false,
    cutout: 70,
    elements: {
        arc: {
            borderWidth: 0
        }
    }
};
export const BarChartOptions = {
    categoryPercentage: 0.6,
    fillColor: 'grey',
    plugins: {
        legend: {
            borderWidth: 1,
            display: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'left',
            textAlign: 'center',
            fullSize: true,
            labels: {
                usePointStyle: true,
                boxWidth: 40,
                padding: 25,
                fullWidth: true,
                font: {
                    size: 12,
                    family: 'DM Sans',
                    weight: 500
                }
            }
        },
    },
    scales: {
        x: {
            //stacked: true,
            ticks: {
                padding: 10,
                font: {
                    size: 12,
                    family: 'DM Sans',
                    weight: 500
                }
            },
            grid: {
                display: false,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                stepSize: (c) => ((Math.max(...c.chart.data.datasets[0].data) - Math.min(...c.chart.data.datasets[0].data)) / 3),
                callback: function (value) {
                    return parseInt(value.toFixed(0)).toLocaleString() + ' t';
                },
                padding: 10,
                font: {
                    size: 12,
                    family: 'DM Sans',
                    weight: 500
                }
            },
            beginAtZero: true,
            grid: {
                display: false,
                drawBorder: false
            }
        }
    },
    maintainAspectRatio: true,
    responsive: true,
};
