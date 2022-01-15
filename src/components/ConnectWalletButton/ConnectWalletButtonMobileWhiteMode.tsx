import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { UserBlock as User, Button, ButtonProps, ConnectorId, useWalletModal } from '@pancakeswap-libs/uikit'
import { injected, bsc, walletconnect } from 'connectors'
import useI18n from 'hooks/useI18n'

const StyledButton = styled(Button)`
  background-color: rgba(20, 60, 110, 0.44);
  color: rgb(110, 168, 254);
`

const ConnectWalletButtonMobileWhiteMode: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { account, activate, deactivate } = useWeb3React()

  const handleLogin = (connectorId: ConnectorId) => {
    if (connectorId === 'walletconnect') {
      return activate(walletconnect)
    }
    return activate(injected)
  }

  const { onPresentConnectModal } = useWalletModal(handleLogin, deactivate, account as string)

  return (
    <div className="mobile-view-hidden-top-address-connect-button">
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

      {/* <Button className="white-mode-wallet-button-style" onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Connect to a Wallet')}
    </Button> */}
    </div>
  )
}

export default ConnectWalletButtonMobileWhiteMode
