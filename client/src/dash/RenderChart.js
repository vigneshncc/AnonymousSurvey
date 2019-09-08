import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
function RenderChart(props) {
    let temp = props.data;
    let series;
    let seriesGenerator = () => {
        series = Object.keys(temp).map((value, index) => {
            console.log(value, index);
            return {
                name: value,
                y: temp[value]
            }
        })
    }
    seriesGenerator()
    const options = {
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