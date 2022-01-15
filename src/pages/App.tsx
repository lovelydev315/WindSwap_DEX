import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
// import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { Flex, Image } from '@pancakeswap-libs/uikit'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './AddLiquidity/redirects'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
// import Farm from './Farm'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
// import Price from './Price'
import Chart from './Chart'
import Tokens from './Tokens'

import RugChecker from './RugChecker'
import Menu from '../components/Menu'
import UserBlock from '../components/UserBlock'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  min-height: calc(100vh - 152px);
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const TopRightFlex = styled(Flex)`
  position: absolute;
  right: 20px;
  top: 0px;

  ${({ theme }) => theme.mediaQueries.maxsm} {
    bottom: 0px;
    left: 20px;
    top: unset;
`

interface tokenObject {
  name: string,
  symbol: string,
  address: string
}

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  // const [selectedToken, setSelectedToken] = useState<tokenObject>({name:"WindSwap", address:"0xd1587ee50e0333f0c4adcf261379a61b1486c5d2",symbol:"WINDY"});

  // const selectedTokenProps = {
  //   selectedToken,
  //   changeSelectedToken: setSelectedToken
  // }
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Menu />
        {/* <TopRightFlex>
          <UserBlock />
        </TopRightFlex> */}
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <BodyWrapper>
                <Popups />
                <Web3ReactManager>
                  <Switch>
                    <Route path="/chart" component={Chart} />
                    <Route path="/tokens/:token" component={Tokens} />
                    <Route path="/swap" component={Swap} />
                    <Route path="/rug" component={RugChecker} />
                    <Route path="/rug/:address" component={RugChecker} />
                    <Route path="/swap/:outputCurrency" component={RedirectToSwap} />
                    <Route path="/send" component={RedirectPathToSwapOnly} />
                    <Route path="/find" component={PoolFinder} />
                    <Route exact path="/pool" component={Pool} />
                    <Route path="/create" component={RedirectToAddLiquidity} />
                    <Route exact path="/add" component={AddLiquidity} />
                    <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route path="/remove/v1/:address" component={RemoveV1Exchange} />
                    <Route path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                    <Route path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                    <Route path="/migrate/v1" component={MigrateV1} />
                    <Route path="/migrate/v1/:address" component={MigrateV1Exchange} />
                    <Route component={RedirectPathToSwapOnly} />
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
