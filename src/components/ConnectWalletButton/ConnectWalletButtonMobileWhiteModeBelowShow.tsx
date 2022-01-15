import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { UserBlock as User, Button, ButtonProps, ConnectorId, useWalletModal } from '@pancakeswap-libs/uikit'
import { injected, bsc, walletconnect } from 'connectors'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'

const StyledButton = styled(Button)`
  background-color: rgba(20, 60, 110, 0.44);
  color: rgb(110, 168, 254);
`

const ConnectWalletButtonMobileWhiteModeBelowShow: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { account, activate, deactivate } = useWeb3React()
  const { isDark, toggleTheme } = useTheme()

  const handleLogin = (connectorId: ConnectorId) => {
    if (connectorId === 'walletconnect') {
      return activate(walletconnect)
    }
    return activate(injected)
  }

  useEffect(() => {
    sessionStorage.setItem("isDark", isDark.toString());
  })

  const { onPresentConnectModal } = useWalletModal(handleLogin, deactivate, account as string)

  return (<div style={{display: "flex", alignItems: "center"}}>
    <User
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
    />
    <button type="button" className="white-mode-dark-change-button-style" style={{marginTop: "-15px", marginRight: 0}} onClick={toggleTheme}>
      <svg style={{ color: 'gray' }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
      </svg>
    </button>
    {/* <Button className="white-mode-wallet-button-below-show-style" onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Select Version')}
    </Button> */}
    </div>
  )
}

export default ConnectWalletButtonMobileWhiteModeBelowShow
