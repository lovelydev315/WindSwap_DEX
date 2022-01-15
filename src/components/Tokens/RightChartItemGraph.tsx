import React from 'react'
import Chart from "react-apexcharts";

function RightChartItemGraph(props) {
  const apexChart = {
    options: {
      chart: {
        id: "basic-bar",
        height: 550,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
      }
    },
    series: [
      {
        name: "series-1",
        color: "#177121",
        data: [4.0, 3.5, 3.8, 5.0, 4.5, 4.8, 4.3]
      }
    ]
  };

  return (
    <div>
      <p className="chart-right-trading-history-top-title-text-style">Trading Volum (24 h)</p>
      <p className="chart-graph-second-percend-text-style-nng">$ 1.72B</p>
      <div className="just-space-beetween-align-center-style">
        <div className="chart-graph-small-percent-container-style-nng">
          <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
          <span className="chart-price-change-7d-standard-text-under-small-description">1.36%</span>
        </div>
        <div>
          <span className="chart-page-child-chart-view-option-select-button-un-selected-container-style">week</span>
          <span className="chart-page-child-chart-view-option-select-button-selected-container-style">All Time</span>
        </div>
      </div>


      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={apexChart.options}
              series={apexChart.series}
              type="area"
              width="100%"
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default RightChartItemGraph