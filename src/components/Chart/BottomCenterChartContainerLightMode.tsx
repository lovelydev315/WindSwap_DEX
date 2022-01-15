import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import _ from "lodash";
import Web3 from 'web3';
import axios from 'axios';

import pancakeRouterAbi from '../../abi/PancakeRounter.json';
import pancakeFactoryv1Abi from "../../abi/PancakeFactoryv1.json";
import pancakeFactoryv2Abi from "../../abi/PancakeFactoryv2.json";
import { ROUTER_ADDRESS } from "../../constants/index";

import useGetContract from "../Tokens/useGetContract";
import useGetTokenInfo from "../Tokens/useGetTokenInfo";

const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.defibit.io'));

// const WindAddress = '0xd1587ee50e0333f0c4adcf261379a61b1486c5d2';
const pancakeRouterContract = new web3.eth.Contract(pancakeRouterAbi as any, ROUTER_ADDRESS);

const pancakeFactoryV2 = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
const pancakeFactoryV1 = '0xBCfCcbde45cE874adCB698cC183deBcF17952812';

const pancakeFactoryV1Contract = new web3.eth.Contract(
  pancakeFactoryv1Abi as any,
  pancakeFactoryV1
);

const pancakeFactoryV2Contract = new web3.eth.Contract(
  pancakeFactoryv2Abi as any,
  pancakeFactoryV2
);

let pancakeSwapLP = '0x0c5DA0f07962dd0256c079248633f2b43CaD6f62';
let pancakeSwapLPv1 = '0x746a3f1a3863cf839bf0702c083cca888aba6ee8';
const wbnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const topicForTransfer = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

interface tokenObject {
  name: string,
  symbol: string,
  address: string
}
const BaseUrl =  "http://localhost:5000"; // "http://localhost:5000"; // "http://168.119.111.227:3007";"https://dex-api.windswap.finance";

const BottomCenterChartContainerLightMode = (props: tokenObject) => {

  const [tokenTxToggle, setTokenTxToggle] = useState("Token");
  const {name, address, symbol} = props;
  const tokenName = name;
  const tokenAddress = address;
  const tokenSymbol = symbol;

  const [transactions, setTransactions] = useState<any>([]);
  const [trxHashes, setTrxHashes] = useState<any>([]);
  const [bnbPrice, setBnbPrice] = useState(0);

  const { contract, getContract } = useGetContract();
  const { tokenInfo, getTokenInfo } = useGetTokenInfo();

  const updatePairAddresses = async (_address: string) => {
    pancakeSwapLPv1 = await pancakeFactoryV1Contract.methods.getPair(wbnb, _address).call();
    pancakeSwapLP = await pancakeFactoryV2Contract.methods.getPair(wbnb, _address).call();
  }

  useEffect(() => {
    updatePairAddresses(tokenAddress as string);

    function getTime(time) {
      const timeArray = time.toString().split(":");
      if(Number(timeArray[0]) > 12) {
        timeArray[0] = (Number(timeArray[0]) % 12).toString();
      }
      return timeArray.join(":");
    }

    function getAMPM(time) {
      const timeArray = time.toString().split(":");
      let ampm = "AM";
      if(Number(timeArray[0]) > 12) {
        ampm = "PM";
      }
      return ampm;

    }
    
    setTransactions([]);
    function getLast50Transactions() {
      axios.post(`${BaseUrl}/api/v1/get_last_50_transactions`, { "token": tokenAddress }).then((res) => {
        if(res.data.status === 200) {
          const _transactions = res.data.data;

          setTrxHashes(_transactions.map(each => each.transactionHash));
          
          setTransactions(_transactions.map(each => ({ address: each.address, direction: each.side  === "BUY" ? "SELL" : "BUY", lp: each.protocol, price: each.amount2.toString().slice(0,8), price_token: (each.amount2/each.amount1).toString().slice(0, 8), time: { strTime: getTime(each.time), ampm: getAMPM(each.time) }, timestamp: each.timestamp, token: each.amount1.toString().slice(0, 8), transactionHash: each.hash })));

        }
      });
    }
    getLast50Transactions();

    getContract(tokenAddress);
    getTokenInfo(tokenAddress);
  }, [getContract, getTokenInfo, tokenAddress]);

  const getBNBAmountFromTx = React.useCallback((txHash: string) => {
    return new Promise((resolve, reject) => {
      web3.eth.getTransactionReceipt(txHash).then(transactionReceipt => {
        let bnbAmount = 0;
        web3.eth.getBlock(transactionReceipt.blockNumber).then((blockTimeStamp: any) => {
          const time = new Date(blockTimeStamp.timestamp * 1000);

          transactionReceipt.logs.forEach((log: any) => {
            if (log.topics[0] === topicForTransfer && log.address === wbnb) {
              bnbAmount = log.data * 1.0 / 10 ** 18;
              resolve([bnbAmount, formatAMPM(time), blockTimeStamp.timestamp]);
            }
          })
        }).catch(blockTimeStampErr => {
          console.log({
            blockTimeStampErr
          })
          resolve([0, 0, 0])
        })

      }).catch(transactionReceiptErr => {
        console.log({
          transactionReceiptErr
        })

        resolve([0, 0, 0])
      });
    })
  }, []);

  const processTransaction = React.useCallback((transactionHash, returnValues, decimal) => {
    return new Promise((resolve, reject) => {
      let trxInfo = {};
      if (returnValues.to.toLowerCase() === pancakeSwapLP.toLowerCase() || returnValues.to.toLowerCase() === pancakeSwapLPv1.toLowerCase() ||
        returnValues.from.toLowerCase() === pancakeSwapLP.toLowerCase() || returnValues.from.toLowerCase() === pancakeSwapLPv1.toLowerCase()) {
        getBNBAmountFromTx(transactionHash).then((res: any) => {
          const [bnbAmount, timeString, timeStamp] = res;
          if (returnValues.to.toLowerCase() === pancakeSwapLP.toLowerCase() || returnValues.to.toLowerCase() === pancakeSwapLPv1.toLowerCase()) {
            trxInfo = {
              direction: 'SELL',
              transactionHash,
              address: returnValues.from,
              token: (returnValues.value * 1.0 / 10 ** (decimal * 1.0)).toFixed(4),
              price: bnbAmount.toFixed(4),
              time: timeString,
              timeStamp,
              price_token: (bnbAmount) / (returnValues.value * 1.0 / 10 ** (decimal * 1.0)),
              lp: returnValues.to.toLowerCase() === pancakeSwapLP.toLowerCase() ? "LP v2" : "LP v1"
            }
          } else if (returnValues.from.toLowerCase() === pancakeSwapLP.toLowerCase() || returnValues.from.toLowerCase() === pancakeSwapLPv1.toLowerCase()) {
            trxInfo = {
              direction: 'BUY',
              transactionHash,
              address: returnValues.to,
              token: (returnValues.value * 1.0 / 10 ** (decimal * 1.0)).toFixed(4),
              price: bnbAmount.toFixed(4),
              time: timeString,
              timeStamp,
              price_token: (bnbAmount) / (returnValues.value * 1.0 / 10 ** (decimal * 1.0)),
              lp: returnValues.from.toLowerCase() === pancakeSwapLP.toLowerCase() ? "LP v2" : "LP v1"
            }
          }

          resolve(trxInfo)
        });
      }
    })
  }, [getBNBAmountFromTx]);

  useEffect(() => {
    const getBnbPriceInterval = setInterval(() => {
      getBNBPrice();
    }, 2000);
    return () => clearInterval(getBnbPriceInterval);
  }, [bnbPrice]);

  const getTransactions = React.useCallback(() => {
    if (!contract || !tokenInfo) return;

    const { decimals } = tokenInfo;

    web3.eth.getBlockNumber().then(currentBlock => {
      contract.getPastEvents({
        filter: {},
        fromBlock: currentBlock * 1.0 - 2000,
        toBlock: currentBlock * 1.0,
        topics: [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        ]
      }, function (error: any, events: any) {
        if (error) {
          // setTransactions([]);
        } else {
          for (let i = 0; i < events.length; i++) {
            const eachTransfer = events[i];
            if(eachTransfer.raw) {
              const {
                raw,
                transactionHash
              } = eachTransfer;
              if (!trxHashes.includes(transactionHash)) {
                setTrxHashes(oldTrxHashes => {
                  return [...oldTrxHashes, transactionHash];
                });

                const {data, topics} = raw;
                const value = data * 1.0; 
                const from = topics[1].replace("0x000000000000000000000000", "0x");
                const to = topics[2].replace("0x000000000000000000000000", "0x")

                if (from.toLowerCase() === pancakeSwapLP.toLowerCase() || to.toLowerCase() === pancakeSwapLP.toLowerCase() || from.toLowerCase() === pancakeSwapLPv1.toLowerCase() || to.toLowerCase() === pancakeSwapLPv1.toLowerCase()) {
                  processTransaction(transactionHash, {from, to, value}, decimals).then(trxInfo => {
                    setTransactions(oldTransactions => {
                      console.log(oldTransactions)
                      const trxs = [trxInfo, ...oldTransactions];
                      return trxs.sort((a, b) => b.timeStamp - a.timeStamp)
                    });
                  }).catch(trxInfoErr => {
                    console.log({
                      trxInfoErr
                    })
                  });
                }
              }
            }
            
          }
        }
      })
    });
  }, [processTransaction, trxHashes, contract, tokenInfo]);

  useEffect(() => {
    const getTransactionsInterval = setInterval(() => {
      getTransactions();
    }, 4000);
    return () => clearInterval(getTransactionsInterval);
  }, [getTransactions]);

  const getCellStyleByAction = (direction: string) => {
    return (direction === "BUY" ? "text-success" : "text-danger");
  }

  const getUSDAmount = (bnb: any) => {
    return `$${(bnb * bnbPrice).toFixed(2)}`;
  }

  const getBNBPrice = () => {
    pancakeRouterContract.methods.getAmountsOut((10 ** 18).toString(), ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"]).call().then(amountsOut => {
      const amountOut: any = web3.utils.fromWei(amountsOut[1]);

      setBnbPrice(amountOut)
    }).catch(error => {
      console.log(error);
      setBnbPrice(0)
    });

  }

  const formatAMPM = (date: any) => {
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secs = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours !== 0 ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    secs = secs < 10 ? `0${secs}` : secs;
    const strTime = `${hours}:${minutes}:${secs}`;
    return { strTime, ampm };
  }
  return (<div>
    <Grid container
      justify="space-between"
      spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <table className="chart-page-new-design-bottom-table-top-container-style-here-light-mode">
          <thead className="align-center-just-space-between-style pading-some-px-style">
            <tr className="chart-page-new-design-bottom-table-header-contanier-style-light-mode mobile-view-hiddien-laoptop-view">
              <th className="chart-page-new-design-bottom-table-header-item-text-style-light-mode width-21 text-right">Tokens</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style-light-mode width-25 text-right">Price</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style-light-mode width-25 text-right">Price/Token</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style-light-mode width-13 text-right">Time</th>
              <th className="chart-page-new-design-bottom-table-header-item-text-style-light-mode width-16 text-left">Tx</th>
            </tr>
          </thead>
          <tbody className="transaction-list">
            {transactions !== null && _.uniqBy(transactions, function (o: any) {
              return o.transactionHash;
            }).map(transaction => {

              return (<tr key={transaction.transactionHash} className="chart-page-new-design-bottom-table-body-item-container-style-light-mode width-100">
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-21">
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{transaction.token.toString().slice(0, 8)}</p>
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{tokenSymbol}</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-25">
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{getUSDAmount(transaction.price)}</p>
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{transaction.price} BNB</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-25">
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{getUSDAmount(transaction.price_token)}</p>
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{transaction.lp}</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-13">
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{transaction.time.strTime}</p>
                  <p className={transaction.direction.toLowerCase() === "buy" ? "chart-page-new-design-bottom-table-main-items-text-style-buy" : "chart-page-new-design-bottom-table-main-items-text-style-sell"}>{transaction.time.ampm}</p>
                </td>
                <td className="chart-page-new-design-bottom-table-main-item-child-container-style width-16">
                  <a className="chart-page-new-design-bottom-table-end-item-tx-text-style" href={`https://bscscan.com/tx/${transaction.transactionHash}`} target="_blank" rel="noreferrer">{transaction.transactionHash.substring(0, 6)}...</a>
                  <p className="chart-page-new-design-bottom-table-end-item-tx-text-style">Track</p>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  </div>)
}

export default BottomCenterChartContainerLightMode