import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import RightChartItemGraph from "./RightChartItemGraph";

const RightChartContainer = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504");

  return (<div>
    {/* <div className="price-text-field-container-style-new">
      <TextField id="chart-windswap-price-standard-text" label="WindSwap Price" value={WindSwapPriceText} onChange={(e) => {
        setWindSwapPrice(parseFloat(e.target.value))
        if (e.target.value.indexOf('$') < 0) {
          console.log("yes")
          setWindSwapPriceText(`$ ${e.target.value}`);
        } else {
          console.log("no")
          setWindSwapPriceText(e.target.value);
        }
      }} />
    </div> */}
    <RightChartItemGraph />

    <p className="chart-right-trading-history-top-title-text-style">Trading History</p>
    <div className="chart-right-trading-history-top-container-height-scroll-style">
      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}
          // className="chart-page-right-trading-items-grid-12-margin-style-new"
          >
            <div className="chart-page-right-trading-history-item-new-container-style-new">
              <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
                <span className="chart-page-trading-item-child-text-style-new">7639.19</span>
              </div>
              <div className="align-center-just-center-flex-colum-style">
                <span className="chart-page-trading-item-child-hidden-text-style-new">WINDY</span>
                <span className="chart-page-trading-item-child-hidden-text-style-new">USDT</span>
              </div>
              <div>
                <p className="chart-page-trading-item-child-text-style-new">$3709.72</p>
              </div>
              <div>
                <p className="chart-page-trading-item-child-hidden-text-style-new">5 <small>s ago</small></p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

    </div>

    {/* <div className="chart-right-trading-history-top-container-height-scroll-style">
      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
          <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>

      <div className="chart-right-trading-history-items-container-style">
        <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        <div className="chart-right-trading-items-change-values-container-style">
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">7639.19</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">WINDY</span>
          </div>
          <div className="chart-right-trading-items-change-values-half-part-container-style">
            <span className="chart-right-trading-items-child-value-unit-style-init">9476</span>
            <span className="chart-right-trading-items-child-value-unit-style-init chart-right-trading-items-hidden-opacity-text-color">USDT</span>
          </div>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p>$3709.72</p>
        </div>
        <div className="chart-right-tradig-history-correct-value-time-container-style">
          <p className="chart-right-trading-items-hidden-opacity-text-color">5 <small>s ago</small></p>
        </div>
      </div>
    </div> */}


  </div>)
}

export default RightChartContainer
