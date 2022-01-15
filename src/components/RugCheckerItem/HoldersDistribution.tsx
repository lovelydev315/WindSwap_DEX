import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Grid } from '@material-ui/core';
import useTheme from 'hooks/useTheme'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
import axios from "axios"
import styled, { ThemeContext } from 'styled-components'
import CardNav from 'components/CardNav'
import RugCheckerItem from 'components/RugCheckerItem'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import PageHeader from 'components/PageHeader'
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

const BaseUrl = "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://localhost:5000"; // "http://168.119.111.227:3007";

const HoldersDistribution = ({ tokenAddress }: ReportProps) => {
    const [rug, setRug] = useState<RugInfo>(config)
    const { isDark, toggleTheme } = useTheme()
    const [ holders, setHolders ] = useState("0")

    const percentage = 78;

    useEffect(() => {
        if(!tokenAddress) return
        const checkToken = async () => {
            const api = 'https://rugchecker.windswap.finance/rug/'.concat(tokenAddress)

            try {
                const response = await fetch(api)
                const data = await response.json()

                setRug(data)

                axios.post(`${BaseUrl}/api/v1/total_holders`, { "token": tokenAddress }).then((res) => {
                    if(res.data.status === 200) {
                          const _tokenAddress = res.data.data.address;
                          if(_tokenAddress !== tokenAddress) return;
                          console.log(res.data)
                          setHolders(res.data.data.holders);
                    }
                });
            } catch (error) {
                console.error('Unable to fetch data:', error)
            }
        }
        checkToken()
    }, [tokenAddress])

    const title = 'Report - $'.concat(rug.symbol)

    return (<>
        {isDark === true && <div className="rug-page-circle-component-top-container-style">
            <p className="rug-page-circle-socres-title-text-style">Holders Distribution</p>

            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 20, justifyContent: "start" }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 10 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top10_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 50 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top50_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 100 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top100_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 10 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top10_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 50 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top50_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Top 100 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.holders_distribution.top100_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Token Name</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.tokenName}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Symbol</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.symbol}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Price ($)</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.price}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Decimals</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.decimals}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Lp Balance V1</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.lp_balance_v1}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Lp Balance V2</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.lp_balance_v2}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Mintable</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.mintable ? rug.mintable : "false"}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Blue Checkmark</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.blueCheckmark}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Ownership Renounced</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.ownership_renounced ? rug.ownership_renounced : "false"}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Disclamier</span>
                            <span className="rug-page-holder-card-below-value-text-style">{rug.token_score}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Holders</span>
                            <span className="rug-page-holder-card-below-value-text-style">{holders}</span>
                        </div>
                    </Grid>

                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <div className="rug-page-holder-left-colum-card-item-container-style">
                            <span className="rug-page-holder-card-top-title-text-style">Description</span>
                            <span className="rug-page-holder-place-descirtion-text-style-here">{rug.description}</span>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>}

        {isDark === false && <div className="rug-page-circle-component-top-container-style-light-mode">
            <p className="rug-page-circle-socres-title-text-style-light-mode">Holders Distribution</p>

            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 20, justifyContent: "start" }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Top 10 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.holders_distribution.top10_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Top 50 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.holders_distribution.top50_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Top 100 Percentage</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.holders_distribution.top100_percentage}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Top 10 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.holders_distribution.top10_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Top 50 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.holders_distribution.top50_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Top 100 Contracts</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.holders_distribution.top100_contracts}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Token Name</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.tokenName}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Symbol</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.symbol}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Price ($)</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.price}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Decimals</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.decimals}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Lp Balance V1</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.lp_balance_v1}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Lp Balance V2</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.lp_balance_v2}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Mintable</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.mintable ? rug.mintable : "false"}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Blue Checkmark</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.blueCheckmark}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Ownership Renounced</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.ownership_renounced ? rug.ownership_renounced : "false"}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Disclamier</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{rug.token_score}</span>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12} className="rug-page-left-card-grid-padding">
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Holders</span>
                            <span className="rug-page-holder-card-below-value-text-style-light-mode">{holders}</span>
                        </div>
                    </Grid>

                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <div className="rug-page-holder-left-colum-card-item-container-style-light-mode">
                            <span className="rug-page-holder-card-top-title-text-style">Description</span>
                            <span className="rug-page-holder-place-descirtion-text-style-here-light-mode">{rug.description}</span>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>}
    </>)
}

export default HoldersDistribution
