import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Flex, Input, Text } from '@pancakeswap-libs/uikit'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { AutoRow, RowBetween, RowFlat } from 'components/Row'
import Slider from '@material-ui/core/Slider'
import TranslatedText from '../TranslatedText'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const StyledSlippageToleranceSettings = styled.div`
  padding: 0.25rem 0.75rem 0 0.75rem;
  @media only screen and (max-width: 600px) {
    padding: 0.25rem 0;
  }
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`

const PercentLabel = styled.div`
  width: 20px;
`

const Space = styled.div`
  width: 15px;
`

const SlippageSliderSettings = ({ allowedSlippage }) => {
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [error, setError] = useState<string | null>(null)

  const domain: ReadonlyArray<number> = [0, 100]
  const [value, setValue] = useState<number | number[]>(1)

  // setValue(allowedSlippage)

  const handleChange = (event: any, newValue: number | number[]) => {
    console.log('pooh, slider value = ', newValue)
    setValue(newValue)
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = Number(value.toString()) * 100
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError('Enter a valid slippage percentage')
      }
    } catch {
      setError('Enter a valid slippage percentage')
    }
  }, [value, setError, setUserslippageTolerance])

  // useEffect(() => {
  //   setValue(allowedSlippage)
  // }, [allowedSlippage])

  // Notify user if slippage is risky
  useEffect(() => {
    if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError('Your transaction may fail')
    } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError('Your transaction may be frontrun')
    }
  }, [userSlippageTolerance, setError])

  return (
    <StyledSlippageToleranceSettings>
      <RowBetween>
        <AutoRow>
          <Label>
            <Text fontSize="14px" style={{ fontWeight: 100 }}>
              <TranslatedText translationId={1005}>Slippage</TranslatedText>
            </Text>
          </Label>
          <Space />
          <Slider
            value={value}
            min={0}
            step={0.5}
            max={15}
            onChange={handleChange}
            valueLabelDisplay="off"
            aria-labelledby="non-linear-slider"
            style={{ width: '65%' }}
          />
        </AutoRow>
        <PercentLabel>
          <Text fontSize="14px">{value}%</Text>
        </PercentLabel>
      </RowBetween>
    </StyledSlippageToleranceSettings>
  )
}

export default SlippageSliderSettings
