import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import styled, { ThemeContext } from 'styled-components'
import CardNav from 'components/CardNav'
import RugCheckerItem from 'components/RugCheckerItem'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import PageHeader from 'components/PageHeader'
import useTheme from 'hooks/useTheme'
import AppBody from '../AppBody'
import { isAddress } from '../../utils'
import config from './config'

const CheckerArea = styled.div`
  margin: auto;
  width: 100%;
`

const SwapCard = styled.div`
  background: #191b1f;
`

const Card = styled.div`
  width: 100%;
  border: 1px solid #2a2d3c;
  margin-bottom: 10px;
`

const CardHeader = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #2a2d3c;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: Poppins;
`

const CardContent = styled.div`
  width: 100%;
  padding: 15px;
`

interface ReportProps {
  tokenAddress: string
}

interface RugInfo {
  token_score: number
  social_score: number
  critical_count: number
  warning_count: number
  social_count: number
  messages: {
    critical: never[]
    warning: {
      message: string
      tooltip: string
    }[]
  }
  holders_distribution: {
    top10_percentage: number
    top10_contracts: number
    top50_percentage: number
    top50_contracts: number
    top100_percentage: number
    top100_contracts: number
  }
  tokenName: string
  symbol: string
  decimals: string
  price: string
  blueCheckmark: string
  description: string
  socials: {
    website: string
    email: string
    blog: string
    reddit: string
    slack: string
    facebook: string
    twitter: string
    bitcointalk: string
    github: string
    telegram: string
    wechat: string
    linkedin: string
    discord: string
    whitepaper: string
  }
  ownership_renounced: boolean
  mintable: boolean
  lp_balance_v1: number
  lp_balance_v2: number
}

const Report = ({ tokenAddress }: ReportProps) => {
  const [rug, setRug] = useState<RugInfo>(config)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const checkToken = async () => {
      const api = 'https://rugchecker.windswap.finance/rug/'.concat(tokenAddress)

      console.log('pooh, token address = ', api)

      try {
        const response = await fetch(api)
        const res = await response.json()
        setRug(res)
        console.log('pooh, data = ', res)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    checkToken()
  }, [tokenAddress])

  const title = 'Report - $'.concat(rug.symbol)

  return (
    <CheckerArea>
      <CardNav />
      {/* <AppBody> */}
        <SwapCard>
          <PageHeader title={title} description="Token Info Checker" setting={false} />

          {isDark === true && <CardBody>
            <Card>
              <CardHeader>Scores</CardHeader>
              <CardContent>
                <RugCheckerItem title="Token Score" description={rug.token_score} linebreak={false} />
                <RugCheckerItem title="Social Score" description={rug.social_score} linebreak={false} />
                <RugCheckerItem title="Critical Count" description={rug.critical_count} linebreak={false} />
                <RugCheckerItem title="Warning Count" description={rug.warning_count} linebreak={false} />
                <RugCheckerItem title="Social Count" description={rug.social_count} linebreak={false} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Holders Distribution</CardHeader>
              <CardContent>
                <RugCheckerItem
                  title="Top10 Percentage"
                  description={rug.holders_distribution.top10_percentage}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top10 Contracts"
                  description={rug.holders_distribution.top10_contracts}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top50 Percentage"
                  description={rug.holders_distribution.top50_percentage}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top50 Contracts"
                  description={rug.holders_distribution.top100_percentage}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top100 Percentage"
                  description={rug.holders_distribution.top100_contracts}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top100 Contracts"
                  description={rug.holders_distribution.top10_percentage}
                  linebreak={false}
                />
                <RugCheckerItem title="TokenName" description={rug.tokenName} linebreak={false} />
                <RugCheckerItem title="Symbol" description={rug.symbol} linebreak={false} />
                <RugCheckerItem title="Decimals" description={rug.decimals} linebreak={false} />
                <RugCheckerItem title="Price" description={rug.price} linebreak={false} />
                <RugCheckerItem title="BlueCheckmark" description={rug.blueCheckmark} linebreak={false} />
                <RugCheckerItem title="Ownership Renounced" description={rug.ownership_renounced} linebreak={false} />
                <RugCheckerItem title="Mintable" description={rug.mintable} linebreak={false} />
                <RugCheckerItem title="Lp Balance V1" description={rug.lp_balance_v1} linebreak={false} />
                <RugCheckerItem title="Lp Balance V2" description={rug.lp_balance_v2} linebreak={false} />
                <RugCheckerItem title="Description" description={rug.description} linebreak={false} />
                <RugCheckerItem title="Disclaimer" description={rug.token_score} linebreak={false} />
                <RugCheckerItem title="Decimals" description={rug.decimals} linebreak={false} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Messages</CardHeader>
              <CardContent>
                <RugCheckerItem title="" description={rug.messages.warning[0].message} linebreak={false} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Socials</CardHeader>
              <CardContent>
                <RugCheckerItem title="Website" description={rug.socials.website} linebreak={false} />
                <RugCheckerItem title="Email" description={rug.socials.email} linebreak={false} />
                <RugCheckerItem title="Blog" description={rug.socials.blog} linebreak={false} />
                <RugCheckerItem title="Reddit" description={rug.socials.reddit} linebreak={false} />
                <RugCheckerItem title="Slack" description={rug.socials.slack} linebreak={false} />
                <RugCheckerItem title="Facebook" description={rug.socials.facebook} linebreak={false} />
                <RugCheckerItem title="Twitter" description={rug.socials.twitter} linebreak={false} />
                <RugCheckerItem title="Bitcointalk" description={rug.socials.bitcointalk} linebreak={false} />
                <RugCheckerItem title="Github" description={rug.socials.github} linebreak={false} />
                <RugCheckerItem title="Telegram" description={rug.socials.telegram} linebreak={false} />
                <RugCheckerItem title="Wechat" description={rug.socials.wechat} linebreak={false} />
                <RugCheckerItem title="Linkedin" description={rug.socials.linkedin} linebreak={false} />
                <RugCheckerItem title="Discord" description={rug.socials.discord} linebreak={false} />
                <RugCheckerItem title="Whitepaper" description={rug.socials.whitepaper} linebreak={false} />
              </CardContent>
            </Card>
          </CardBody>}

          {isDark === false && <CardBody style={{ background: "white" }}>
            <Card>
              <CardHeader>Scores</CardHeader>
              <CardContent>
                <RugCheckerItem title="Token Score" description={rug.token_score} linebreak={false} />
                <RugCheckerItem title="Social Score" description={rug.social_score} linebreak={false} />
                <RugCheckerItem title="Critical Count" description={rug.critical_count} linebreak={false} />
                <RugCheckerItem title="Warning Count" description={rug.warning_count} linebreak={false} />
                <RugCheckerItem title="Social Count" description={rug.social_count} linebreak={false} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Holders Distribution</CardHeader>
              <CardContent>
                <RugCheckerItem
                  title="Top10 Percentage"
                  description={rug.holders_distribution.top10_percentage}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top10 Contracts"
                  description={rug.holders_distribution.top10_contracts}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top50 Percentage"
                  description={rug.holders_distribution.top50_percentage}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top50 Contracts"
                  description={rug.holders_distribution.top100_percentage}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top100 Percentage"
                  description={rug.holders_distribution.top100_contracts}
                  linebreak={false}
                />
                <RugCheckerItem
                  title="Top100 Contracts"
                  description={rug.holders_distribution.top10_percentage}
                  linebreak={false}
                />
                <RugCheckerItem title="TokenName" description={rug.tokenName} linebreak={false} />
                <RugCheckerItem title="Symbol" description={rug.symbol} linebreak={false} />
                <RugCheckerItem title="Decimals" description={rug.decimals} linebreak={false} />
                <RugCheckerItem title="Price" description={rug.price} linebreak={false} />
                <RugCheckerItem title="BlueCheckmark" description={rug.blueCheckmark} linebreak={false} />
                <RugCheckerItem title="Ownership Renounced" description={rug.ownership_renounced} linebreak={false} />
                <RugCheckerItem title="Mintable" description={rug.mintable} linebreak={false} />
                <RugCheckerItem title="Lp Balance V1" description={rug.lp_balance_v1} linebreak={false} />
                <RugCheckerItem title="Lp Balance V2" description={rug.lp_balance_v2} linebreak={false} />
                <RugCheckerItem title="Description" description={rug.description} linebreak={false} />
                <RugCheckerItem title="Disclaimer" description={rug.token_score} linebreak={false} />
                <RugCheckerItem title="Decimals" description={rug.decimals} linebreak={false} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Messages</CardHeader>
              <CardContent>
                <RugCheckerItem title="" description={rug.messages.warning[0].message} linebreak={false} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Socials</CardHeader>
              <CardContent>
                <RugCheckerItem title="Website" description={rug.socials.website} linebreak={false} />
                <RugCheckerItem title="Email" description={rug.socials.email} linebreak={false} />
                <RugCheckerItem title="Blog" description={rug.socials.blog} linebreak={false} />
                <RugCheckerItem title="Reddit" description={rug.socials.reddit} linebreak={false} />
                <RugCheckerItem title="Slack" description={rug.socials.slack} linebreak={false} />
                <RugCheckerItem title="Facebook" description={rug.socials.facebook} linebreak={false} />
                <RugCheckerItem title="Twitter" description={rug.socials.twitter} linebreak={false} />
                <RugCheckerItem title="Bitcointalk" description={rug.socials.bitcointalk} linebreak={false} />
                <RugCheckerItem title="Github" description={rug.socials.github} linebreak={false} />
                <RugCheckerItem title="Telegram" description={rug.socials.telegram} linebreak={false} />
                <RugCheckerItem title="Wechat" description={rug.socials.wechat} linebreak={false} />
                <RugCheckerItem title="Linkedin" description={rug.socials.linkedin} linebreak={false} />
                <RugCheckerItem title="Discord" description={rug.socials.discord} linebreak={false} />
                <RugCheckerItem title="Whitepaper" description={rug.socials.whitepaper} linebreak={false} />
              </CardContent>
            </Card>
          </CardBody>}

        </SwapCard>
      {/* </AppBody> */}
    </CheckerArea>
  )
}

export default Report
