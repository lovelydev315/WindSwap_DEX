import React from 'react'
import useTheme from 'hooks/useTheme'
import Chart from "react-apexcharts";

function LeftChartItemGraph(props) {
  const { isDark, toggleTheme } = useTheme()
  const apexChart = {
    options: {
      chart: {
        id: "left_basic_chart2",
        height: 550,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: false,
        },
        brush: {
          enabled: true,
          target: "left_basic_chart2",
          autoScaleYaxis: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      }
    },
    series: [
      {
        name: "series-1",
        color: "#721b25",
        data: [4.18, 4.21, 4.5, 4.9, 4.3, 4.0]
      }
    ]
  };

  return (<>
    {isDark === true && <div>
      <p className="chart-right-trading-history-top-title-text-style">Liquidity</p>
      <p className="chart-graph-left-second-text-style-nng-2">$4.20b</p>
      <div className="just-space-beetween-align-center-style">
        <div className="chart-graph-small-percent-container-style-nng">
          <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
          <span className="chart-price-change-24h-standard-text-under-small-description">1.36%</span>
        </div>
        <div>
          <span className="chart-page-child-chart-view-option-select-button-selected-container-style">week</span>
          <span className="chart-page-child-chart-view-option-select-button-un-selected-container-style">All Time</span>
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
    </div>}

    {isDark === false && <div>
      <p className="chart-right-trading-history-top-title-text-style">Liquidity</p>
      <p className="chart-graph-left-second-text-style-nng-2">$4.20b</p>
      <div className="just-space-beetween-align-center-style">
        <div className="chart-graph-small-percent-container-style-nng">
          <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
          <span className="chart-price-change-24h-standard-text-under-small-description">1.36%</span>
        </div>
        <div>
          <span className="chart-page-child-chart-view-option-select-button-selected-container-style-light-mode">week</span>
          <span className="chart-page-child-chart-view-option-select-button-un-selected-container-style-light-mode">All Time</span>
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
    </div>}

  </>)
}

export default LeftChartItemGraph



























// import React from 'react'
// import { Chart } from 'react-charts'

// function LeftChartItemGraph(props) {
//   const data = React.useMemo(
//     () => [
//       {
//         label: 'Series 1',
//         data: [
//           { x: 1.5, y: 3.18 },
//           { x: 1.6, y: 3.7 },
//           { x: 1.7, y: 3.9 },
//           { x: 1.8, y: 4.35 },
//           { x: 1.9, y: 4.37 },
//           { x: 2.0, y: 6.2 },
//           { x: 2.1, y: 4.35 },
//           { x: 2.2, y: 4.33 },
//           { x: 2.3, y: 4.31 },
//           { x: 2.4, y: 4.25 },
//           { x: 2.5, y: 4.30 },
//           { x: 2.6, y: 4.29 },
//           { x: 2.7, y: 4.31 },
//         ]
//       }
//     ],
//     []
//   )

//   const series = React.useMemo(
//     () => ({
//       type: 'area'
//     }),
//     []
//   )

//   const axes = React.useMemo(
//     () => [
//       { primary: true, position: 'bottom', type: 'linear' },
//       { position: 'left', type: 'linear', stacked: true }
//     ],
//     []
//   )

//   return (
//     <div>
//       <p className="chart-right-trading-history-top-title-text-style">Liquidity</p>
//       <p className="chart-graph-left-second-text-style-nng-2">$4.20b</p>
//       <div className="chart-graph-small-percent-container-style-nng">
//         <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
//           <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
//         </svg>
//         <span className="chart-price-change-24h-standard-text-under-small-description">1.36%</span>
//       </div>
//       <div
//         style={{
//           width: '100%',
//           height: '300px'
//         }}
//       >
//         <Chart
//           data={data}
//           axes={axes}
//           series={series}
//           tooltip
//         />
//       </div>
//     </div>

//   )
// }

// export default LeftChartItemGraph