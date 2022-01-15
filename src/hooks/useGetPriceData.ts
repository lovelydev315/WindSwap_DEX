import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useMulticallContract } from './useContract'
import ERC20_INTERFACE from '../constants/abis/erc20'
import priceContracts from '../constants/eggPriceContracts'

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=4T3F6MQAQXFKW8D14RFHI2I5V394DQXAGH'

const useGetPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res = await response.json()
        const bnbPrice = res.result.ethusd
        const wbnbPrice = bnbPrice * 0.996016
        console.log('pooh, bnbPrice = ', bnbPrice)
        if (multicallContract) {
          const { windAddress, bnbAddress, lpAddress } = priceContracts
          const calls = [
            [windAddress, ERC20_INTERFACE.encodeFunctionData('balanceOf', [lpAddress])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData('balanceOf', [lpAddress])],
          ]

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls)
          const [windAmount, bnbAmount] = result.map((r) => ERC20_INTERFACE.decodeFunctionResult('balanceOf', r))
          const wind = new BigNumber(windAmount)
          const bnb = new BigNumber(bnbAmount)
          console.log('pooh, wind amount = ', wind.toNumber())
          console.log('pooh, bnb amount = ', bnb.toNumber())
          const windPrice = (bnb.div(wind).toNumber() * wbnbPrice) / 10000000000
          setData(windPrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export default useGetPriceData
