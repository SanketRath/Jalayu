function checkQuality() {
    const tdsValue = parseFloat(document.getElementById('tds').value);
    const phValue = parseFloat(document.getElementById('ph').value);

    // Check TDS Quality
    const tdsCategory = checkTDSQuality(tdsValue);

    // Check pH Quality
    const phCategory = checkPHQuality(phValue);

    // Display TDS Quality Chart
    displayGaugeChart('tdsChartContainer', tdsCategory, tdsValue);

    // Display pH Quality Chart
    displayGaugeChart('phChartContainer', phCategory, phValue);

}


function checkTDSQuality(tdsValue) {
    // Define your TDS quality levels
    const poorTDS = 100;
    const averageLowTDS = 150;
    const goodTDS = 200;
    const goodHighTDS = 250;
    const averageHighTDS = 300;
    const poorHighTDS = 350;

    if (tdsValue <= poorTDS) {
        return 'Poor';
    } else if (tdsValue <= averageLowTDS) {
        return 'Average';
    } else if (tdsValue <= goodTDS) {
        return 'Good';
    } else if (tdsValue <= goodHighTDS) {
        return 'Good';
    } else if (tdsValue <= averageHighTDS) {
        return 'Average';
    } else {
        return 'Poor';
    }
}

function checkPHQuality(phValue) {
    // Define your pH quality levels
    const poorMinPH = 2.5;
    const poorMaxPH = 4.5;
    const averageLowMinPH = 4.6;
    const averageLowMaxPH = 5.5;
    const goodMinPH = 5.6;
    const goodMaxPH = 7.5;
    const goodHighMinPH = 7.6;
    const goodHighMaxPH = 8.5;
    const averageHighMinPH = 8.6;
    const averageHighMaxPH = 9.5;
    const poorHighMinPH = 9.6;
    const poorHighMaxPH = 11;

    if (phValue >= poorMinPH && phValue <= poorMaxPH) {
        return 'Poor';
    } else if (phValue >= averageLowMinPH && phValue <= averageLowMaxPH) {
        return 'Average';
    } else if (phValue >= goodMinPH && phValue <= goodMaxPH) {
        return 'Good';
    } else if (phValue >= goodHighMinPH && phValue <= goodHighMaxPH) {
        return 'Good';
    } else if (phValue >= averageHighMinPH && phValue <= averageHighMaxPH) {
        return 'Average';
    } else {
        return 'Poor';
    }
}

function displayGaugeChart(containerId, category, value) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    let gaugeValue, color;
    switch (category) {
        case 'Poor':
            gaugeValue = 15;
            color = '#DF5353'; // Red
            break;
        case 'Average':
            gaugeValue = 50;
            color = '#DDDF0D'; // Yellow
            break;
        case 'Good':
            gaugeValue = 100;
            color = '#55BF3B'; // Green
            break;
        default:
            gaugeValue = 0;
            color = '#DF5353'; // Red
    }

    Highcharts.chart(containerId, {
        chart: {
            type: 'solidgauge',
            height: '100%'
        },
        title: {
            text: containerId === 'tdsChartContainer' ? 'TDS Quality Result' : 'pH Quality Result'
        },
        tooltip: {
            enabled: false
        },
        pane: {
            size: '90%',
            startAngle: -90,
            endAngle: 90,
            background: [{
                backgroundColor: 'rgba(238, 238, 238, 0.1)',
                outerRadius: '100%',
                innerRadius: '60%',
                shape: 'arc'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            labels: {
                y: 16
            },  
            stops: [
                [0.1, color], // Red, Yellow, Green based on the category
                [0.5, color], // Red, Yellow, Green based on the category
                [0.9, color]  // Red, Yellow, Green based on the category
            ]
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                },
                marker: {
                    enabled: false // Remove the small circle (data point)
                }
            }
        },
        series: [{
            name: containerId === 'tdsChartContainer' ? 'TDS Quality' : 'pH Quality',
            data: [{
                radius: '100%',
                innerRadius: '60%',
                y: gaugeValue
            }],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    `<span style="font-size:40px;color: color">${category}</span><br/>` +
                    '</div>'
            }
        }, {
            name: 'Arrow',
            type: 'pie',
            data: [{
                y: value,
                color: color,
                borderWidth: 0,
                name: 'Arrow',
                dataLabels: {
                    enabled: false
                }
            }],
            center: [80, 80],
            size: 100,
            showInLegend: false,
            enableMouseTracking: false
        }]
    });
}
