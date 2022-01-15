import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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

const RightChartContainerBelowCoinAssetes = (props) => {

  const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504");
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<div className="chart-page-new-design-right-colum-top-conatiner-style-here2">
    <div className="chart-page-new-design-right-colum-asstes-wallet-container-style">
      <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
        <span className="chart-page-new-design-right-colum-asstes-text-style">Assets</span>
        <span className="span-font-size-12px">Buy with AUD</span>
      </div>

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




  </div>)
}

export default RightChartContainerBelowCoinAssetes
