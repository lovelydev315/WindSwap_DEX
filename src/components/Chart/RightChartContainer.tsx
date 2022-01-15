import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap-libs/sdk-v2'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowDown } from 'react-feather'
import { CardBody, ArrowDownIcon, Button, IconButton, Flex, Image, Text, UserBlock as User, ConnectorId } from '@pancakeswap-libs/uikit'
import styled, { ThemeContext } from 'styled-components'
import AddressInputPanel from 'components/AddressInputPanel'
import Card, { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ConfirmSwapModal from 'components/swap/ConfirmSwapModal'
import CurrencyInputPanel from 'components/CurrencyInputPanelCustom'
import LightModeCurrencyINputPanel from 'components/CurrencyInputPanelCustom/LightModeCurrencyINputPanel'
import axios from "axios";
import Web3 from "web3";
// import CardNav from 'components/CardNav'
import { AutoRow, RowBetween } from 'components/Row'
// import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import BetterTradeLink from 'components/swap/BetterTradeLink'
import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import TradePrice from 'components/swap/TradePrice'
// import TokenWarningModal from 'components/TokenWarningModal'
// import SyrupWarningModal from 'components/SyrupWarningModal'
import ProgressSteps from 'components/ProgressSteps'
// import SlippageSliderSettings from 'components/PageHeader/SlippageSliderSetting'

import { BETTER_TRADE_LINK_THRESHOLD, INITIAL_ALLOWED_SLIPPAGE } from 'constants/index'
import { isTradeBetter } from 'data/V1'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useToggledVersion, { Version } from 'hooks/useToggledVersion'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { LinkStyledButton, TYPE } from 'components/Shared'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import Loader from 'components/Loader'
// import { TranslateString } from 'utils/translateTextHelpers'
// import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
// import BottomWalletButton from 'components/BottomWalletButton'

import useTheme from 'hooks/useTheme'
// import LightPageHeader from 'components/PageHeader/LightPageHeader'

// import Slider from '@material-ui/core/Slider';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
import CustomSlippageSliderSetting from 'components/PageHeader/CustomSlippageSliderSetting'
import CustomSlippageSliderSettingSell from 'components/PageHeader/CustomSlippageSliderSettingSell'
// import { useWeb3React } from '@web3-react/core'
import { injected, bsc, walletconnect } from 'connectors'

// import UserBlock from 'components/UserBlock'
// import { Grid } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';

// import PlaceOrderSellWindySlider from "./PlaceOrderSellWindySlider";

// import USDT_icon from "../../assets/images/new/USDT_icon.png"
// import bnb_logo from "../../assets/images/new/bnb_logo.png"
// import doge_logo from "../../assets/images/new/doge_logo.png"
// import dot_logo from "../../assets/images/new/dot_logo.png"
// import windy_icon from "../../assets/images/new/windy_new_logo.png"
// import atom_logo from "../../assets/images/new/atom_logo.png"
// import avax_logo from "../../assets/images/new/avax_logo.png"
// import dash_logo from "../../assets/images/new/dash_logo.png"


// const BuyPercentSlider = withStyles({
//   root: {
//     color: '#12b886',
//     height: 5,
//   }
// })(Slider);

// const SellPercentSlider = withStyles({
//   root: {
//     color: '#ff646d',
//     height: 5,
//   }
// })(Slider);

// const SellPercentSlider = withStyles({
//   root: {
//     color: '#ff646d',
//     height: 5,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

const SwapCard = styled.div`
  background: transparent;
`

const { main: Main } = TYPE

const marks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

// function valuetext(value) {
//   return `${value}°C`;
// }

// function valueLabelFormat(value) {
//   return marks.findIndex((mark) => mark.value === value) + 25;
// }

const BaseUrl = "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://localhost:5000"; // "http://168.119.111.227:3007";

interface tokenPrice {
  address: string,
  name: string,
  symbol: string,
  price: number
}

const RightChartContainer = (props) => {

  // const [WindSwapPrice, setWindSwapPrice] = useState<number>(0.2504)
  // const [WindSwapPriceText, setWindSwapPriceText] = useState("$ 0.2504");
  // const [value, setValue] = useState(50);
  const [buysellToggleButton, setBuysellToggleButton] = useState("buy");
  const [tokenPrices, setTokenPrices] = useState<tokenPrice[]>([]);
  const { isDark, toggleTheme } = useTheme()

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const loadedUrlParams = useDefaultsFromURLSearch()
  
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  // const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [isSyrup, setIsSyrup] = useState<boolean>(false)
  const [syrupTransactionType, setSyrupTransactionType] = useState<string>('')
  // const urlLoadedTokens: Token[] = useMemo(
  //   () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
  //   [loadedInputCurrency, loadedOutputCurrency]
  // )
  // const handleConfirmTokenWarning = useCallback(() => {
  //   setDismissTokenWarning(true)
  // }, [])

  // const handleConfirmSyrupWarning = useCallback(() => {
  //   setIsSyrup(false)
  //   setSyrupTransactionType('')
  // }, [])

  useEffect(() => {
    function getTokenPrices() {
      axios.get(`${BaseUrl}/api/v1/get_token_prices`).then((res) => {
        if(res.data.status === 200) {
          setTokenPrices(res.data.data);
        }
      })
    }
    getTokenPrices();
    const timer = window.setInterval(() => {
      getTokenPrices();
    }, 60000);
    return () => window.clearInterval(timer);
  }, [])

  const { account, activate, deactivate } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    v1Trade,
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  //   const { address: recipientAddress } = useENSAddress(recipient)
  const toggledVersion = useToggledVersion()
  const trade = showWrap
    ? undefined
    : {
      [Version.v1]: v1Trade,
      [Version.v2]: v2Trade,
    }[toggledVersion]

  const betterTradeLinkVersion: Version | undefined =
    toggledVersion === Version.v2 && isTradeBetter(v2Trade, v1Trade, BETTER_TRADE_LINK_THRESHOLD)
      ? Version.v1
      : toggledVersion === Version.v1 && isTradeBetter(v1Trade, v2Trade)
        ? Version.v2
        : undefined

  const parsedAmounts = showWrap
    ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
    : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (_value: string) => {
      onUserInput(Field.INPUT, _value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (_value: string) => {
      onUserInput(Field.OUTPUT, _value)
    },
    [onUserInput]
  )

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // const [valueSlippageSlider, setValueSlippageSlider] = React.useState(10);
  // const { isDark, toggleTheme } = useTheme()
  // useEffect(() => {
  //   console.log("swap here: ", isDark)
  // })

  // const handleChange = (event, newValue) => {
  //   setValueSlippageSlider(newValue);
  // };


  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
      .then((hash) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: hash,
        }))
      })
      .catch((error) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: error.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, swapCallback, setSwapState])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash, setSwapState])

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  // This will check to see if the user has selected Syrup to either buy or sell.
  // If so, they will be alerted with a warning message.
  const checkForSyrup = useCallback(
    (selected: string, purchaseType: string) => {
      if (selected === 'syrup') {
        setIsSyrup(true)
        setSyrupTransactionType(purchaseType)
      }
    },
    [setIsSyrup, setSyrupTransactionType]
  )

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      if (inputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(inputCurrency.symbol.toLowerCase(), 'Selling')
      }
    },
    [onCurrencySelection, setApprovalSubmitted, checkForSyrup]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      if (outputCurrency.symbol.toLowerCase() === 'syrup') {
        checkForSyrup(outputCurrency.symbol.toLowerCase(), 'Buying')
      }
    },
    [onCurrencySelection, checkForSyrup]
  )

  function tokenLogo(_address: string) {
    const checksumAddress = Web3.utils.toChecksumAddress(_address);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${checksumAddress}/logo.png`;
  }
  
  function hideImg(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.style.visibility = "hidden";
  }

  function formattedPrice(price) {
    const formattedNumber = Number(price).toPrecision(8);
    return convertToComma(formattedNumber);
  }
  
  function convertToComma(input: string) {
    const inputArray = input.split(".");
    const formattedArray = new Array<string>();
    while(true) {
      if(inputArray[0].length > 3) {
        const each = inputArray[0].slice(-3);
        inputArray[0] = inputArray[0].slice(0, -3);
        formattedArray.unshift(`,${each}`);
      }
      else {
        if(inputArray[0].length) formattedArray.unshift(inputArray[0]);
        break;
      }
    }
    const formattedInteger = formattedArray.join("");
    if(inputArray.length > 1) return `${formattedInteger}.${inputArray[1]}`;
    return formattedInteger;
  }

  function changeBuysellToggleButton(state) {
    const currentState = buysellToggleButton;
    if(currentState !== state) {
      setBuysellToggleButton(state);
      setApprovalSubmitted(false);
      onSwitchTokens();
    }

  }

  return (<div>
    {isDark === true ? <div className="chart-page-new-design-right-colum-top-conatiner-style-here2">
      <p className="chart-page-new-design-right-top-text-place-order-style">Place Order</p>

      {buysellToggleButton === "buy" && <div className="align-center-just-center-style chart-page-new-design-right-colum-buy-sell-toggle-container-style">
        <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { changeBuysellToggleButton("buy") }}>Buy</button>
        <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { changeBuysellToggleButton("sell") }}>Sell</button>
      </div>}

      {buysellToggleButton === "sell" && <div className="align-center-just-center-style chart-page-new-design-right-colum-buy-sell-toggle-container-style">
        <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style" onClick={() => { changeBuysellToggleButton("buy") }}>Buy</button>
        <button type="button" className="chart-page-new-design-right-sell-togle-active-button-style" onClick={() => { changeBuysellToggleButton("sell") }}>Sell</button>
      </div>}


      {buysellToggleButton === "buy" && <div className="chart-page-new-design-toggle-button-below-three-tab-container-style">
        <span className="chart-page-new-design-right-colum-toggle-below-tab-bar-item-active-text-style">Swap</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Limit</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Stop-limit</span>
      </div>}

      {buysellToggleButton === "sell" && <div className="chart-page-new-design-toggle-button-below-three-tab-container-style">
        <span className="chart-page-new-design-right-colum-toggle-below-tab-sell-mobile-view-bar-item-active-text-style">Swap</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Limit</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style">Stop-limit</span>
      </div>}

      <SwapCard className="iphone5-swap-card-right-corner-style">
        <Wrapper id="swap-page">
          <ConfirmSwapModal
            isOpen={showConfirm}
            trade={trade}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
          />
          <CardBody>
            {buysellToggleButton === "buy" ?
              <AutoColumn gap="md">
                <CurrencyInputPanel
                  label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={!atMaxAmountInput}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id="swap-currency-input"
                />
                <AutoColumn justify="space-between">
                  <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable>
                      <IconButton
                        variant="tertiary"
                        style={{ borderRadius: '50%' }}
                        size="sm"
                      >
                        <div className="center">
                          <ArrowDownIcon color="primary" width="24px" />
                        </div>
                      </IconButton>
                    </ArrowWrapper>
                    {recipient === null && !showWrap && isExpertMode ? (
                      <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                        + Add a send (optional)
                      </LinkStyledButton>
                    ) : null}
                  </AutoRow>
                </AutoColumn>
                <CurrencyInputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onUserInput={handleTypeOutput}
                  label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
                  showMaxButton={false}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id="swap-currency-output"
                />

                {recipient !== null && !showWrap ? (
                  <>
                    <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable={false}>
                        <ArrowDown size="16" color={theme.colors.textSubtle} />
                      </ArrowWrapper>
                      <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                        - Remove send
                      </LinkStyledButton>
                    </AutoRow>
                    <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  </>
                ) : null}
                <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                  <AutoColumn gap="4px">
                    {Boolean(trade) && (
                      <RowBetween align="center">
                        <Text fontSize="14px">Price</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetween>
                    )}
                    <CustomSlippageSliderSetting allowedSlippage={allowedSlippage / 100} />
                  </AutoColumn>
                </Card>
              </AutoColumn> : 
              <AutoColumn gap="md">
                <CurrencyInputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onUserInput={handleTypeOutput}
                  label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
                  showMaxButton={false}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id="swap-currency-output"
                />
                <AutoColumn justify="space-between">
                  <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable>
                      <IconButton
                        variant="tertiary"
                        style={{ borderRadius: '50%' }}
                        size="sm"
                      >
                        <div className="rotate180 center">
                          <ArrowDownIcon color="primary" width="24px" />
                        </div>
                      </IconButton>
                    </ArrowWrapper>
                    {recipient === null && !showWrap && isExpertMode ? (
                      <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                        + Add a send (optional)
                      </LinkStyledButton>
                    ) : null}
                  </AutoRow>
                </AutoColumn>
                <CurrencyInputPanel
                  label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={!atMaxAmountInput}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id="swap-currency-input"
                />

                {recipient !== null && !showWrap ? (
                  <>
                    <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable={false}>
                        <ArrowDown size="16" color={theme.colors.textSubtle} />
                      </ArrowWrapper>
                      <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                        - Remove send
                      </LinkStyledButton>
                    </AutoRow>
                    <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  </>
                ) : null}
                <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                  <AutoColumn gap="4px">
                    {Boolean(trade) && (
                      <RowBetween align="center">
                        <Text fontSize="14px">Price</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetween>
                    )}
                    <CustomSlippageSliderSetting allowedSlippage={allowedSlippage / 100} />
                  </AutoColumn>
                </Card>
              </AutoColumn>
            }

            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton fullWidth />
              ) : showWrap ? (
                <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </Button>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Main mb="4px">Insufficient liquidity for this trade.</Main>
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <Button
                    onClick={approveCallback}
                    disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    style={{ width: '48%' }}
                    variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        Approving <Loader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      'Approved'
                    ) : (
                      `Approve ${currencies[Field.INPUT]?.symbol}`
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    style={{ width: '48%' }}
                    id="swap-button"
                    disabled={
                      !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    variant={isValid && priceImpactSeverity > 2 ? 'tertiary' : 'primary'}
                  >
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? `Price Impact High`
                      : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                  </Button>
                </RowBetween>
              ) : (<>
                <Button
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  id="swap-button"
                  disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                  variant="tertiary"
                  fullWidth
                >
                  {swapInputError ||
                    (priceImpactSeverity > 3 && !isExpertMode
                      ? `Price Impact Too High`
                      : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`)}
                </Button>
              </>)}
              {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />}
              <div className="log-out">
                {account && <User
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
                />}
              </div>
            </BottomGrouping>
          </CardBody>

        </Wrapper>
      </SwapCard>

      <div className="chart-page-new-design-right-colum-asstes-wallet-container-style">
        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <span className="chart-page-new-design-right-colum-asstes-text-style">Assets</span>
          <span className="span-font-size-12px">Buy with USD</span>
        </div>

        <div className="chart-page-mobile-view-wallet-asstes-scroll-container-style" style={account ? {maxHeight: "305px"} : {maxHeight: "335px"}}>
          {tokenPrices && tokenPrices.length ? tokenPrices.map(each => (
            <div key={each.address} className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
              <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
                <img src={tokenLogo(each.address)} alt="logo" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" onError={(event) => hideImg(event)} />
                <div className="token-list-font">{each.symbol}</div>
              </div>
              <span className="token-list-font">{formattedPrice(each.price)}</span>
            </div>
          )) : 
            <p>Reading...</p>
          }
        </div>
      </div>

    </div> : <div className="chart-page-new-design-right-colum-top-conatiner-style-here2-light-mode">
      <p className="chart-page-new-design-right-top-text-place-order-style">Place Order</p>

      {buysellToggleButton === "buy" && <div className="align-center-just-center-style chart-page-new-design-right-colum-buy-sell-toggle-container-style-light-mode">
        <button type="button" className="chart-page-new-design-right-buy-togle-active-button-style" onClick={() => { changeBuysellToggleButton("buy") }}>Buy</button>
        <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style-light-mode" onClick={() => { changeBuysellToggleButton("sell") }}>Sell</button>
      </div>}

      {buysellToggleButton === "sell" && <div className="align-center-just-center-style chart-page-new-design-right-colum-buy-sell-toggle-container-style-light-mode">
        <button type="button" className="chart-page-new-design-right-colum-sell-togle-inactive-button-style-light-mode" onClick={() => { changeBuysellToggleButton("buy") }}>Buy</button>
        <button type="button" className="chart-page-new-design-right-sell-togle-active-button-style" onClick={() => { changeBuysellToggleButton("sell") }}>Sell</button>
      </div>}


      {buysellToggleButton === "buy" && <div className="chart-page-new-design-toggle-button-below-three-tab-container-style">
        <span className="chart-page-new-design-right-colum-toggle-below-tab-bar-item-active-text-style-light-mode">Swap</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style-light-mode">Limit</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style-light-mode">Stop-limit</span>
      </div>}

      {buysellToggleButton === "sell" && <div className="chart-page-new-design-toggle-button-below-three-tab-container-style">
        <span className="chart-page-new-design-right-colum-toggle-below-tab-sell-mobile-view-bar-item-active-text-style-light-mode">Swap</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style-light-mode">Limit</span>
        <span className="chart-page-right-cloum-tab-toggle-inactive-item-text-style-light-mode">Stop-limit</span>
      </div>}

      <SwapCard className="iphone5-swap-card-right-corner-style">
        <Wrapper id="swap-page">
          <ConfirmSwapModal
            isOpen={showConfirm}
            trade={trade}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
          />
          <CardBody>
            {buysellToggleButton === "buy" ?
              <AutoColumn gap="md">
                <LightModeCurrencyINputPanel
                  label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={!atMaxAmountInput}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id="swap-currency-input"
                />
                <AutoColumn justify="space-between">
                  <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable>
                      <IconButton
                        variant="tertiary"
                        style={{ borderRadius: '50%', backgroundColor: "#fff" }}
                        size="sm"
                      >
                        <div className="center">
                          <ArrowDownIcon color="dark" width="24px" />
                        </div>
                      </IconButton>
                    </ArrowWrapper>
                    {recipient === null && !showWrap && isExpertMode ? (
                      <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                        + Add a send (optional)
                      </LinkStyledButton>
                    ) : null}
                  </AutoRow>
                </AutoColumn>
                <LightModeCurrencyINputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onUserInput={handleTypeOutput}
                  label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
                  showMaxButton={false}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id="swap-currency-output"
                />

                {recipient !== null && !showWrap ? (
                  <>
                    <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable={false}>
                        <ArrowDown size="16" color={theme.colors.textSubtle} />
                      </ArrowWrapper>
                      <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                        - Remove send
                      </LinkStyledButton>
                    </AutoRow>
                    <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  </>
                ) : null}
                <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                  <AutoColumn gap="4px">
                    {Boolean(trade) && (
                      <RowBetween align="center">
                        <Text fontSize="14px">Price</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetween>
                    )}
                    <CustomSlippageSliderSetting allowedSlippage={allowedSlippage / 100} />
                  </AutoColumn>
                </Card>
              </AutoColumn> : 
              <AutoColumn gap="md">
                <LightModeCurrencyINputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onUserInput={handleTypeOutput}
                  label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
                  showMaxButton={false}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id="swap-currency-output"
                />
                <AutoColumn justify="space-between">
                  <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable>
                      <IconButton
                        variant="tertiary"
                        style={{ borderRadius: '50%', backgroundColor: "#fff" }}
                        size="sm"
                      >
                        <div className="rotate180 center">
                          <ArrowDownIcon color="dark" width="24px" />
                        </div>
                      </IconButton>
                    </ArrowWrapper>
                    {recipient === null && !showWrap && isExpertMode ? (
                      <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                        + Add a send (optional)
                      </LinkStyledButton>
                    ) : null}
                  </AutoRow>
                </AutoColumn>
                <LightModeCurrencyINputPanel
                  label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={!atMaxAmountInput}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id="swap-currency-input"
                />

                {recipient !== null && !showWrap ? (
                  <>
                    <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable={false}>
                        <ArrowDown size="16" color={theme.colors.textSubtle} />
                      </ArrowWrapper>
                      <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                        - Remove send
                      </LinkStyledButton>
                    </AutoRow>
                    <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  </>
                ) : null}
                <Card padding=".25rem .75rem 0 .75rem" borderRadius="20px">
                  <AutoColumn gap="4px">
                    {Boolean(trade) && (
                      <RowBetween align="center">
                        <Text fontSize="14px">Price</Text>
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      </RowBetween>
                    )}
                    <CustomSlippageSliderSettingSell allowedSlippage={allowedSlippage / 100} />
                  </AutoColumn>
                </Card>
              </AutoColumn>
            }

            <BottomGrouping>
              {!account ? (
                <ConnectWalletButton fullWidth />
              ) : showWrap ? (
                <Button disabled={Boolean(wrapInputError)} onClick={onWrap} fullWidth>
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </Button>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Main mb="4px">Insufficient liquidity for this trade.</Main>
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <Button
                    onClick={approveCallback}
                    disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    style={{ width: '48%' }}
                    variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        Approving <Loader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      'Approved'
                    ) : (
                      `Approve ${currencies[Field.INPUT]?.symbol}`
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    style={{ width: '48%', backgroundColor: "#6096ff", color: "#fff"}}
                    id="swap-button"
                    disabled={
                      !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    variant={isValid && priceImpactSeverity > 2 ? 'tertiary' : 'primary'}
                  >
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? `Price Impact High`
                      : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                  </Button>
                </RowBetween>
              ) : (<>
                <Button
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  id="swap-button"
                  style={{backgroundColor: "#6096ff", color: "#fff"}}
                  disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                  variant="tertiary"
                  fullWidth
                >
                  {swapInputError ||
                    (priceImpactSeverity > 3 && !isExpertMode
                      ? `Price Impact Too High`
                      : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`)}
                </Button>
              </>)}
              {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />}
              <div className="log-out">
                {account && <User
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
                />}
              </div>
            </BottomGrouping>
          </CardBody>

        </Wrapper>
      </SwapCard>

      <div className="chart-page-new-design-right-colum-asstes-wallet-container-style">
        <div className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
          <span className="chart-page-new-design-right-colum-asstes-text-style">Assets</span>
          <span className="span-font-size-12px">Buy with USD</span>
        </div>

        <div className="chart-page-mobile-view-wallet-asstes-scroll-container-style" style={account ? {maxHeight: "305px"} : {maxHeight: "335px"}}>
          {tokenPrices && tokenPrices.length ? tokenPrices.map(each => (
            <div key={each.address} className="chart-page-new-design-right-colum-asstes-wallet-item-container-style">
              <div className="chart-page-new-design-right-colum-wallet-asstes-icon-container-style">
                <img src={tokenLogo(each.address)} alt="logo" className="chart-page-new-design-right-colum-wallet-assets-logo-image-style" onError={(event) => hideImg(event)} />
                <div className="token-list-font">{each.symbol}</div>
              </div>
              <span className="token-list-font">{formattedPrice(each.price)}</span>
            </div>
          )) : 
            <p>Reading...</p>
          }
        </div>
      </div>

    </div>}
  </div>)
}

export default RightChartContainer
