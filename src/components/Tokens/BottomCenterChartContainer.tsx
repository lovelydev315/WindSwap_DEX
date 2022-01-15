import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import axios from "axios";
import { Config } from 'utils/api_protocals';

import TextField from '@material-ui/core/TextField';

import USDT_icon from "../../assets/images/new/USDT_icon.png"
import windy_icon from "../../assets/images/new/windy_icon.webp"

type Token = {
  block: number;
  amount1: number;
  token1: string;
  tradeAmountUSD: number;
  amount2: number;
  token2: string;
  timestamp: string;
  tokenPriceUSD: number;
  side: string;
};

const initialTransaction: Token[] = [
  {
    "block": 7930736,
    "amount1": 8417700.96170469,
    "token1": "wADA",
    "tradeAmountUSD": 0.3622701623560748,
    "amount2": 0.001,
    "token2": "WBNB",
    "timestamp": "00:00:36",
    "tokenPriceUSD": 4.3036710855396144e-8,
    "side": "SELL"
  }
];

const BottomCenterChartContainer = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504")

  const [tokenTxToggle, setTokenTxToggle] = useState("Token")
  const [transactionHistorys, setTransactionHistorys] = useState(initialTransaction);

  useEffect(() => {
    // get last 50 transactions
    axios.post(Config.Get_last_50_transactions, { "token": sessionStorage.getItem("search_token") }).then(res => {
      console.log("transactions:", res.data)
      if (res.data.status === 200) {
        console.log("transactions history:", res.data.data)
        setTransactionHistorys(res.data.data);
      }
    })
  })

  return (<div>
    <Grid container
      justify="space-between"
      spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <div className="chart-page-new-design-bottom-table-top-container-style-here">

          <div className="align-center-just-space-between-style pading-some-px-style">
            {tokenTxToggle === "Token" && <div className="align-center-just-center-style chart-page-new-design-togle-button-contianer-style">
              <button type="button" className="chart-new-design-bottom-togle-token-button-active-style" onClick={() => { setTokenTxToggle("Token") }}>Token tx</button>
              <button type="button" className="chart-page-new-design-bottom-toggle-button-inactive-style" onClick={() => { setTokenTxToggle("Wallet") }}>Wallet tx</button>
            </div>}

            {tokenTxToggle === "Wallet" && <div className="align-center-just-center-style chart-page-new-design-togle-button-contianer-style">
              <button type="button" className="chart-page-new-design-bottom-toggle-button-inactive-style" onClick={() => { setTokenTxToggle("Token") }}>Token tx</button>
              <button type="button" className="chart-new-design-bottom-togle-token-button-active-style" onClick={() => { setTokenTxToggle("Wallet") }}>Wallet tx</button>
            </div>}


            <div className="chart-page-new-design-bottom-table-header-contanier-style mobile-view-hiddien-laoptop-view">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tokens</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price/Token</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Time</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tx</span>
            </div>
          </div>

          <div className="chart-page-new-design-bottom-table-top-container-min-heihgt-scroll-style-nn2">
            <div className="chart-page-new-design-bottom-table-body-item-container-style laoptop-view-hiddien-mobile-view">
              <span className="chart-page-new-design-bottom-table-header-item-text-style">&nbsp;</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tokens</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Price/Token</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Time</span>
              <span className="chart-page-new-design-bottom-table-header-item-text-style">Tx</span>
            </div>

            {transactionHistorys !== null && transactionHistorys.map(history => {
              const token_track_value = "0x3ay45x3...";
              // const token_track_value = sessionStorage.getItem("search_token") ? sessionStorage.getItem("search_token") : "0x3ay45x3...";
              // if (sessionStorage.getItem("search_token")) {
              //   token_track_value = sessionStorage.getItem("search_token") ? sessionStorage.getItem("search_token") : "0x3ay45x3...";
              // }

              return (<div className="chart-page-new-design-bottom-table-body-item-container-style">
                <span className="chart-page-new-design-bottom-table-header-item-text-style">
                  {history.side === "SELL" ? <span style={{ color: "red" }}>{history.side}</span> : <span style={{ color: "#15b886" }}>{history.side}</span>}
                </span>
                <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">{history.amount1.toString().slice(0, 8)}</span>
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">{history.token1}</span>
                </div>
                <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">$ {history.amount2.toString().slice(0, 8)}</span>
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">{history.token2}</span>
                </div>
                <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">{history.tokenPriceUSD.toString().slice(0, 8)}</span>
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">LP v2</span>
                </div>
                <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                  <span className="chart-page-new-design-bottom-table-main-items-text-style">{history.timestamp}</span>
                </div>
                <div className="chart-page-new-design-bottom-table-main-item-child-container-style">
                  <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">{token_track_value}</span>
                  <span className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</span>
                </div>
              </div>)
            })}



            {/* <div className="chart-page-new-design-bottom-table-body-item-container-style">
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

            <div className="chart-page-new-design-bottom-table-body-item-container-style">
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

            <div className="chart-page-new-design-bottom-table-body-item-container-style">
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

            <div className="chart-page-new-design-bottom-table-body-item-container-style">
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

            <div className="chart-page-new-design-bottom-table-body-item-container-style">
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
            </div> */}

          </div>

        </div>
      </Grid>
    </Grid>
  </div>)
}

export default BottomCenterChartContainer
