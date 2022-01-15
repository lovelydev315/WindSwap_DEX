import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import axios from 'axios';

interface tokenObject {
  name: string,
  symbol: string,
  address: string
}

interface transactionObject {
  block: number,
  amount1: number,
  token1: string,
  tradeAmountUSD: number,
  amount2: number,
  token2: string,
  timestamp: string,
  tokenPriceUSD: number,
  side: string,
  hash: string
}

const BaseUrl =  "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://localhost:5000"; // "http://168.119.111.227:3007";

const BottomCenterChartContainer = (props: tokenObject) => {

  const [lastTransactions, setLastTransactions] = useState<transactionObject[]>();
  const {name, address, symbol} = props;
  const tokenName = name;
  const tokenAddress = address;
  const tokenSymbol = symbol;

  useEffect(() => {
    setLastTransactions([]);
    function getLast50Transactions() {
      axios.post(`${BaseUrl}/api/v1/get_last_50_transactions`, { "token": tokenAddress }).then((res) => {
        if(res.data.status === 200) {
          const _transactions = res.data.data;
          setLastTransactions(JSON.parse(JSON.stringify(_transactions)));
        }
      });
    }
    getLast50Transactions();
    const timer = window.setInterval(() => {
      getLast50Transactions();
    }, 60000)
    return () => window.clearInterval(timer)
  }, [tokenAddress])

  return (<div>
    <Grid container
      justify="space-between"
      spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <table className="chart-page-new-design-bottom-table-top-container-style-here">
          <thead className="align-center-just-space-between-style pading-some-px-style">
            <tr className="chart-page-new-design-bottom-table-header-contanier-style mobile-view-hiddien-laoptop-view">
              <th className="chart-page-new-design-bottom-table-header-item-text-style width-21 text-right">Tokens</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style width-25 text-right">Price</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style width-25 text-right">Price/Token</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style width-13 text-right">Time</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style width-16 text-left">Tx</th>
            </tr>
          </thead>
          <tbody className="transaction-list">
            {lastTransactions && lastTransactions.length ?
              lastTransactions.map(each => (
              <tr key={each.hash} className="chart-page-new-design-bottom-table-body-item-container-style width-100">
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-21">
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{each.amount1.toString().slice(0, 8)}</p>
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{each.token1}</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-25">
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>$ {each.tradeAmountUSD.toString().slice(0, 8)}</p>
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{each.amount2.toString().slice(0, 8)} BNB</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-25">
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>$ {each.tokenPriceUSD.toString().slice(0 ,8)}</p>
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>LP v2</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-13">
                  <p className={each.side.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{each.timestamp}</p>
                  <p className="hidden-text">aaa</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-16">
                  <a className="chart-page-new-design-bottom-table-end-item-tx-text-style" href={`https://bscscan.com/tx/${each.hash}`} target="_blank" rel="noreferrer">{each.hash.slice(0, 10)}...</a>
                  <p className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</p>
                </td>
              </tr>)) :
              <tr className="width-100 d-block">
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-100 text-center" colSpan={99}>Loading...</td>
              </tr>
            }
          </tbody>
        </table>
      </Grid>
    </Grid>
  </div>)
}

export default BottomCenterChartContainer
