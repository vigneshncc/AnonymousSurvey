import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
function RenderChart(props) {
    let temp = props.data;
    let series;
    let seriesGenerator = () => {
        if (props.type == 'RD') {
            series = Object.keys(temp).map((value, index) => {
                return {
                    name: value,
                    y: temp[value]
                }
            })
        } else {
            series = [{
                data: Object.values(temp)
            }]
        }
    }
    let options;
    let optionsGenerator = () => {
        if (props.type == 'RD') {
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
                credits:{
                    enabled:false
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
                xAxis: {
                    categories: Object.keys(temp),
                    crosshair: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                legend: {
                    enabled: false
                },
                credits:{
                    enabled:false
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                tooltip: {
                    formatter: function () {
                        return 'The value for <b>' + this.x +
                            '</b> is <b>' + this.y + '</b>';
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