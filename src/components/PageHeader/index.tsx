import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex, Image, useModal } from '@pancakeswap-libs/uikit'
// import { Heading, IconButton, Text, Flex, Image, useModal, CustomHeading } from '@pancakeswap-libs/uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  setting: boolean
}

const StyledPageHeader = styled.div`
  padding: 24px;
  padding-bottom: 0px;
`

const StyledPageHeaderLightMode = styled.div`
  padding: 24px;
  padding-bottom: 0px;
  background:white;
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
`

const PageHeader = ({ title, description, children, setting = true }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const [onPresentSettings] = useModal(<SettingsModal translateString={TranslateString} />)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal />)
  const { isDark, toggleTheme } = useTheme()

  return (<>
    {isDark === true && <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <StyledHeading mb="8px">{title}</StyledHeading>
        </Details>
        {setting && (
          <StyledIconButton variant="primary" onClick={onPresentSettings} title="Settings">
            <Image src="/images/Settings.png" alt="Settings" width={28} height={28} />
          </StyledIconButton>
        )}
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>}

    {isDark === false && <StyledPageHeaderLightMode>
      <Flex alignItems="center">
        <Details>
          <StyledHeading mb="8px" style={{ color: "black" }}>{title}</StyledHeading>
        </Details>
        {setting && (
          <StyledIconButton variant="primary" onClick={onPresentSettings} title="Settings">
            <Image src="/images/Settings.png" alt="Settings" width={28} height={28} />
          </StyledIconButton>
        )}
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeaderLightMode>}
  </>)
}

export default PageHeader
