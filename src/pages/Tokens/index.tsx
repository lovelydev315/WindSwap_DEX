import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";
import { Grid } from '@material-ui/core';
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import axios from "axios";
import ChartHeader from 'components/Chart/ChartHeader';
import LeftChartContainer from 'components/Chart/LeftChartContainer';
import RightChartContainer from 'components/Chart/RightChartContainer';
import BottomCenterChartContainer from 'components/Chart/BottomCenterChartContainer';
import BottomCenterChartContainerLightMode from 'components/Chart/BottomCenterChartContainerLightMode';
// import RightChartContainerBelowCoinAssetes from 'components/Tokens/RightChartContainerBelowCoinAssetes';

import RightChartContainerMobileVersion from 'components/Chart/RightChartContainerMobileVersion';
// import Swap from "pages/Swap"

const BaseUrl = "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://localhost:5000"; // "http://168.119.111.227:3007";

const Tokens = (props: string) => {

  const [childProps, setChildProps] = useState({ name:"WindSwap",address:"0xd1587ee50e0333f0c4adcf261379a61b1486c5d2",symbol:"WINDY" });

  const _props = props;
  let _path = JSON.parse(JSON.stringify(_props));
  _path = _path.location.pathname;
  let tokenAddress = _path.split("/");
  tokenAddress = tokenAddress[tokenAddress.length - 1];

  const [pageToggleButton, setPageToggleButton] = useState("Chart");
  const Wrapper = styled.div`
    width: 100%;
  `
  const { isDark, toggleTheme } = useTheme();
  // let { token } = useParams();

  let event // The custom event that will be created
  if (document.createEvent) {
    event = document.createEvent('HTMLEvents')
    if(isDark) {
      event.initEvent('makeChart', true, true)
      event.eventName = 'makeChart'
      window.dispatchEvent(event)
    }
    else {
      event.initEvent('makeChart_light_mode', true, true)
      event.eventName = 'makeChart_light_mode'
      window.dispatchEvent(event)
    }
  }

  useEffect(() => {
    searchToken(tokenAddress);
  }, [tokenAddress])

  function searchToken(index) {
    axios.post(`${BaseUrl}/api/v1/search_token`, { "index": index }).then((res) => {
      if(res.data.status === 200) {
        let tokenList = res.data.data;
        if(tokenList.length) {
          tokenList = tokenList[tokenList.length - 1];
          sessionStorage.clear();
          sessionStorage.setItem("search_token_name", tokenList.name);
          sessionStorage.setItem("search_token_symbol", tokenList.symbol);
          sessionStorage.setItem("search_token", tokenList.address);
          setChildProps(tokenList);
        }
      }
    });
  }
  return (<>
    {isDark === true && <div className="chart-page-three-colum-top-container-style-new-3">
      <ChartHeader {...childProps} />
      <Grid container
        justify="space-between"
        spacing={3}
        style={{ marginTop: 5 }}>
        <Grid item lg={3} sm={3} xl={3} xs={12}>
          <div className="chart-page-side-part-container-style new-chart-mobile-view-design-laptop-layout-show">
            <LeftChartContainer {...childProps} />
          </div>
        </Grid>

        {pageToggleButton === "Chart" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <Wrapper id="tv_chart_container" />
          <BottomCenterChartContainer {...childProps} />
        </Grid>}

        {pageToggleButton === "PlaceOrder" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <RightChartContainerMobileVersion />
          {/* <Swap /> */}
          {/* <RightChartContainerMobileVersion /> */}
        </Grid>}

        {pageToggleButton === "Liquidity" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <div className="chart-page-side-part-container-style">
            <LeftChartContainer {...childProps} />
          </div>
        </Grid>}

        <Grid item lg={3} sm={3} xl={3} xs={12} className="new-chart-mobile-view-design-laptop-layout-show" >
          <RightChartContainer />
          {/* <Swap /> */}
        </Grid>
      </Grid>
    </div>}

    {isDark === false && <div className="chart-page-three-colum-top-container-style-new-3-light-mode">
      <ChartHeader {...childProps} />
      <div className="token-page-token-top-place-container-style">
        <div className="new-chartpage-text-small-style token-page-token-name-symbol-text-style-light-mode">
          {sessionStorage.getItem("search_token_name")}  ( {sessionStorage.getItem("search_token_symbol")} )
        </div>
        <div className="new-chart-page-value-text-style-windy-price">{sessionStorage.getItem("search_token")}</div>
      </div>
      <Grid container
        justify="space-between"
        spacing={3}
        style={{ marginTop: 5 }}>
        <Grid item lg={3} sm={3} xl={3} xs={12}>
          <div className="chart-page-side-part-container-style-light-mode new-chart-mobile-view-design-laptop-layout-show">
            <LeftChartContainer {...childProps} />
          </div>
        </Grid>

        {pageToggleButton === "Chart" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <Wrapper id="tv_chart_container" />
          <BottomCenterChartContainerLightMode {...childProps} />
        </Grid>}

        {pageToggleButton === "PlaceOrder" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          {/* <Swap /> */}
          <RightChartContainerMobileVersion />
        </Grid>}

        {pageToggleButton === "Liquidity" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <div className="chart-page-side-part-container-style-light-mode">
            <LeftChartContainer {...childProps} />
          </div>
        </Grid>}

        <Grid item lg={3} sm={3} xl={3} xs={12} className="new-chart-mobile-view-design-laptop-layout-show" >
          <RightChartContainer />
          {/* <Swap /> */}
        </Grid>
      </Grid>
    </div>}
  </>)
}
export default Tokens
