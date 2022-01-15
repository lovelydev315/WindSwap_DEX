import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import useGetPriceData from 'hooks/useGetPriceData'
import styled from 'styled-components'

export const PriceText = styled(Text)`
  background - image: none;
  align-items: flex-start;
  padding: 0;
  font - size: 12px;
  font-family: none;
  color: #000000;
`
const Price = () => {
  const pirceData = useGetPriceData()
  const windPriceUSD = pirceData ? Number(pirceData) : undefined
  return (
    <>
      <PriceText fontSize="20px" color="textSubtle">
        {windPriceUSD}
      </PriceText>
    </>
  )
}
export default Price
