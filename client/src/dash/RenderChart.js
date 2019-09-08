import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
function RenderChart(props) {
    let temp = props.data;
    let series;
    let seriesGenerator = () => {
        if (props.type !== 'RD') {
            series = Object.keys(temp).map((value, index) => {
                console.log(value, index);
                return {
                    name: value,
                    y: temp[value]
                }
            })
        } else {
            series = Object.keys(temp).map((value, index) => {
                console.log(value, index);
                return {
                    name: value,
                    data: [temp[value]]
                }
            })
        }
    }
    let options;
    let optionsGenerator = () => {
        if (props.type !== 'RD') {
            options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: props.question
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: series
                }]
            }
        } else {
            options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: props.question
                },
                subtitle: {
                    // text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: Object.keys(temp),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        // text: 'Rainfall (mm)'
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: series
            }
        }
    }
    seriesGenerator();
    optionsGenerator();
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}
export default RenderChart;