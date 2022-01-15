import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import USDT_icon from "../../assets/images/new/USDT_icon.png"
import windy_icon from "../../assets/images/new/windy_icon.webp"

const BottomCenterChartContainerLightMode = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504")

  const [tokenTxToggle, setTokenTxToggle] = useState("Token")

  return (<div>
    <Grid container
      justify="space-between"
      spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <div className="chart-page-new-design-bottom-table-top-container-style-here-light-mode">

          <div className="align-center-just-space-between-style pading-some-px-style">
            {tokenTxToggle === "Token" && <div className="align-center-just-center-style chart-page-new-design-togle-button-contianer-style-light-mode">
              <button type="button" className="chart-new-design-bottom-togle-token-button-active-style-light-mode" onClick={() => { setTokenTxToggle("Token") }}>Token tx</button>
              <button type="button" className="chart-page-new-design-bottom-toggle-button-inactive-style-light-mode" onClick={() => { setTokenTxToggle("Wallet") }}>Wallet tx</button>
            </div>}

            {tokenTxToggle === "Wallet" && <div className="align-center-just-center-style chart-page-new-design-togle-button-contianer-style-light-mode">
              <button type="button" className="chart-page-new-design-bottom-toggle-button-inactive-style-light-mode" onClick={() => { setTokenTxToggle("Token") }}>Token tx</button>
              <button type="button" className="chart-new-design-bottom-togle-token-button-active-style-light-mode" onClick={() => { setTokenTxToggle("Wallet") }}>Wallet tx</button>
            </div>}


            <div className="chart-page-new-design-bottom-table-header-contanier-style-light-mode mobile-view-hiddien-laoptop-view">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tokens</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price/Token</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Time</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tx</span>
            </div>
          </div>

          <div className="chart-page-new-design-bottom-table-top-container-min-heihgt-scroll-style-nn2">
            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode laoptop-view-hiddien-mobile-view">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tokens</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price/Token</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Time</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tx</span>
            </div>

            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">852324.234796</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">WINDY</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">$41.8</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.0996 BNB</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.000614517</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">02:03:98</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">0x3ay45x3...</span>
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
              </div>
            </div>

            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">852324.234796</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">WINDY</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">$41.8</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.0996 BNB</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.000614517</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">02:03:98</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">0x3ay45x3...</span>
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
              </div>
            </div>

            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">852324.234796</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">WINDY</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">$41.8</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.0996 BNB</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.000614517</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">02:03:98</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">0x3ay45x3...</span>
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
              </div>
            </div>

            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">852324.234796</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">WINDY</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">$41.8</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.0996 BNB</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.000614517</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">02:03:98</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">0x3ay45x3...</span>
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
              </div>
            </div>

            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">852324.234796</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">WINDY</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">$41.8</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.0996 BNB</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.000614517</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">02:03:98</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">0x3ay45x3...</span>
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
              </div>
            </div>

            <div className="chart-page-new-design-bottom-table-body-item-container-style-light-mode">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">852324.234796</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">WINDY</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">$41.8</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.0996 BNB</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">0.000614517</span>
                <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-main-items-text-style">02:03:98</span>
              </div>
              <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">0x3ay45x3...</span>
                <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
              </div>
            </div>

          </div>

        </div>
      </Grid>
    </Grid>
  </div>)
}

export default BottomCenterChartContainerLightMode
