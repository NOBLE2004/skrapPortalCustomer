export const PieChartDefaultOptions = {
    legend: {
        display: true,
        position: "right",
        horizontalAlign: 'center',
        verticalAlign: 'left',
        labels: {
            usePointStyle: true,
            padding: 25,
            font: {
                size: 18,
                family: 'DM Sans',
                weight: 900
            }
        }
    },
    maintainAspectRatio: true,
    responsive: true,
    elements: {
        arc: {
            borderWidth: 0
        }
    }
};
export const DonutChartDefaultOptions = {
    legend: {
        display: true,
        position: "right",
        textAlign: 'center',
        labels: {
            usePointStyle: true,
            padding: 25,
            font: {
                size: 16,
                family: 'DM Sans',
                weight: 700
            }
        }
    },
    maintainAspectRatio: false,
    responsive: true,
    cutoutPercentage: 70,
    elements: {
        arc: {
            borderWidth: 0
        }
    }
};
