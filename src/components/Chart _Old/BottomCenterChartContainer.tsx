import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import USDT_icon from "../../assets/images/new/USDT_icon.png"
import windy_icon from "../../assets/images/new/windy_icon.webp"

const BottomCenterChartContainer = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504")

  return (<div>
    <Grid container
      justify="space-between"
      spacing={3}>
      <Grid item lg={6} sm={6} xl={6} xs={12}>
        <div className="chart-bottom-card-top-container-style">
          <div className="chart-bottom-card-top-header-container-style">
            <div className="chart-bottom-card-top-left-title-container-style">
              <span className="chart-bottom-card-top-left-title-text-size-style">Buy</span>
            </div>
            <div className="align-center-just-center-style">
              <span className="chart-bottom-card-top-right-title-text-size-style">Available: 45, 486, 00 USDT</span>
            </div>
          </div>

          <div className="align-center-just-space-between-style pading-some-px-style">
            <span>Form</span>
            <div className="chart-bottom-center-text-dropdown-container-style-nn">

              <div className="chart-bottom-image-dropdown-container-style">
                <div className="align-center-just-center-style">
                  <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                  <svg style={{ marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
                <div className="chart-bottom-image-dropdown-content-style">
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                  </div>
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                  </div>
                </div>
              </div>

              <div>
                <span>45,486.00</span>
                <span className="chart-bottom-buy-card-form-textform-right-max-text-style">Max</span>
              </div>
            </div>
          </div>

          <div className="align-center-just-space-between-style pading-some-px-style">
            <span>To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div className="chart-bottom-center-text-dropdown-container-style-nn">
              {/* <select className="chart-bottom-buy-card-dropdown-contaniner-style">
                <option><img src={windy_icon} alt="windy_icon" /> WINDY</option>
                <option><img src={USDT_icon} alt="usdt_icon" /> USDT</option>
              </select> */}
              <div className="chart-bottom-image-dropdown-container-style">
                <div className="align-center-just-center-style">
                  <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                  <svg style={{ marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
                <div className="chart-bottom-image-dropdown-content-style">
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                  </div>
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                  </div>
                </div>
              </div>

              <div>
                <span>1,000.00</span>
              </div>
            </div>
          </div>

          <div className="chart-bottom-buy-card-button-container-style">
            <button type="button" className="chart-bottom-buy-card-button-item-style">Buy</button>
          </div>
        </div>
      </Grid>
      <Grid item lg={6} sm={6} xl={6} xs={12}>
        <div className="chart-bottom-sell-card-top-container-style">
          <div className="chart-bottom-card-top-header-container-style">
            <div className="chart-bottom-card-top-right-sell-title-container-style">
              <span className="chart-bottom-card-top-left-title-text-size-style">Sell</span>
            </div>
            <div className="align-center-just-center-style">
              <span className="chart-bottom-card-top-right-title-text-size-style">Available: 1,000.00 USDT</span>
            </div>
          </div>

          <div className="align-center-just-space-between-style pading-some-px-style">
            <span>Form</span>
            <div className="chart-bottom-center-text-dropdown-container-style-nn">

              <div className="chart-bottom-image-dropdown-container-style">
                <div className="align-center-just-center-style">
                  <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                  <svg style={{ marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
                <div className="chart-bottom-image-dropdown-content-style">
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                  </div>
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                  </div>
                </div>
              </div>

              <div>
                <span>45,486.00</span>
                <span className="chart-bottom-buy-card-form-textform-right-max-text-style">Max</span>
              </div>
            </div>
          </div>

          <div className="align-center-just-space-between-style pading-some-px-style">
            <span>To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <div className="chart-bottom-center-text-dropdown-container-style-nn">
              {/* <select className="chart-bottom-buy-card-dropdown-contaniner-style">
                <option><img src={windy_icon} alt="windy_icon" /> WINDY</option>
                <option><img src={USDT_icon} alt="usdt_icon" /> USDT</option>
              </select> */}
              <div className="chart-bottom-image-dropdown-container-style">
                <div className="align-center-just-center-style">
                  <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                  <svg style={{ marginRight: 10 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
                <div className="chart-bottom-image-dropdown-content-style">
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                  </div>
                  <div className="chart-bottom-buy-card-dropdown-item-container-style">
                    <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                    <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                  </div>
                </div>
              </div>

              <div>
                <span>45,486,00</span>
              </div>
            </div>
          </div>

          <div className="chart-bottom-buy-card-button-container-style">
            <button type="button" className="chart-bottom-sell-right-card-button-item-style">Sell</button>
          </div>
        </div>
      </Grid>
    </Grid>


  </div>)
}

export default BottomCenterChartContainer
