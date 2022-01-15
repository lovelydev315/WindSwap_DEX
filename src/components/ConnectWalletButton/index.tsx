import React from 'react'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { Button, ButtonProps, ConnectorId, useWalletModal } from '@pancakeswap-libs/uikit'
import { injected, walletconnect } from 'connectors'
import useI18n from 'hooks/useI18n'

const StyledButton = styled(Button)`
  background-color: rgba(20, 60, 110, 0.44);
  &:active {
    background: rgba(20, 60, 110, 0.44);
  }

  &:hover {
    background: rgba(20, 60, 110, 0.44) !important;
    background-color: rgba(20, 60, 110, 0.44) !important;
  }
`
const StyledLightButton = styled(Button)`
  background-color: rgba(20, 60, 110, 0.44);
  background: #0040bd;
  color:white;

  &:active {
    background: #0040bd;
  }

  &:hover {
    background: #0040bd !important;
    background-color: #0040bd !important;
  }
`

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { account, activate, deactivate } = useWeb3React()
  const { isDark, toggleTheme } = useTheme()

  const handleLogin = (connectorId: ConnectorId) => {
    if (connectorId === 'walletconnect') {
      return activate(walletconnect)
    }
    return activate(injected)
  }

  const { onPresentConnectModal } = useWalletModal(handleLogin, deactivate, account as string)

  return (<>
    {isDark === true && <StyledButton onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </StyledButton>}

    {isDark === false && <StyledLightButton onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </StyledLightButton>}
  </>

  )
}

export default UnlockButton
