import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import PlaceOrderSellWindySlider from "./PlaceOrderSellWindySlider";

import USDT_icon from "../../assets/images/new/USDT_icon.png"
import bnb_logo from "../../assets/images/new/bnb_logo.png"
import doge_logo from "../../assets/images/new/doge_logo.png"
import dot_logo from "../../assets/images/new/dot_logo.png"
import windy_icon from "../../assets/images/new/windy_new_logo.png"
import atom_logo from "../../assets/images/new/atom_logo.png"
import avax_logo from "../../assets/images/new/avax_logo.png"
import dash_logo from "../../assets/images/new/dash_logo.png"


const BuyPercentSlider = withStyles({
  root: {
    color: '#12b886',
    height: 5,
  }
})(Slider);

const SellPercentSlider = withStyles({
  root: {
    color: '#ff646d',
    height: 5,
  }
})(Slider);

// const SellPercentSlider = withStyles({
//   root: {
//     color: '#ff646d',
//     height: 5,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

const marks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 25;
}

const RightChartContainerMobileVersion = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504");
  const [value, setValue] = useState(50);
  const [buysellToggleButton, setBuysellToggleButton] = useState("buy");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<div className="chart-page-new-design-right-colum-top-conatiner-style-here2">
    <p className="chart-page-new-design-right-top-text-place-order-style">Place Order</p>

    {buysellToggleButton === "buy" && <div className="align-center-just-center-style chart-page-new-design-right-colum-buy-sell-toggle-container-style">
      <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setBuysellToggleButton("buy") }}>Buy</button>
      <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setBuysellToggleButton("sell") }}>Sell</button>
    </div>}

    {buysellToggleButton === "sell" && <div className="align-center-just-center-style chart-page-new-design-right-colum-buy-sell-toggle-container-style">
      <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setBuysellToggleButton("buy") }}>Buy</button>
      <button type="button" className="chart-page-new-design-right-sell-togle-active-button-style" onClick={() => { setBuysellToggleButton("sell") }}>Sell</button>
    </div>}


    {buysellToggleButton === "buy" && <div className="chart-page-new-design-toggle-button-below-three-tab-container-style">
      <span className="chart-page-new-design-right-colum-toggle-below-tab-bar-item-active-text-style">Market</span>
      <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Limit</span>
      <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Stop-limit</span>
    </div>}

    {buysellToggleButton === "sell" && <div className="chart-page-new-design-toggle-button-below-three-tab-container-style">
      <span className="chart-page-new-design-right-colum-toggle-below-tab-sell-mobile-view-bar-item-active-text-style">Market</span>
      <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Limit</span>
      <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Stop-limit</span>
    </div>}


    <div className="chart-page-new-design-right-colum-tab-below-card-value-container-style">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet" viewBox="0 0 16 16">
        <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
      </svg>
      <span className="span-font-size-12px">45,486.00 USDT</span>
    </div>

    <div className="chart-page-new-design-right-price-from-container-style">
      <span className="span-font-size-12px">Price</span>
      <div className="chart-page-new-design-right-price-wallet-dropdown-container-style">
        <div>
          <div className="align-center-just-center-style">
            <img src={USDT_icon} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="chart-page-new-design-right-colum-price-wallet-logo-side-text-input-item-style-nn2">USDT</div>
          </div>
        </div>
        <div>
          <span>45,486</span>
        </div>
      </div>
    </div>

    <div className="chart-page-new-design-right-price-from-container-style">
      <span className="span-font-size-12px">Amount</span>
      <div className="chart-page-new-design-right-price-wallet-dropdown-container-style">
        <div>
          <div className="align-center-just-center-style">
            <img src={windy_icon} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="chart-page-new-design-right-colum-price-wallet-logo-side-text-input-item-style-nn2">WINDY</div>
          </div>
        </div>
        <div>
          <span>1,000.00</span>
        </div>
      </div>
    </div>

    <div className="chart-page-new-design-right-colum-20-percent-divide-line-container-style">
      <span className="span-font-size-12px">{value} %</span>
      <span>&nbsp;</span>

      {/* {buysellToggleButton === "buy" && <Slider
        defaultValue={value}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={handleChange}
      />} */}

      {buysellToggleButton === "buy" && <BuyPercentSlider
        marks={marks}
        valueLabelDisplay="auto"
        aria-labelledby="discrete-slider-restrict"
        onChange={handleChange}
        defaultValue={value}
      />}

      {buysellToggleButton === "sell" && <SellPercentSlider
        marks={marks}
        valueLabelDisplay="auto"
        aria-labelledby="discrete-slider-restrict"
        onChange={handleChange}
        defaultValue={value}
      />}

    </div>

    <div className="chart-page-new-design-right-price-from-container-style">
      <span className="span-font-size-12px">Total</span>
      <div className="chart-page-new-design-right-price-wallet-dropdown-container-style">
        <div>
          <div className="align-center-just-center-style">
            <img src={USDT_icon} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="chart-page-new-design-right-colum-price-wallet-logo-side-text-input-item-style-nn2">USDT</div>
          </div>
        </div>
        <div>
          <span>45,486.00</span>
        </div>
      </div>
    </div>

    {buysellToggleButton === "buy" && <div className="chart-page-new-design-right-colum-buy-windy-button-container-style">
      <button type="button" className="chart-bottom-buy-card-button-item-style">Buy WINDY</button>
    </div>}

    {buysellToggleButton === "sell" && <div className="chart-page-new-design-right-colum-buy-windy-button-container-style">
      <button type="button" className="chart-bottom-sell-windy-card-button-item-style">Sell WINDY</button>
    </div>}



    <div className="chart-page-new-design-right-colum-asstes-wallet-container-style">
      <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
        <span className="chart-page-new-design-right-colum-asstes-text-style">Assets</span>
        <span className="span-font-size-12px">Buy with AUD</span>
      </div>

      <div className="chart-page-mobile-view-wallet-asstes-scroll-container-style">
        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={USDT_icon} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">USDT</div>
          </div>
          <span className="span-font-size-12px">9.907</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={bnb_logo} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">BNB</div>
          </div>
          <span className="span-font-size-12px">304.315</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={doge_logo} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">DOGE</div>
          </div>
          <span className="span-font-size-12px">34.045</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={dot_logo} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">DOT</div>
          </div>
          <span className="span-font-size-12px">62.051</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={windy_icon} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">WINDY</div>
          </div>
          <span className="span-font-size-12px">1,798,873,070,993</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={USDT_icon} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">USDT</div>
          </div>
          <span className="span-font-size-12px">412.982</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={atom_logo} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">ATOM</div>
          </div>
          <span className="span-font-size-12px">6,798</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={avax_logo} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">AVAX</div>
          </div>
          <span className="span-font-size-12px">98</span>
        </div>

        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
            <img src={dash_logo} alt="Cinque Terre" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" />
            <div className="span-font-size-12px">DASH</div>
          </div>
          <span className="span-font-size-12px">87</span>
        </div>
      </div>
    </div>

    <div className="chart-page-mobile-view-place-new-buttons-contaier-style">
      <button type="button" className="chart-page-mobile-view-deposit-button-style-here">Deposit</button>
      <button type="button" className="chart-page-mobile-view-deposit-button-style-here">Withdraw</button>
    </div>




  </div>)
}

export default RightChartContainerMobileVersion
