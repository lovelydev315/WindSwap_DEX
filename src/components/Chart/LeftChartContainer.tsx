import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import useTheme from 'hooks/useTheme'
import axios from "axios";
import Web3 from "web3";
// import bsc_new_logo from "assets/images/new/bsc_new_logo.png";
// import LeftChartItemGraph from "./LeftChartItemGraph";

interface propsObject {
  name: string,
  address: string,
  symbol: string
}

function noExponents(input: string) {
  const data= input.split(/[eE]/);
  if(data.length === 1) return data[0]; 

  let  z= '';
  const sign= Number(input) < 0 ? '-' : '';
  const str= data[0].replace('.', '');
  let mag= Number(data[1])+ 1;

  if(mag < 0) {
      z= sign.concat('0.');
      while(mag++) z += '0';
      return z + str.replace(/^-/,'');
  }
  mag -= str.length;  
  while(mag--) z += '0';
  return str + z;
}

const LeftChartContainer = (props: propsObject) => {
  const {name, address, symbol} = props;
  const tokenAddress = address;
  const tokenName = name;
  const tokenSymbol = symbol;
  const { isDark, toggleTheme } = useTheme()

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("N/A");

  const [liquidityV1, setLiquidityV1] = useState<number>(0);
  const [liquidityV1Text, setLiquidityV1Text] = useState("N/A");
  
  const [liquidityV2, setLiquidityV2] = useState<number>(0);
  const [liquidityV2Text, setLiquidityV2Text] = useState("N/A");

  const [PriceChange24Hours, setPriceChange24Hours] = useState<number>(0)
  const [PriceChange24HoursText, setPriceChange24HoursText] = useState("N/A");

  const [PriceChange24HoursPercent, setPriceChange24HoursPercent] = useState<number>(0);
  const [PriceChange24HoursPercentText, setPriceChange24HoursPercentText] = useState("N/A");

  const [PriceChange7Days, setPriceChange7Days] = useState<number>(0)
  const [PriceChange7DaysText, setPriceChange7DaysText] = useState("N/A");

  const [PriceChange7DaysPercent, setPriceChange7DaysPercent] = useState<number>(0);
  const [PriceChange7DaysPercentText, setPriceChange7DaysPercentText] = useState("N/A");

  const [Price24HoursLow, setPrice24HoursLow] = useState<number>(0)
  const [Price24HoursLowText, setPrice24HoursLowText] = useState("N/A");

  const [Price24HoursHigh, setPrice24HoursHigh] = useState<number>(0)
  const [Price24HoursHighText, setPrice24HoursHighText] = useState("N/A");

  const [Price7DaysLow, setPrice7DaysLow] = useState<number>(0)
  const [Price7DaysLowText, setPrice7DaysLowText] = useState("N/A");

  const [Price7DaysHigh, setPrice7DaysHigh] = useState<number>(0)
  const [Price7DaysHighText, setPrice7DaysHighText] = useState("N/A");

  const [PriceAllTimeLow, setPriceAllTimeLow] = useState<number>(0)
  const [PriceAllTimeLowText, setPriceAllTimeLowText] = useState("N/A");

  const [PriceAllTimeHigh, setPriceAllTimeHigh] = useState<number>(0)
  const [PriceAllTimeHighText, setPriceAllTimeHighText] = useState("N/A");

  const [PriceCirculatingSupply, setPriceCirculatingSupply] = useState<number>(0)
  const [PriceCirculatingSupplyText, setPriceCirculatingSupplyText] = useState("N/A");

  const [PriceMaxSupply, setPriceMaxSupply] = useState<number>(0)
  const [PriceMaxSupplyText, setPriceMaxSupplyText] = useState("N/A");

  const [PriceTotalSupply, setPriceTotalSupply] = useState<number>(0)
  const [PriceTotalSupplyText, setPriceTotalSupplyText] = useState("N/A");

  const [PriceMarketCap, setPriceMarketCap] = useState<number>(0)
  const [PriceMarketCapText, setPriceMarketCapText] = useState("N/A");

  const BaseUrl = "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://localhost:5000"; // "http://168.119.111.227:3007";
  const windyToken = "0xd1587ee50e0333f0c4adcf261379a61b1486c5d2";

  useEffect(() => {
    initPrice();
    window.sessionStorage.setItem("stretchText", "normal");
    // get_token_details
    async function getTokenDetails(_address) {

      function convertNumberToFormattedString(input: number) {
        let formattedNumber = input.toPrecision(8);
        formattedNumber = convertToComma(formattedNumber);
        return formattedNumber;
      }

      let _current_price;
      await axios.post(`${BaseUrl}/api/v1/price`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          _current_price = res.data.data.price;
          setWindSwapPrice(_current_price);
          setWindSwapPriceText(`$${convertNumberToFormattedString(_current_price)}`);
        }
      });
      if(!_current_price) return;
      
      axios.post(`${BaseUrl}/api/v1/get_price_change_24h`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const _price_change_24h = res.data.data.data;
          const _price_change_24h_percent = _price_change_24h / (_current_price - _price_change_24h) * 100;
          setPriceChange24Hours(_price_change_24h);
          if(_price_change_24h < 0) setPriceChange24HoursText(`-$${convertNumberToFormattedString(Math.abs(_price_change_24h))}`);
          else setPriceChange24HoursText(`$${convertNumberToFormattedString(_price_change_24h)}`);
          setPriceChange24HoursPercent(_price_change_24h_percent);
          setPriceChange24HoursPercentText(`${_price_change_24h_percent.toFixed(3)}%`);
        }
      });
      
      axios.post(`${BaseUrl}/api/v1/get_price_change_week`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const _price_change_7d = res.data.data.data;
          const _price_change_7d_percent = _price_change_7d / (_current_price - _price_change_7d) * 100;
          setPriceChange7Days(_price_change_7d);
          if(_price_change_7d < 0) setPriceChange7DaysText(`-$${convertNumberToFormattedString(Math.abs(_price_change_7d))}`);
          else setPriceChange7DaysText(`$${convertNumberToFormattedString(_price_change_7d)}`);
          setPriceChange7DaysPercent(_price_change_7d_percent);
          if(_price_change_7d_percent) setPriceChange7DaysPercentText(`${_price_change_7d_percent.toFixed(3)}%`);
        }
      });
      
      axios.post(`${BaseUrl}/api/v1/liquidity_v1`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const _liquidity_price_v1 = res.data.data.price;
          setLiquidityV1(_liquidity_price_v1);
          if(_liquidity_price_v1) setLiquidityV1Text(`$${convertNumberToFormattedString(_liquidity_price_v1)}`);
        }
      });
      
      axios.post(`${BaseUrl}/api/v1/liquidity_v2`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const _liquidity_price_v2 = res.data.data.price;
          setLiquidityV2(_liquidity_price_v2);
          if(_liquidity_price_v2) setLiquidityV2Text(`$${convertNumberToFormattedString(_liquidity_price_v2)}`);
        }
      });
      
      axios.post(`${BaseUrl}/api/v1/total_supply`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const _total_supply = res.data.data.totalSupply;
          setPriceTotalSupply(_total_supply);
          if(_total_supply) setPriceTotalSupplyText(`${convertToComma(Math.round(_total_supply).toString())}`);
        }
      });
      
      axios.post(`${BaseUrl}/api/v1/circulating_supply`, { "token": _address }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const _circulating_supply = res.data.data.circulatingSupply;
          const _marketcap = _circulating_supply * _current_price;
          setPriceCirculatingSupply(_circulating_supply);
          if(_circulating_supply) setPriceCirculatingSupplyText(`${convertToComma(Math.round(_circulating_supply).toString())}`);
          setPriceMarketCap(_marketcap);
          setPriceMarketCapText(`$${convertToComma(Math.round(_marketcap).toString())}`);
        }
      });

      axios.post(`${BaseUrl}/api/v1/price_min_max`, { "token": _address }).then((res) => {
        if (res.data.status === 200) {
          console.log("min_max", res.data.data);
          const _tokenAddress = res.data.data.address;
          console.log(res.data.data)
          if(_tokenAddress !== tokenAddress) return;
          const _price_min_24h = res.data.data.price_range_24h.min > _current_price ? _current_price : res.data.data.price_range_24h.min;
          const _price_max_24h = res.data.data.price_range_24h.max < _current_price ? _current_price : res.data.data.price_range_24h.max;
          const _price_min_7d = res.data.data.price_range_7d.min > _price_min_24h ? _price_min_24h : res.data.data.price_range_7d.min;
          const _price_max_7d = res.data.data.price_range_7d.max < _price_max_24h ? _price_max_24h : res.data.data.price_range_7d.max;
          const _price_min_all = res.data.data.price_range_all_time.min > _price_min_7d ? _price_min_24h : res.data.data.price_range_all_time.min;
          const _price_max_all = res.data.data.price_range_all_time.max < _price_max_7d ? _price_max_24h : res.data.data.price_range_all_time.max;
          setPrice24HoursLow(_price_min_24h);
          if(_price_min_24h && _price_min_24h !== "invalid") setPrice24HoursLowText(`$${convertNumberToFormattedString(_price_min_24h)}`);
          setPrice24HoursHigh(_price_max_24h);
          if(_price_max_24h && _price_max_24h !== "invalid") setPrice24HoursHighText(`$${convertNumberToFormattedString(_price_max_24h)}`);
          setPrice7DaysLow(_price_min_7d);
          if(_price_min_7d && _price_min_7d !== "invalid") setPrice7DaysLowText(`$${convertNumberToFormattedString(_price_min_7d)}`);
          setPrice7DaysHigh(_price_max_7d);
          if(_price_max_7d && _price_max_7d !== "invalid") setPrice7DaysHighText(`$${convertNumberToFormattedString(_price_max_7d)}`);
          setPriceAllTimeLow(_price_min_all);
          if(_price_min_all && _price_min_all !== "invalid") setPriceAllTimeLowText(`$ ${convertNumberToFormattedString(_price_min_all)}`);
          setPriceAllTimeHigh(_price_max_all);
          if(_price_max_all && _price_max_all !== "invalid") setPriceAllTimeHighText(`$${convertNumberToFormattedString(_price_max_all)}`);
        }
      })
    }
    getTokenDetails(tokenAddress);
    const timer = window.setInterval(() => {
      getTokenDetails(tokenAddress);
    }, 60000)
    return () => window.clearInterval(timer)
  }, [tokenAddress])

  function initPrice() {
    setWindSwapPrice(0);
    setWindSwapPriceText("N/A");
    setLiquidityV1(0);
    setLiquidityV1Text("N/A");    
    setLiquidityV2(0);
    setLiquidityV2Text("N/A");
    setPriceChange24Hours(0);
    setPriceChange24HoursText("N/A");
    setPriceChange24HoursPercent(0);
    setPriceChange24HoursPercentText("N/A");
    setPriceChange7Days(0);
    setPriceChange7DaysText("N/A");
    setPriceChange7DaysPercent(0);
    setPriceChange7DaysPercentText("N/A");
    setPrice24HoursLow(0);
    setPrice24HoursLowText("N/A");
    setPrice24HoursHigh(0);
    setPrice24HoursHighText("N/A");
    setPrice7DaysLow(0);
    setPrice7DaysLowText("N/A");
    setPrice7DaysHigh(0);
    setPrice7DaysHighText("N/A");
    setPriceAllTimeLow(0);
    setPriceAllTimeLowText("N/A");
    setPriceAllTimeHigh(0);
    setPriceAllTimeHighText("N/A");
    setPriceCirculatingSupply(0);
    setPriceCirculatingSupplyText("N/A");
    setPriceMaxSupply(0);
    setPriceMaxSupplyText("N/A");
    setPriceTotalSupply(0);
    setPriceTotalSupplyText("N/A");
    setPriceMarketCap(0);
    setPriceMarketCapText("N/A");
  }

  function convertToComma(_input: string) {
    let input = noExponents(_input);
    if(input.length > 13 && window.sessionStorage.getItem("stretchText") === "normal") {
      window.sessionStorage.setItem("stretchText", "stretch");
    }

    // if(input.length > 11) input = Number.parseFloat(input).toExponential();
    if(Number(input) < 1 && Number(input) > 0.000001 && input.length > 10) {
      input = input.substr(0, 10);
    }
    else if(Number(input) <= 0.000001) {
      let index = 2;
      while(input[index] === "0" && input.length > index) index++;
      input = input.substr(0, index + 3);
    }
    const inputArray = input.split(".");
    const formattedArray = new Array<string>();
    while(true) {
      if(inputArray[0].length > 3) {
        const each = inputArray[0].slice(-3);
        inputArray[0] = inputArray[0].slice(0, -3);
        formattedArray.unshift(`,${each}`);
      }
      else {
        if(inputArray[0].length) formattedArray.unshift(inputArray[0]);
        break;
      }
    }
    let formattedInteger = formattedArray.join("");
    if(inputArray.length > 1) formattedInteger = formattedInteger.concat(".", inputArray[1]);
    return formattedInteger;
  }

  function tokenLogo(_address: string) {
    const checksumAddress = Web3.utils.toChecksumAddress(_address);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${checksumAddress}/logo.png`;
  }
  
  function removeImg(event) {
    event.target.style.display = "none";
  }
  const stretchText = window.sessionStorage.getItem("stretchText") === "stretch";
  return (<div>
    {isDark === true && <div>
      <div style={{ height: 3 }}>&nbsp;</div>
      <div className="price-text-field-container-style-new">
        <div className="chart-new-update-left-card-container-style">
          <div className="new-chartpage-text-small-style">
            <span>{tokenName} Price</span>
            <br />
            <p className="smallest"><a className="dark-bscscan-link" href={`https://bscscan.com/token/${tokenAddress}`} target="_blank" rel="noreferrer">Contract Link - {tokenAddress}</a></p>
            
          </div>
          <div className="new-chart-page-value-text-style-windy-price dark">{WindSwapPriceText}</div>
        </div>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Price Change(24h)</div>
                {PriceChange24Hours >= 0 ?
                  <div className={`new-chart-page-value-text-style-windy-price dark ${stretchText ? "stretched-text" : ""}`}>{PriceChange24HoursText}</div> :
                  <div className={`new-chart-price-change-24h-text-style-here-2 ${stretchText ? "stretched-text" : ""}`}>{PriceChange24HoursText}</div>
                }
              </div>
              <div className="chart-price-change-24h-standard-text-under-small-description-container-style">
                {PriceChange24Hours >= 0 ?
                  <>
                    <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-7d-standard-text-under-small-description">{PriceChange24HoursPercentText}</span>
                  </> :
                  <>
                    <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-under-small-description">{PriceChange24HoursPercentText}</span>
                  </>
                }
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Price Change(7d)</div>
                {PriceChange7Days >= 0 ?
                  <div className={`new-chart-page-value-text-style-windy-price dark ${stretchText ? "stretched-text" : ""}`}>{PriceChange7DaysText}</div> :
                  <div className={`new-chart-price-change-24h-text-style-here-2 ${stretchText ? "stretched-text" : ""}`}>{PriceChange7DaysText}</div>
                }
              </div>
              <div className="chart-price-change-24h-standard-text-under-small-description-container-style">
                {PriceChange7Days >= 0 ?
                  <>
                    <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-7d-standard-text-under-small-description">{PriceChange7DaysPercentText}</span>
                  </> :
                  <>
                    <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-under-small-description">{PriceChange7DaysPercentText}</span>
                  </>
                }
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* <LeftChartItemGraph /> */}
      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Liquidity V1</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{liquidityV1Text}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Liquidity V2</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{liquidityV2Text}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">24h Low</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{Price24HoursLowText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">24h High</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{Price24HoursHighText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">7d Low</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{Price7DaysLowText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">7d High</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{Price7DaysHighText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">All-Time Low</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{PriceAllTimeLowText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">All-Time High</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{PriceAllTimeHighText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Total Supply</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{PriceTotalSupplyText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Market Cap</div>
                <div className={`new-chart-card-below-general-text-style-here ${stretchText ? "stretched-text" : ""}`}>{PriceMarketCapText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div style={{ paddingBottom: 12 }}>
        <div className="bsc-new-logo-left-colum-chart-page-container-style">
          <img src={tokenLogo(tokenAddress)} className="bsc-new-logo-left-colum-chart-page" alt="logo" onError={(event) => removeImg(event)} />
          <span className="bsc-new-logo-left-colum-chart-page-text-style">{WindSwapPriceText}</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px" }}>
        <div className="bsc-new-logo-left-colum-chart-page-container-style">
          <span className="bsc-new-logo-below-made-by-text-style">Version 1.0.0 - Made By WindSwap</span>
        </div>
      </div>
    </div>}


    {isDark === false && <div>
      <div style={{ height: 3 }}>&nbsp;</div>
      <div className="price-text-field-container-style-new-light-mode">
        <div className="chart-new-update-left-card-container-style">
          <div className="new-chartpage-text-small-style">
            <span>{tokenName} Price</span>
            <br />
            <p className="smallest">{windyToken}</p>
            <p className="smallest"><a className="light-bscscan-link" href={`https://bscscan.com/token/${tokenAddress}`} target="_blank" rel="noreferrer">Contract Link - {tokenAddress}</a></p>
          </div>
          <div className="new-chart-page-value-text-style-windy-price light">{WindSwapPriceText}</div>
        </div>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Price Change(24h)</div>
                {PriceChange24Hours >= 0 ?
                  <div className="new-chart-page-value-text-style-windy-price light">{PriceChange24HoursText}</div> :
                  <div className="new-chart-price-change-24h-text-style-here-2">{PriceChange24HoursText}</div>
                }
              </div>
              <div className="chart-price-change-24h-standard-text-under-small-description-container-style">
                {PriceChange24Hours >= 0 ?
                  <>
                    <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-7d-standard-text-under-small-description">{PriceChange24HoursPercentText}</span>
                  </> :
                  <>
                    <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-under-small-description">{PriceChange24HoursPercentText}</span>
                  </>
                }
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style light">Price Change(7d)</div>
                {PriceChange7Days >= 0 ?
                  <div className="new-chart-page-value-text-style-windy-price">{PriceChange7DaysText}</div> :
                  <div className="new-chart-price-change-24h-text-style-here-2">{PriceChange7DaysText}</div>
                }
              </div>
              <div className="chart-price-change-24h-standard-text-under-small-description-container-style">
                {PriceChange7Days >= 0 ?
                  <>
                    <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-7d-standard-text-under-small-description">{PriceChange7DaysPercentText}</span>
                  </> :
                  <>
                    <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-under-small-description">{PriceChange7DaysPercentText}</span>
                  </>
                }
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* <LeftChartItemGraph /> */}

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Liquidity V1</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{liquidityV1Text}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">liquidity V2</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{liquidityV2Text}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">24h Low</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{Price24HoursLowText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">24h High</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{Price24HoursHighText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">7d Low</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{Price7DaysLowText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">7d High</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{Price7DaysHighText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">All-Time Low</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{PriceAllTimeLowText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">All-Time High</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{PriceAllTimeHighText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <Grid container
          justify="space-between"
          spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-input-grid-6-padding-style">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Total Supply</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{PriceTotalSupplyText}</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} className="chart-page-left-grid-6-second-item-contaiern-style-padding">
            <div className="price-text-field-container-style-new-light-mode">
              <div className="chart-new-update-left-card-container-style">
                <div className="new-chartpage-text-small-style">Market Cap</div>
                <div className="new-chart-card-below-general-text-style-here-light-mode">{PriceMarketCapText}</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div style={{ paddingBottom: "12px" }}>
        <div className="bsc-new-logo-left-colum-chart-page-container-style">
          <img src={tokenLogo(tokenAddress)} className="bsc-new-logo-left-colum-chart-page" alt="bsc-new-logo" onError={(event) => removeImg(event)} />
          <span className="bsc-new-logo-left-colum-chart-page-text-style">{WindSwapPriceText}</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "10px"}}>
        <div className="bsc-new-logo-left-colum-chart-page-container-style">
          <span className="bsc-new-logo-below-made-by-text-style">Version 1.0.0 - Made By WindSwap</span>
        </div>
      </div>
    </div>}

  </div>)
}

export default LeftChartContainer
