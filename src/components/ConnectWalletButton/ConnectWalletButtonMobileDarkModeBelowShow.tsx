import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { UserBlock, Button, ButtonProps, ConnectorId, useWalletModal } from '@pancakeswap-libs/uikit'
import { injected, bsc, walletconnect } from 'connectors'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'

const StyledButton = styled(Button)`
  background-color: rgba(20, 60, 110, 0.44);
  color: rgb(110, 168, 254);
`

const ConnectWalletButtonMobileDarkModeBelowShow: React.FC<ButtonProps> = (props) => {
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
    <UserBlock
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
      <svg style={{ color: "rgb(254, 191, 50)" }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
      </svg>
    </button>

    {/* <Button style={{ marginRight: "10px" }} onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Select Version')}
    </Button> */}
    </div>
  )
}

export default ConnectWalletButtonMobileDarkModeBelowShow
