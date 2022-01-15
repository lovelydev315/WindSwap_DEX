import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Grid } from '@material-ui/core';
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import axios from "axios";
import ChartHeader from 'components/Chart/ChartHeader';
import LeftChartContainer from 'components/Chart/LeftChartContainer';
import RightChartContainer from 'components/Chart/RightChartContainer';
import BottomCenterChartContainer from 'components/Chart/BottomCenterChartContainer';
import BottomCenterChartContainerLightMode from 'components/Chart/BottomCenterChartContainerLightMode';
// import RightChartContainerBelowCoinAssetes from 'components/Chart/RightChartContainerBelowCoinAssetes';

// import NewTransactionList from "components/Chart/NewTransactionList";

import RightChartContainerMobileVersion from 'components/Chart/RightChartContainerMobileVersion';
import Swap from "pages/Swap"

const props = {
  name:"WindSwap",address:"0xd1587ee50e0333f0c4adcf261379a61b1486c5d2",symbol:"WINDY"
}

const Chart = () => {

  useEffect(() => {
    sessionStorage.clear();
    sessionStorage.setItem("search_token_name", props.name);
    sessionStorage.setItem("search_token_symbol", props.symbol);
    sessionStorage.setItem("search_token", props.address);
  },[])

  const [pageToggleButton, setPageToggleButton] = useState("Chart");
  const Wrapper = styled.div`
    width: 100%;
  `
  const { isDark, toggleTheme } = useTheme()

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

  return (<>
    {isDark === true && <div className="chart-page-three-colum-top-container-style-new-3">
      <ChartHeader {...props} />
      <Grid container
        justify="space-between"
        spacing={3}
        style={{ marginTop: 5 }}>
        <Grid item lg={3} sm={3} xl={3} xs={12}>
          <div className="chart-page-side-part-container-style new-chart-mobile-view-design-laptop-layout-show">
            <LeftChartContainer {...props} />
          </div>
        </Grid>

        {pageToggleButton === "Chart" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <Wrapper id="tv_chart_container" />
          <BottomCenterChartContainer {...props}/>
          {/* <NewTransactionList /> */}
        </Grid>}

        {pageToggleButton === "PlaceOrder" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <RightChartContainerMobileVersion />
          {/* <Swap /> */}
          {/* <RightChartContainerBelowCoinAssetes /> */}
        </Grid>}

        {pageToggleButton === "Liquidity" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <div className="chart-page-side-part-container-style">
            <LeftChartContainer {...props} />
          </div>
        </Grid>}

        <Grid item lg={3} sm={3} xl={3} xs={12} className="new-chart-mobile-view-design-laptop-layout-show" >
          <RightChartContainer />
          {/* <Swap /> */}
          {/* <RightChartContainerBelowCoinAssetes /> */}
        </Grid>
      </Grid>
    </div>}

    {isDark === false && <div className="chart-page-three-colum-top-container-style-new-3-light-mode">
      <ChartHeader {...props} />
      <Grid container
        justify="space-between"
        spacing={3}
        style={{ marginTop: 5 }}>
        <Grid item lg={3} sm={3} xl={3} xs={12}>
          <div className="chart-page-side-part-container-style-light-mode new-chart-mobile-view-design-laptop-layout-show">
            <LeftChartContainer {...props} />
          </div>
        </Grid>

        {pageToggleButton === "Chart" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here-light-mode">
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <Wrapper id="tv_chart_container" />
          <BottomCenterChartContainerLightMode {...props} />
          {/* <NewTransactionList /> */}
        </Grid>}

        {pageToggleButton === "PlaceOrder" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here-light-mode">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <RightChartContainerMobileVersion />
          {/* <Swap /> */}
          {/* <RightChartContainerBelowCoinAssetes /> */}
        </Grid>}

        {pageToggleButton === "Liquidity" && <Grid item lg={6} sm={6} xl={6} xs={12}>
          <div className="chart-mobile-version-top-toggle-button-container-here-light-mode">
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("Chart") }}>Chart</button>
            <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { setPageToggleButton("PlaceOrder") }}>Place Order</button>
            <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { setPageToggleButton("Liquidity") }}>Liquidity</button>
          </div>
          <div className="chart-page-side-part-container-style-light-mode">
            <LeftChartContainer {...props} />
          </div>
        </Grid>}

        <Grid item lg={3} sm={3} xl={3} xs={12} className="new-chart-mobile-view-design-laptop-layout-show" >
          <RightChartContainer />
          {/* <Swap /> */}
          {/* <RightChartContainerBelowCoinAssetes /> */}
        </Grid>
      </Grid>
    </div>}
  </>)
}
export default Chart
