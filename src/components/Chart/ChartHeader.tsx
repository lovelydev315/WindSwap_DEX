/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
// import ConnectWalletChartHeaderPlace from "components/ConnectWalletButton/ConnectWalletChartHeaderPlace";
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
// import { Config } from 'utils/api_protocals';
// import io from 'socket.io-client'
import Web3 from "web3"

import App_logo from "../../assets/images/new_WindLogo.webp";
import App_logo_light from "../../assets/images/windswap-light-desktop.png";
import Mobile_App_logo from "../../assets/images/new_MobileWindLogo.webp";
import USDT_icon from "../../assets/images/new/USDT_icon.png"
import windy_icon from "../../assets/images/new/windy_icon.webp"
import BSC_LOGO from "../../assets/images/new/BSC_LOGO.png"

// const socket = io(`http://localhost:3007`)

const BaseUrl = "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://localhost:5000"; // "http://168.119.111.227:3007";

interface tokenObject {
  name: string,
  symbol: string,
  address: string
}

function ChartHeader(props: tokenObject) {
  const { isDark, toggleTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState(false)
  const [searchTokens, setSearchTokens] = useState<tokenObject[]>([]);
  const {name, address, symbol} = props;
  const tokenName = name;
  const tokenAddress = address;
  const tokenSymbol = symbol;
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [tokenPriceChange24h, setTokenPriceChange24h] = useState<number>(0);
  const [searchTokenValue, setSearchTokenValue] = useState("");

  useEffect(() => {
    setTokenPrice(0);
    setTokenPriceChange24h(0);
    axios.post(`${BaseUrl}/api/v1/price`, { "token": tokenAddress }).then((res) => {
      if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
        const price = res.data.data.price;
        setTokenPrice(price);
      }
    });
    axios.post(`${BaseUrl}/api/v1/get_price_change_24h`, { "token": tokenAddress }).then((res) => {
      if(res.data.status === 200) {
        const _tokenAddress = res.data.data.address;
        if(_tokenAddress !== tokenAddress) return;
        const priceChange = res.data.data.data;
        setTokenPriceChange24h(priceChange);
      }
    });
    const timer = window.setInterval(() => {
      axios.post(`${BaseUrl}/api/v1/price`, { "token": tokenAddress }).then((res) => {
        if(res.data.status === 200) {
          const _tokenAddress = res.data.data.address;
          if(_tokenAddress !== tokenAddress) return;
          const price = res.data.data.price;
          setTokenPrice(price);
        }
      });
      axios.post(`${BaseUrl}/api/v1/get_price_change_24h`, { "token": tokenAddress }).then((res) => {
        if(res.data.status === 200) {
        const _tokenAddress = res.data.data.address;
        if(_tokenAddress !== tokenAddress) return;
          const priceChange = res.data.data.data;
          setTokenPriceChange24h(priceChange);
        }
      });
    }, 60000);
    return () => {
      window.clearInterval(timer);
    }
  }, [tokenAddress]);

  function searchToken(index) {
    setSearchTokenValue(index);
    axios.post(`${BaseUrl}/api/v1/search_token`, { "index": index }).then((res) => {
      if(res.data.status === 200) {
        const tokenList = res.data.data;
        console.log(tokenList);
        setSearchTokens(tokenList);
      }
      else setSearchTokens([]);
    });
  }

  function tokenLogo(_address: string) {
    const checksumAddress = Web3.utils.toChecksumAddress(_address);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${checksumAddress}/logo.png`;
  }
  const priceChange24hPercent = tokenPriceChange24h / (tokenPrice - tokenPriceChange24h) * 100;
  
  function removeImg(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.style.display = "none";
  }

  function convertToComma(_input: string) {
    let input = _input;
    if(input.length > 9) input = Number.parseFloat(input).toExponential();
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

  return (<>
    <div className="new-chart-mobile-view-design-laptop-layout-show">
      {isDark === true && <div className="chart-page-fixed-header-container-styl-new">
        <a href="https://app.windswap.finance/#/">
          <img src={App_logo} alt="app logo" className="laptop-app-logo" />
          <img src={Mobile_App_logo} alt="mobile app logo" className="chart-page-new-design-mobile-app-logo" />
        </a>

        <div className="pading-some-px-style chart-header-center-search-container-style-top-mobile-hidden">
          <div className="chart-header-center-search-container-style-nng">

            <div className="chart-header-image-drop-down-top-container-style">
              <div className="chart-header-center-drop-icon-container-style">
                <img src={tokenLogo(tokenAddress)} alt="logo" className="chart-bottom-image-dropdown-content-desc-image-style" onError={(event) => removeImg(event)} />
                <div className="chart-bottom-image-dropdown-content-desc">{tokenSymbol}</div>
                <div className="right-border-1px-white-line-style">&nbsp;</div>
              </div>
            </div>
            
            <div className="chart-bottom-image-dropdown-content-style">
              <div className="chart-bottom-buy-card-dropdown-item-container-style">
                <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                <div className="chart-bottom-image-dropdown-content-desc">USDT</div>
                <div className="right-border-1px-white-line-style">&nbsp;</div>
              </div>
              <div className="chart-bottom-buy-card-dropdown-item-container-style">
                <img src={BSC_LOGO} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                <div className="chart-bottom-image-dropdown-content-desc">BSC</div>
                <div className="right-border-1px-white-line-style">&nbsp;</div>
              </div>
              <div className="chart-bottom-buy-card-dropdown-item-container-style">
                <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                <div className="chart-bottom-image-dropdown-content-desc">WINDY</div>
                <div className="right-border-1px-white-line-style">&nbsp;</div>
              </div>
            </div>

            <div className="align-center-just-center-style">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <div className="chart-page-token-search-container-style">
                <input 
                  type="text" 
                  className="chart-header-search-input-field-style"
                  placeholder="Click here to search the market or paste the address"
                  onChange={(e) => searchToken(e.target.value) }
                  value={searchTokenValue}
                />
                {searchTokens.length ? <div className="chart-page-token-search-result-conreianer-style">
                  {searchTokens.map(tokenItem => {
                    return (<Link to={`/tokens/${tokenItem.address}`} onClick={() => {
                      sessionStorage.clear();
                      sessionStorage.setItem("search_token_name", tokenItem.name);
                      sessionStorage.setItem("search_token_symbol", tokenItem.symbol);
                      sessionStorage.setItem("search_token", tokenItem.address);
                      setSearchTokens([]);
                      setSearchTokenValue("");
                    }}>
                      <div className="chart-page-search-result-token-list-item-container-style">
                        <div className="chart-page-search-result-toekn-logo-name-container-style">
                          <img src={tokenLogo(tokenItem.address)} alt="logo" className="chart-page-search-token-logo-style" onError={(event) => removeImg(event)} />
                          <span className="token-drop-down-list-token-name-text-style">{tokenItem.name} ({tokenItem.symbol})</span>
                        </div>
                        <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                      </div>
                    </Link>)
                  })}
                </div> : <></>}
              </div>

            </div>

            <div className="align-center-just-center-style">
              <span>${convertToComma(tokenPrice.toFixed(6))}</span>
              <div className="chart-header-center-right-percent-style">
                {tokenPriceChange24h > 0 ?
                  <>
                    <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-up-small-description">{`${Math.abs(priceChange24hPercent).toFixed(2)}%`}</span>
                  </> :
                  <>
                    <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-under-small-description">{`${Math.abs(priceChange24hPercent).toFixed(2)}%`}</span>
                  </>
                }
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="chart-header-menu-right-div-contaner-style">
            <Link to="/swap" className="swap-new-menu-link-style">
              <span className="chart-page-new-design-menu-header-item-inactive-text-style">Home</span>
            </Link>
            <Link to="/chart" className="swap-new-menu-link-style">
              <span className="chart-page-new-design-menu-header-item-actived-text-style">Dashboard</span>
            </Link>
            <Link to="/rug" className="swap-new-menu-link-style">
              <span className="chart-page-new-design-menu-header-item-inactive-text-style">Checker</span>
            </Link>
            <span className="chart-header-menu-setting-icon-container-style-span">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </span>
            <button type="button" className="chart-page-new-design-header-dark-change-buton-style" onClick={toggleTheme}>
              <svg style={{ color: "rgb(254, 191, 50)" }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            </button>
          </div>
        </div>
      </div>}


      {isDark === false && <div className="chart-page-fixed-header-container-styl-new-light-mode">
        <a href="https://app.windswap.finance/#/">
          <img src={App_logo_light} alt="app logo" className="laptop-app-logo" />
          <img src={Mobile_App_logo} alt="mobile app logo" className="chart-page-new-design-mobile-app-logo" />
        </a>

        <div className="pading-some-px-style chart-header-center-search-container-style-top-mobile-hidden">
          <div className="chart-header-center-search-container-style-nng-light-mode">

            <div className="chart-header-image-drop-down-top-container-style">
              <div className="chart-header-center-drop-icon-container-style">
                <img src={tokenLogo(tokenAddress)} alt="logo" className="chart-bottom-image-dropdown-content-desc-image-style" onError={(e)=>removeImg(e)} />
                <div className="chart-bottom-image-dropdown-content-desc-light-mode">{tokenSymbol}</div>
                <div className="right-border-1px-white-line-style-light-mode">&nbsp;</div>
              </div>
              <div className="chart-bottom-image-dropdown-content-style">
                <div className="chart-bottom-buy-card-dropdown-item-container-style">
                  <img src={USDT_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc-light-mode">USDT</div>
                  <div className="right-border-1px-white-line-style-light-mode">&nbsp;</div>
                </div>
                <div className="chart-bottom-buy-card-dropdown-item-container-style">
                  <img src={BSC_LOGO} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc-light-mode">BSC</div>
                  <div className="right-border-1px-white-line-style-light-mode">&nbsp;</div>
                </div>
                <div className="chart-bottom-buy-card-dropdown-item-container-style">
                  <img src={windy_icon} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
                  <div className="chart-bottom-image-dropdown-content-desc-light-mode">WINDY</div>
                  <div className="right-border-1px-white-line-style-light-mode">&nbsp;</div>
                </div>
              </div>
            </div>
            
            <div className="align-center-just-center-style">
              <svg style={{ color: "#929292" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <div className="chart-page-token-search-container-style">
                <input 
                  type="text" 
                  className="chart-header-search-input-field-style-light-mode"
                  placeholder="Click here to search the market or paste the address"
                  onChange={(e) => searchToken(e.target.value) }
                  value={searchTokenValue}
                />
                {searchTokens.length ? <div className="chart-page-token-search-result-conreianer-style">
                  {searchTokens.map(tokenItem => {
                    return (<Link to={`/tokens/${tokenItem.address}`} onClick={() => {
                      sessionStorage.clear();
                      sessionStorage.setItem("search_token_name", tokenItem.name);
                      sessionStorage.setItem("search_token_symbol", tokenItem.symbol);
                      sessionStorage.setItem("search_token", tokenItem.address);
                      setSearchTokens([]);
                      setSearchTokenValue("");
                    }}>
                      <div className="chart-page-search-result-token-list-item-container-style">
                        <div className="chart-page-search-result-toekn-logo-name-container-style">
                          <img src={tokenLogo(tokenItem.address)} alt="logo" className="chart-page-search-token-logo-style" onError={(event) => removeImg(event)} />
                          <span className="token-drop-down-list-token-name-text-style">{tokenItem.name} ({tokenItem.symbol})</span>
                        </div>
                        <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                      </div>
                    </Link>)
                  })}
                </div> : <></>}
              </div>
            </div>

            <div className="align-center-just-center-style">
              <span className="font-color">${tokenPrice.toFixed(6)}</span>
              <div className="chart-header-center-right-percent-style">
                {tokenPriceChange24h > 0 ?
                  <>
                    <svg style={{ color: "#12b886" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-up-small-description">{`${Math.abs(priceChange24hPercent).toFixed(2)}%`}</span>
                  </> :
                  <>
                    <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    <span className="chart-price-change-24h-standard-text-under-small-description">{`${Math.abs(priceChange24hPercent).toFixed(2)}%`}</span>
                  </>
                }
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="chart-header-menu-right-div-contaner-style">
            <Link to="/swap" className="swap-new-menu-link-style">
              <span className="chart-page-new-design-menu-header-item-inactive-text-style">Home</span>
            </Link>
            <Link to="/chart" className="swap-new-menu-link-style">
              <span className="chart-page-new-design-menu-header-item-actived-text-style-light-mode">Dashboard</span>
            </Link>
            <Link to="/rug" className="swap-new-menu-link-style">
              <span className="chart-page-new-design-menu-header-item-inactive-text-style">Checker</span>
            </Link>
            {/* <span className="chart-header-menu-item-child-style-it">Home</span>
          <span className="chart-header-menu-item-child-style-it">Dashboard</span>
          <span className="chart-header-menu-item-child-style-it">Checker</span> */}
            {/* <ConnectWalletChartHeaderPlace /> */}
            <span className="chart-header-menu-setting-icon-container-style-span-light-mode">
              <svg style={{ color: 'black' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </span>
            <button type="button" className="chart-page-new-design-header-dark-change-buton-style" onClick={toggleTheme}>
              <svg style={{ color: 'black' }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>}
    </div>

    {isDark ? <div className="new-chart-mobile-view-design-mobile-layout-show">
      {openMenu === false && <div className="chart-page-fixed-header-new-mobile-version-container-styl-new">
        <a href="https://app.windswap.finance/#/">
          <img src={App_logo} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
        </a>
        <button type="button" onClick={() => { setOpenMenu(true) }} className="chart-page-mobile-new-design-header-menu-icon-button-style-closed">
          <MenuIcon />
        </button>
      </div>}

      {openMenu === true && <div>
        <div className="chart-page-fixed-header-new-mobile-version-container-styl-new-open-menu-here">
          <div className="chart-page-mobile-new-design-top-header-logo-container-style">
            <a href="https://app.windswap.finance/#/">
              <img src={App_logo} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
            </a>
            <button type="button" onClick={() => { setOpenMenu(false) }} className="chart-page-mobile-new-design-header-menu-icon-button-style-opended">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </button>
          </div>
          <div className="chart-page-mobile-new-design-menu-items-container-style">
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
            <Link to="/rug" className="swap-new-menu-link-style">
              <span className="chart-page-mobile-new-design-menu-items-style">Rug Checker</span>
            </Link>
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
            <Link to="/swap" className="swap-new-menu-link-style">
              <span className="chart-page-mobile-new-design-menu-items-style">Swap</span>
            </Link>
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
            <Link to="/chart" className="swap-new-menu-link-style">
              <span className="chart-page-mobile-new-design-menu-items-style">Dashboard</span>
            </Link>
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
          </div>
        </div>
      </div>}
      <div className="align-center-just-center-style" style={{margin: "10px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <div className="chart-page-token-search-container-style">
          <input 
            type="text" 
            className="chart-header-search-input-field-style"
            placeholder="Click here to search the market or paste the address"
            onChange={(e) => searchToken(e.target.value) }
            value={searchTokenValue}
          />
          {searchTokens.length ? <div className="chart-page-token-search-result-conreianer-style">
            {searchTokens.map(tokenItem => {
              return (<Link to={`/tokens/${tokenItem.address}`} onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem("search_token_name", tokenItem.name);
                sessionStorage.setItem("search_token_symbol", tokenItem.symbol);
                sessionStorage.setItem("search_token", tokenItem.address);
                setSearchTokens([]);
                setSearchTokenValue("");
              }}>
                <div className="chart-page-search-result-token-list-item-container-style">
                  <div className="chart-page-search-result-toekn-logo-name-container-style">
                    <img src={tokenLogo(tokenItem.address)} alt="logo" className="chart-page-search-token-logo-style" onError={(event) => removeImg(event)} />
                    <span className="token-drop-down-list-token-name-text-style">{tokenItem.name} ({tokenItem.symbol})</span>
                  </div>
                  <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                </div>
              </Link>)
            })}
          </div> : <></>}
        </div>  

      </div>

    </div> : <div className="new-chart-mobile-view-design-mobile-layout-show">
      {openMenu === false && <div className="chart-page-fixed-header-new-mobile-version-container-styl-new-light-mode">
        <a href="https://app.windswap.finance/#/">
          <img src={App_logo_light} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
        </a>
        <button type="button" onClick={() => { setOpenMenu(true) }} className="chart-page-mobile-new-design-header-menu-icon-button-style-closed-light-mode">
          <MenuIcon />
        </button>
      </div>}

      {openMenu === true && <div>
        <div className="chart-page-fixed-header-new-mobile-version-container-styl-new-open-menu-here-light-mode">
          <div className="chart-page-mobile-new-design-top-header-logo-container-style">
            <a href="https://app.windswap.finance/#/">
              <img src={App_logo_light} alt="app logo" className="chart-new-mobile-design-logo-menu-style" />
            </a>
            <button type="button" onClick={() => { setOpenMenu(false) }} className="chart-page-mobile-new-design-header-menu-icon-button-style-opended">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </button>
          </div>
          <div className="chart-page-mobile-new-design-menu-items-container-style">
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
            <Link to="/rug" className="swap-new-menu-link-style">
              <span className="chart-page-mobile-new-design-menu-items-style">Rug Checker</span>
            </Link>
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
            <Link to="/swap" className="swap-new-menu-link-style">
              <span className="chart-page-mobile-new-design-menu-items-style">Swap</span>
            </Link>
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
            <Link to="/chart" className="swap-new-menu-link-style">
              <span className="chart-page-mobile-new-design-menu-items-style">Dashboard</span>
            </Link>
            <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
          </div>
        </div>
      </div>}
      <div className="align-center-just-center-style" style={{margin: "10px"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <div className="chart-page-token-search-container-style">
          <input 
            type="text" 
            className="chart-header-search-input-field-style"
            placeholder="Click here to search the market or paste the address"
            onChange={(e) => searchToken(e.target.value) }
            value={searchTokenValue}
          />
          {searchTokens.length ? <div className="chart-page-token-search-result-conreianer-style">
            {searchTokens.map(tokenItem => {
              return (<Link to={`/tokens/${tokenItem.address}`} onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem("search_token_name", tokenItem.name);
                sessionStorage.setItem("search_token_symbol", tokenItem.symbol);
                sessionStorage.setItem("search_token", tokenItem.address);
                setSearchTokens([]);
                setSearchTokenValue("");
              }}>
                <div className="chart-page-search-result-token-list-item-container-style">
                  <div className="chart-page-search-result-toekn-logo-name-container-style">
                    <img src={tokenLogo(tokenItem.address)} alt="logo" className="chart-page-search-token-logo-style" onError={(event) => removeImg(event)} />
                    <span className="token-drop-down-list-token-name-text-style">{tokenItem.name} ({tokenItem.symbol})</span>
                  </div>
                  <span className="token-dropdown-list-token-below-value-style">{tokenItem.address}</span>
                </div>
              </Link>)
            })}
          </div> : <></>}
        </div>  

      </div>

    </div>}
  </>)
}

export default ChartHeader