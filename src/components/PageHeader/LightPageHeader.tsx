/*eslint-disable*/
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex, Image, useModal } from '@pancakeswap-libs/uikit'
// import { Heading, IconButton, Text, Flex, Image, useModal, CustomHeading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const StyledPageHeader = styled.div`
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const StyledIconButton = styled(IconButton)`
  box-shadow: none !important;
  background: none !important;
  &:hover {
    opacity: 0.7 !important;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 38px !important;
  font-weight: 300 !important;
  margin-bottom: 0px !important;
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  color: white;
`

const LightPageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentSettings] = useModal(<SettingsModal translateString={TranslateString} />)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal />)

  return (
    <StyledPageHeader 
    className="white-mode-swap-page-header-container-style"
    >
      <Flex alignItems="center">
        <Details>
          <StyledHeading mb="8px">{title}</StyledHeading>
        </Details>
        <StyledIconButton variant="primary" onClick={onPresentSettings} title="Settings">
          <Image src="/images/Settings.png" alt="Settings" width={28} height={28} />
        </StyledIconButton>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default LightPageHeader
