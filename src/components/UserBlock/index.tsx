import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { UserBlock as User, Button, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { injected, bsc, walletconnect } from 'connectors'
import useTheme from 'hooks/useTheme'
import ConnectWalletButtonMobileWhiteModeBelowShow from 'components/ConnectWalletButton/ConnectWalletButtonMobileWhiteModeBelowShow'
import ConnectWalletButtonMobileDarkModeBelowShow from 'components/ConnectWalletButton/ConnectWalletButtonMobileDarkModeBelowShow'

const UserBlock: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { isDark, toggleTheme } = useTheme()
  useEffect(() => {
    console.log("user block swap here: ", isDark)
  })

  return (<>
    {/* <User
      account={account as string}
      login={(connectorId: ConnectorId) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      active={0}
    /> */}

    {isDark === true && <div style={{marginTop: "10px"}}
      // className="white-mode-wallet-dark-button-container-style"
      className="dark-mode-below-button-group-container-snew-style"
    >
      <ConnectWalletButtonMobileDarkModeBelowShow
      //  className="dark-mode-header-button-mobile-hide-style"
      />
      {/* <Button 
      // className="top-header-version-button-style-new" 
      onClick={() => {
        window.location.href = "https://app.windswap.finance/#/";
      }}> V1  </Button>
      <Button 
      className="below-v2-top-header-version-button-style-new-v2"
       onClick={() => {
        window.location.href = "https://v2app.windswap.finance/#/";
      }}> V2  </Button> */}
    </div>}


    {isDark === false && <div style={{marginTop: "10px"}}
      className="light-mode-below-button-group-container-style"
    >
      <ConnectWalletButtonMobileWhiteModeBelowShow />
      {/* <Button
        className="white-mode-wallet-button-below-show-style"
        onClick={() => {
          window.location.href = "https://app.windswap.finance/#/";
        }}> V1  </Button>
      <Button
        className="white-mode-wallet-button-below-show-style"
        onClick={() => {
          window.location.href = "https://v2app.windswap.finance/#/";
        }}> V2  </Button> */}
    </div>}
  </>)
}

export default UserBlock
