/*eslint-disable*/
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu as UikitMenu, ConnectorId } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap-libs/sdk-v2'

import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import { injected, bsc, walletconnect } from 'connectors'
import { useCurrency } from 'hooks/Tokens'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'

import ConnectWalletButton from 'components/ConnectWalletButton'
import ConnectWalletButtonMobile from 'components/ConnectWalletButton/ConnectWalletButtonMobile'
import ConnectWalletButtonMobileWhiteModeBelowShow from 'components/ConnectWalletButton/ConnectWalletButtonMobileWhiteModeBelowShow'

import Card, { GreyCard } from 'components/Card'
import { AutoRow, RowBetween } from 'components/Row'
import Loader from 'components/Loader'
import ProgressSteps from 'components/ProgressSteps'
import BetterTradeLink from 'components/swap/BetterTradeLink'
import styled, { ThemeContext } from 'styled-components'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import useToggledVersion, { Version } from 'hooks/useToggledVersion'
import { isTradeBetter } from 'data/V1'
import { BETTER_TRADE_LINK_THRESHOLD, INITIAL_ALLOWED_SLIPPAGE } from 'constants/index'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useSwapCallback } from 'hooks/useSwapCallback'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import { LinkStyledButton, TYPE } from 'components/Shared'

import App_logo from "../../assets/images/app_logo.webp";
import Mobile_App_logo from "../../assets/images/MobileWindLogo.webp";

const { main: Main } = TYPE

const SwapArea = styled.div`
  margin: auto;
`

const SwapCard = styled.div`
  background: #191b1f;
`

const BottomWalletButton: React.FC = (props) => {
    const { account, activate, deactivate } = useWeb3React()
    const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
    const { isDark, toggleTheme } = useTheme()
    const pirceData = useGetPriceData()
    const windPriceUSD = pirceData ? Number(pirceData) : undefined

    console.log('pooh token price = ', windPriceUSD)

    const profile = {
        profileLink: '',
        noProfileLink: '',
        username: 'Wind',
        image: '/images/wind/Profile.png',
    }

    useEffect(() => {
        console.log("log: ", isDark, pirceData)
        toggleTheme
    })

    const loadedUrlParams = useDefaultsFromURLSearch()

    // token warning stuff
    const [loadedInputCurrency, loadedOutputCurrency] = [
        useCurrency(loadedUrlParams?.inputCurrencyId),
        useCurrency(loadedUrlParams?.outputCurrencyId),
    ]
    const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
    const [isSyrup, setIsSyrup] = useState<boolean>(false)
    const [syrupTransactionType, setSyrupTransactionType] = useState<string>('')
    const urlLoadedTokens: Token[] = useMemo(
        () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
        [loadedInputCurrency, loadedOutputCurrency]
    )
    const handleConfirmTokenWarning = useCallback(() => {
        setDismissTokenWarning(true)
    }, [])

    const handleConfirmSyrupWarning = useCallback(() => {
        setIsSyrup(false)
        setSyrupTransactionType('')
    }, [])

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
        (value: string) => {
            onUserInput(Field.INPUT, value)
        },
        [onUserInput]
    )
    const handleTypeOutput = useCallback(
        (value: string) => {
            onUserInput(Field.OUTPUT, value)
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

    return (
        <BottomGrouping>
            {!account ? (<>
                {isDark == true && <ConnectWalletButtonMobile fullWidth />}
                {isDark == false && <ConnectWalletButtonMobileWhiteModeBelowShow fullWidth />}
            </>
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
            {/* {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
            {betterTradeLinkVersion && <BetterTradeLink version={betterTradeLinkVersion} />} */}
        </BottomGrouping>

    )
}

export default BottomWalletButton
