import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Grid } from '@material-ui/core';
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import styled, { ThemeContext } from 'styled-components'
import CardNav from 'components/CardNav'
import PageHeader from 'components/PageHeader'
import HoldersDistribution from "components/RugCheckerItem/HoldersDistribution";
import CircleProgressBarContainer from "components/RugCheckerItem/CircleProgressBarContainer";
import SocialShareIcons from "components/RugCheckerItem/SocialShareIcons";
import RightSwapContainer from "components/RugCheckerItem/RightSwapContainer";

import MobileViewRugChecker from "components/RugCheckerItem/MobileViewRugChecker";
import MobileViewRugCheckerLightMode from "components/RugCheckerItem/MobileViewRugCheckerLightMode";

import useTheme from 'hooks/useTheme'
import AppBody from '../AppBody'
import { isAddress } from '../../utils'
import Report from './Report'

const CheckerArea = styled.div`
  margin: auto;
  width: 100%;
`

const SwapCard = styled.div`
  background: #191b1f;
`

const TokenAddressInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`

const RugChecker = (props: any) => {
  const _props = JSON.parse(JSON.stringify(props));
  const _path = _props.location.pathname;
  let _tokenAddress = _path.split("/");
  _tokenAddress = _tokenAddress[_tokenAddress.length - 1];
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const checksummedAddress = isAddress(_tokenAddress);
    setTokenAddress(checksummedAddress || "");
    if(checksummedAddress) window.setTimeout(() => {
      setCheck(true);
    }, 100)
  }, [_tokenAddress])

  const handleInput = useCallback((event) => {
    // setCheck(false)
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setTokenAddress(checksummedInput || input)
  }, [])

  const checkToken = async () => {
    const api = 'https://rugchecker.windswap.finance/rug/'.concat(tokenAddress)
    try {
      const response = await fetch(api)
      const res = await response.json()
      if (res.error) {
        setCheck(false)
      } else {
        props.history.push(`/rug/${tokenAddress}`)
      }
    } catch (error) {
      console.error('Unable to fetch data:', error)
      setCheck(false)
    }
  }

  // if (check) {
  return (
    <CheckerArea>
      <CardNav />
      {!check && <>
        {isDark === true && <AppBody>
          <SwapCard>
            <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} />
            <CardBody>
              <TokenAddressInput
                type="text"
                id="token-address-input"
                placeholder="Input Token Address"
                value={tokenAddress}
                onChange={handleInput}
              />
              <Button disabled={false} onClick={checkToken} fullWidth>
                Check Now
            </Button>
            </CardBody>
          </SwapCard>
        </AppBody>}
        {isDark === false && <AppBody>
          <SwapCard>
            <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} />
            <CardBody style={{ background: "white" }}>
              <TokenAddressInput
                type="text"
                id="token-address-input"
                placeholder="Input Token Address"
                value={tokenAddress}
                onChange={handleInput}
                className="light-mode-checker-card-input-style-bo"
              />
              <Button disabled={false} onClick={checkToken} fullWidth className="light-mode-check-button-style-bo">
                Check Now
            </Button>
            </CardBody>
          </SwapCard>
        </AppBody>}
      </>}

      {check && <>
        <div className="rug-page-new-layout-laptop-view">
          <Grid container
            justify="space-between"
            spacing={3}
            style={{ marginTop: -30 }}>
            <Grid item lg={4} sm={4} xl={4} xs={12}  >
              {isDark === true && <div className="rug-page-new-checker-card-container-style">
                {/* <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} /> */}
                <p className="rug-checker-page-new-top-title-text-style">Rug Checker</p>
                <CardBody>
                  <p className="rug-page-token-address-text-style">Token Address</p>
                  <TokenAddressInput
                    type="text"
                    id="token-address-input"
                    placeholder="Input Token Address"
                    value={tokenAddress}
                    onChange={handleInput}
                    className="rug-page-new-checker-token-input-field-style"
                  />
                  <div className="rug-page-scan-button-container-style">
                    <Button disabled={false} onClick={checkToken} fullWidth className="rug-page-scan-button-style">
                      Scan
                  </Button>
                  </div>
                </CardBody>
              </div>}
              
              {isDark === false && <div className="rug-page-light-mode-new-checker-card-container-style">
                {/* <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} /> */}
                <p className="rug-checker-page-new-top-title-text-style-light-mode">Rug Checker</p>
                <CardBody
                // style={{ background: "white" }}
                >
                  <TokenAddressInput
                    type="text"
                    id="token-address-input"
                    placeholder="Input Token Address"
                    value={tokenAddress}
                    onChange={handleInput}
                    className="light-mode-checker-card-input-style-bo"
                  />
                  <div className="rug-page-scan-button-container-style">
                    <Button disabled={false} onClick={checkToken} fullWidth className="light-mode-check-button-style-bo">
                      Scan
                    </Button>
                  </div>
                </CardBody>
              </div>}
              <HoldersDistribution tokenAddress={tokenAddress} />
              {/* <Report tokenAddress={tokenAddress} /> */}

            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <CircleProgressBarContainer tokenAddress={tokenAddress} />
              <SocialShareIcons tokenAddress={tokenAddress} />

            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={12}>
              <RightSwapContainer tokenAddress={tokenAddress} />
            </Grid>
          </Grid>
        </div>

        <div className="rug-page-new-layout-tablet-view">
          <Grid container
            justify="space-between"
            spacing={3}
            style={{ marginTop: -30 }}>
            <Grid item lg={12} sm={12} xl={12} xs={12}  >
              {isDark === true && <div className="rug-page-new-checker-card-container-style">
                {/* <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} /> */}
                <p className="rug-checker-page-new-top-title-text-style">Rug Checker</p>
                <CardBody>
                  <p className="rug-page-token-address-text-style">Token Address</p>
                  <TokenAddressInput
                    type="text"
                    id="token-address-input"
                    placeholder="Input Token Address"
                    value={tokenAddress}
                    onChange={handleInput}
                    className="rug-page-new-checker-token-input-field-style"
                  />
                  <div className="rug-page-scan-button-container-style">
                    <Button disabled={false} onClick={checkToken} fullWidth className="rug-page-scan-button-style">
                      Scan
                  </Button>
                  </div>
                </CardBody>
              </div>}
              {isDark === false && <div className="rug-page-light-mode-new-checker-card-container-style">
                {/* <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} /> */}
                <p className="rug-checker-page-new-top-title-text-style-light-mode">Rug Checker</p>
                <CardBody
                // style={{ background: "white" }}
                >
                  <TokenAddressInput
                    type="text"
                    id="token-address-input"
                    placeholder="Input Token Address"
                    value={tokenAddress}
                    onChange={handleInput}
                    className="light-mode-checker-card-input-style-bo"
                  />
                  <div className="rug-page-scan-button-container-style">
                    <Button disabled={false} onClick={checkToken} fullWidth className="light-mode-check-button-style-bo">
                      Scan
                    </Button>
                  </div>
                </CardBody>
              </div>}
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}  >
              {isDark === true && <MobileViewRugChecker tokenAddress={tokenAddress} />}
              {isDark === false && <MobileViewRugCheckerLightMode tokenAddress={tokenAddress} />}
            </Grid>
          </Grid>
        </div>

        <div className="rug-page-new-layout-mobile-view">
          <Grid container
            justify="space-between"
            spacing={3}
            style={{ marginTop: -30 }}>
            <Grid item lg={12} sm={12} xl={12} xs={12}  >
              {isDark === true && <div className="rug-page-new-checker-card-container-style">
                {/* <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} /> */}
                <p className="rug-checker-page-new-top-title-text-style">Rug Checker</p>
                <CardBody>
                  <p className="rug-page-token-address-text-style">Token Address</p>
                  <TokenAddressInput
                    type="text"
                    id="token-address-input"
                    placeholder="Input Token Address"
                    value={tokenAddress}
                    onChange={handleInput}
                    className="rug-page-new-checker-token-input-field-style"
                  />
                  <div className="rug-page-scan-button-container-style">
                    <Button disabled={false} onClick={checkToken} fullWidth className="rug-page-scan-button-style">
                      Scan
                  </Button>
                  </div>
                </CardBody>
              </div>}
              {isDark === false && <div className="rug-page-light-mode-new-checker-card-container-style">
                {/* <PageHeader title="Rug Checker" description="Token Info Checker" setting={false} /> */}
                <p className="rug-checker-page-new-top-title-text-style-light-mode">Rug Checker</p>
                <CardBody
                // style={{ background: "white" }}
                >
                  <TokenAddressInput
                    type="text"
                    id="token-address-input"
                    placeholder="Input Token Address"
                    value={tokenAddress}
                    onChange={handleInput}
                    className="light-mode-checker-card-input-style-bo"
                  />
                  <div className="rug-page-scan-button-container-style">
                    <Button disabled={false} onClick={checkToken} fullWidth className="light-mode-check-button-style-bo">
                      Scan
                    </Button>
                  </div>
                </CardBody>
              </div>}
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}  >
              {isDark === true && <MobileViewRugChecker tokenAddress={tokenAddress} />}
              {isDark === false && <MobileViewRugCheckerLightMode tokenAddress={tokenAddress} />}
            </Grid>
          </Grid>
        </div>

      </>
      }
    </CheckerArea>
  )
  // }
}

export default RugChecker
