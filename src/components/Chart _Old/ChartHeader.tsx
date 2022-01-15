import React from 'react'
import useTheme from 'hooks/useTheme'
import ConnectWalletChartHeaderPlace from "components/ConnectWalletButton/ConnectWalletChartHeaderPlace";
import App_logo from "../../assets/images/new_WindLogo.webp";
import Mobile_App_logo from "../../assets/images/new_MobileWindLogo.webp";
import USDT_icon from "../../assets/images/new/USDT_icon.png"
import windy_icon from "../../assets/images/new/windy_icon.webp"
import BSC_LOGO from "../../assets/images/new/BSC_LOGO.png"

function ChartHeader(props) {
  const { isDark, toggleTheme } = useTheme()


  return (<>
    {isDark === true && <div className="chart-page-fixed-header-container-styl-new">
      <a href="https://app.windswap.finance/#/">
        <img src={App_logo} alt="app logo" className="laptop-app-logo" />
        <img src={Mobile_App_logo} alt="mobile app logo" className="mobile-app-logo" />
      </a>

      <div className="pading-some-px-style chart-header-center-search-container-style-top-mobile-hidden">
        <div className="chart-header-center-search-container-style-nng">

          <div className="chart-header-image-drop-down-top-container-style">
            <div className="chart-header-center-drop-icon-container-style">
              <img src={BSC_LOGO} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
              <div className="chart-bottom-image-dropdown-content-desc">BSC</div>
              <div className="right-border-1px-white-line-style">&nbsp;</div>
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
          </div>

          <div className="align-center-just-center-style">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input type="text" className="chart-header-search-input-field-style" placeholder="Click here to search the market or paste the address" />
          </div>

          <div className="align-center-just-center-style">
            <span>$2,932.32</span>
            <div className="chart-header-center-right-percent-style">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
              <span className="chart-price-change-24h-standard-text-under-small-description">8.32%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="chart-header-menu-right-div-contaner-style">
          {/* <span className="chart-header-menu-item-child-style-it">Login</span>
          <span className="chart-header-menu-item-child-style-it">Register</span> */}
          <ConnectWalletChartHeaderPlace />
          <span className="chart-header-menu-setting-icon-container-style-span">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
          </span>
        </div>
      </div>
    </div>}


    {isDark === false && <div className="chart-page-fixed-header-container-styl-new">
      <a href="https://app.windswap.finance/#/">
        <img src={App_logo} alt="app logo" className="laptop-app-logo" />
        <img src={Mobile_App_logo} alt="mobile app logo" className="mobile-app-logo" />
      </a>

      <div className="pading-some-px-style chart-header-center-search-container-style-top-mobile-hidden">
        <div className="chart-header-center-search-container-style-nng">

          <div className="chart-header-image-drop-down-top-container-style">
            <div className="chart-header-center-drop-icon-container-style">
              <img src={BSC_LOGO} alt="Cinque Terre" className="chart-bottom-image-dropdown-content-desc-image-style" />
              <div className="chart-bottom-image-dropdown-content-desc">BSC</div>
              <div className="right-border-1px-white-line-style">&nbsp;</div>
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
          </div>

          <div className="align-center-just-center-style">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input type="text" className="chart-header-search-input-field-style" placeholder="Click here to search the market or paste the address" />
          </div>

          <div className="align-center-just-center-style">
            <span>$2,932.32</span>
            <div className="chart-header-center-right-percent-style">
              <svg style={{ color: "#d95961" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
              <span className="chart-price-change-24h-standard-text-under-small-description">8.32%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="chart-header-menu-right-div-contaner-style">
          {/* <span className="chart-header-menu-item-child-style-it">Login</span>
          <span className="chart-header-menu-item-child-style-it">Register</span> */}
          <ConnectWalletChartHeaderPlace />
          <span className="chart-header-menu-setting-icon-container-style-span">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
          </span>
        </div>
      </div>
    </div>}
  </>)
}

export default ChartHeader