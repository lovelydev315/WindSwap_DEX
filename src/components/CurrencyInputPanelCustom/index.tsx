import React, { useState, useCallback } from 'react'
import { Currency, Pair } from '@pancakeswap-libs/sdk-v2'
import { Button, ChevronDownIcon, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { Input as NumericalInput } from '../NumericalInput'
import { useActiveWeb3React } from '../../hooks'
import TranslatedText from '../TranslatedText'
import { TranslateString } from '../../utils/translateTextHelpers'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const DetailArea = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: baseline;
  width: 50%;
  flex-flow: column nowrap;
  align-items: left;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  background-color: #6096ff;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: 1px solid #2a2d3c;
  padding: 0.5rem;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  background: #212429;
  max-width: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 8px;
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 8px;
  border: 1px solid #2a2d3c;
`
const StyledDestinationText = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`

const StyledBalanceText = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`

const StyledTranslatedText = styled(TranslatedText)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = TranslateString(132, 'Input'),
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])
  const altcurrency = currency && JSON.parse(JSON.stringify(currency));
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        <RowBetween>
          {!hideInput && (
            <DetailArea style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
              <StyledDestinationText fontSize="14px">{label}</StyledDestinationText>
              <NumericalInput
                className="token-amount-input iphone-5-max-width-size-style-new"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {account && (
                <StyledBalanceText onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? `Balance: ${selectedCurrencyBalance?.toSignificant(6)}`
                    : ' -'}
                </StyledBalanceText>
              )}
            </DetailArea>
          )}
          <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
            {!hideInput && (
              <>
                {account && currency && showMaxButton && label !== 'To' && (
                  <Button onClick={onMax} size="sm" variant="text">
                    Max
                  </Button>
                )}
              </>
            )}
            <CurrencySelect
              selected={!!currency}
              className="open-currency-select-button"
              onClick={() => {
                if (!disableCurrencySelect) {
                  setModalOpen(true)
                }
              }}
            >
              <Aligner>
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                ) : null}
                {pair ? (
                  <Text>
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </Text>
                ) : (
                  <Text>
                    {(currency && currency.symbol && currency.symbol.length > 20
                      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                          currency.symbol.length - 5,
                          currency.symbol.length
                        )}`
                      : currency?.symbol) || (
                      <StyledTranslatedText translationId={82}>Select a token</StyledTranslatedText>
                    )}
                  </Text>
                )}
                {!disableCurrencySelect && <ChevronDownIcon />}
              </Aligner>
            </CurrencySelect>
          </InputRow>
        </RowBetween>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
      {altcurrency && altcurrency.address ?
        <a className="rug-check-link" href={`https://app.windswap.finance/#/rug/${altcurrency.address}`} target="_blank" rel="noreferrer">RUG CHECK</a> :
        <p style={{display: "none"}}>aaa</p>
      }
    </InputPanel>
  )
}
