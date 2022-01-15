/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu as UikitMenu, Button, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'

import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import links from './config'

import App_logo from "../../assets/images/new_WindLogo.webp";
import App_logo_light from "../../assets/images/new_WindLogo_light.webp";
import Mobile_App_logo from "../../assets/images/new_MobileWindLogo.webp";

import BottomWalletButton from 'components/BottomWalletButton'
import ConnectWalletButtonMobileWhiteMode from 'components/ConnectWalletButton/ConnectWalletButtonMobileWhiteMode'
import ConnectWalletButtonMobile from 'components/ConnectWalletButton/ConnectWalletButtonMobile'
import MenuIcon from '@material-ui/icons/Menu';

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const pirceData = useGetPriceData()
  const windPriceUSD = pirceData ? Number(pirceData) : undefined
  const [openMenu, setOpenMenu] = useState(false)

  console.log('pooh token price = ', windPriceUSD)

  const profile = {
    profileLink: '',
    noProfileLink: '',
    username: 'Wind',
    image: '/images/wind/Profile.png',
  }

  useEffect(() => {
    console.log("log: ", isDark, pirceData)
    console.log("toggleTheme: ", toggleTheme);
    sessionStorage.setItem("isDark", isDark.toString());
  })

  return (
    <div
    // className="swap-new-menu-container-style"
    >

      {isDark == true && <div className="dark-mode-new-menu-for-all-device-container-style">
        <a href="https://app.windswap.finance/#/">
          <img src={App_logo} alt="app logo" className="laptop-app-logo" />
          <img src={Mobile_App_logo} alt="mobile app logo" className="mobile-app-logo" />
        </a>

        <div className="white-mode-header-new-menu-container-style chart-header-center-search-container-style-top-mobile-hidden">
          <Link to="/swap" className="swap-new-menu-link-style">
            <span className="swap-new-menu-link-item-style">Swap</span>
          </Link>
          <Link to="/chart" className="swap-new-menu-link-style">
            <span className="swap-new-menu-link-item-style">Charts</span>
          </Link>
          <Link to="/rug" className="swap-new-menu-link-style">
            <span className="swap-new-menu-link-item-style">Checker</span>
          </Link>
        </div>

        <div className="white-mode-wallet-dark-button-container-style chart-header-center-search-container-style-top-mobile-hidden">
          <ConnectWalletButtonMobile className="dark-mode-header-button-mobile-hide-style" />
          {/* <Button className="top-header-version-button-style-new" onClick={() => {
            window.location.href = "https://app.windswap.finance/#/";
          }}> V1  </Button>
          <Button className="v2-top-header-version-button-style-new-v2" onClick={() => {
            window.location.href = "https://v2app.windswap.finance/#/";
          }}> V2  </Button> */}

          <button className="white-mode-dark-change-button-style" onClick={toggleTheme}>
            <svg style={{ color: "rgb(254, 191, 50)" }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>
          </button>
        </div>
        <div className="new-chart-mobile-view-design-mobile-layout-show">
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
                <Link to="/rug" className="swap-new-menu-link-style" onClick={() => { setOpenMenu(false) }}>
                  <span className="chart-page-mobile-new-design-menu-items-style">Rug Checker</span>
                </Link>
                <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
                <Link to="/swap" className="swap-new-menu-link-style" onClick={() => { setOpenMenu(false) }}>
                  <span className="chart-page-mobile-new-design-menu-items-style">Swap</span>
                </Link>
                <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
                <Link to="/chart" className="swap-new-menu-link-style" onClick={() => { setOpenMenu(false) }}>
                  <span className="chart-page-mobile-new-design-menu-items-style">Dashboard</span>
                </Link>
                <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
              </div>
            </div>
          </div>}
        </div>
      </div>}


      {isDark == false && <div className="swap-new-sub-menu-container-style">
        <a href="https://app.windswap.finance/#/">
          <img src={App_logo} alt="app logo" className="laptop-app-logo" />
          <img src={Mobile_App_logo} alt="mobile app logo" className="mobile-app-logo" />
        </a>

        <div className="white-mode-header-new-menu-container-style chart-header-center-search-container-style-top-mobile-hidden">
          <Link to="/swap" className="swap-new-menu-link-style">
            <span className="swap-new-menu-link-item-style">Swap</span>
          </Link>
          <Link to="/chart" className="swap-new-menu-link-style">
            <span className="swap-new-menu-link-item-style">Charts</span>
          </Link>
          <Link to="/rug" className="swap-new-menu-link-style">
            <span className="swap-new-menu-link-item-style">Checker</span>
          </Link>
        </div>

        <div className="white-mode-wallet-dark-button-container-style chart-header-center-search-container-style-top-mobile-hidden">
          <ConnectWalletButtonMobileWhiteMode />

          <button className="white-mode-dark-change-button-style" onClick={toggleTheme}>
            <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
              <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
            </svg>
          </button>
        </div>
        <div className="new-chart-mobile-view-design-mobile-layout-show">
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
                <Link to="/rug" className="swap-new-menu-link-style" onClick={() => { setOpenMenu(false) }}>
                  <span className="chart-page-mobile-new-design-menu-items-style">Rug Checker</span>
                </Link>
                <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
                <Link to="/swap" className="swap-new-menu-link-style" onClick={() => { setOpenMenu(false) }}>
                  <span className="chart-page-mobile-new-design-menu-items-style">Swap</span>
                </Link>
                <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
                <Link to="/chart" className="swap-new-menu-link-style" onClick={() => { setOpenMenu(false) }}>
                  <span className="chart-page-mobile-new-design-menu-items-style">Dashboard</span>
                </Link>
                <div className="chart-page-new-mobile-design-menu-hr-div-style">&nbsp;</div>
              </div>
            </div>
          </div>}
        </div>
      </div>}

      {/* <div className="swap-fixed-bottom-footer-container">
        <button className="swap-new-connect-wallet-button-style">Connect to a wallet</button>
        <BottomWalletButton />
      </div> */}

    </div>

  )
}

export default Menu
