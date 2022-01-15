import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Grid } from '@material-ui/core';
import useTheme from 'hooks/useTheme'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CardBody, ArrowDownIcon, Button, IconButton, Image, Text } from '@pancakeswap-libs/uikit'
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

const CircleProgressBarContainer = ({ tokenAddress }: ReportProps) => {
    const [rug, setRug] = useState<RugInfo>(config)
    const { isDark, toggleTheme } = useTheme()

    const percentage = 78;

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

    return (<>
        {isDark === true && <div className="rug-page-circle-component-top-container-style">
            <p className="rug-page-circle-socres-title-text-style">Scores</p>
            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 5 }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Token Score</span>
                                <span className="font-size-13px">{rug.token_score}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Social Score</span>
                                <span className="font-size-13px">{rug.social_score}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Critical Count</span>
                                <span className="font-size-13px">{rug.critical_count}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Warning Count</span>
                                <span className="font-size-13px">{rug.warning_count}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here">
                                <span className="font-size-13px">Social Count</span>
                                <span className="font-size-13px">{rug.social_count}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.token_score}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#0b5bd4`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.token_score}</p>
                                <div >
                                    <p>Token Score</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.social_score}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#7bff7b`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.social_score}</p>
                                <div >
                                    <p>Social Score</p>
                                </div>
                            </CircularProgressbarWithChildren>

                            {/* <CircularProgressbar
                            value={rug.social_score}
                            text={`${rug.social_score}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '20px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `#7bff7b`,
                                textColor: '#f2b92f',
                                trailColor: '#414767',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                        <p className="rug-page-circle-below-text-style">Social Score</p> */}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 5 }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.critical_count + 1}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#abff00`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.critical_count}</p>
                                <div >
                                    <p>Cirtical Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.warning_count + 1}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#6096ff`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.warning_count}</p>
                                <div >
                                    <p>Warning Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style">
                            <CircularProgressbarWithChildren
                                value={rug.social_count}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#cfb016`,
                                    textColor: '#f2b92f',
                                    trailColor: '#414767',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.social_count}</p>
                                <div >
                                    <p>Social Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>}

        {isDark === false && <div className="rug-page-circle-component-top-container-style-light-mode">
            <p className="rug-page-circle-socres-title-text-style-light-mode">Scores</p>
            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 5 }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style-light-mode">
                            <div className="rug-page-scores-value-card-item-container-style-here-light-mode">
                                <span className="rug-checker-page-token-scores-value-style-light-mode">Token Score</span>
                                <span className="rug-checker-page-token-scores-value-style-light-mode">{rug.token_score}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here-light-mode">
                                <span className="rug-checker-page-token-scores-value-style-light-mode">Social Score</span>
                                <span className="rug-checker-page-token-scores-value-style-light-mode">{rug.social_score}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here-light-mode">
                                <span className="rug-checker-page-token-scores-value-style-light-mode">Critical Count</span>
                                <span className="rug-checker-page-token-scores-value-style-light-mode">{rug.critical_count}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here-light-mode">
                                <span className="rug-checker-page-token-scores-value-style-light-mode">Warning Count</span>
                                <span className="rug-checker-page-token-scores-value-style-light-mode">{rug.warning_count}</span>
                            </div>

                            <div className="rug-page-scores-value-card-item-container-style-here-light-mode">
                                <span className="rug-checker-page-token-scores-value-style-light-mode">Social Count</span>
                                <span className="rug-checker-page-token-scores-value-style-light-mode">{rug.social_count}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style-light-mode">
                            <CircularProgressbarWithChildren
                                value={rug.token_score}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#0b5bd4`,
                                    textColor: '#f2b92f',
                                    trailColor: '#ffffff',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.token_score}</p>
                                <div >
                                    <p>Token Score</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style-light-mode">
                            <CircularProgressbarWithChildren
                                value={rug.social_score}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#7bff7b`,
                                    textColor: '#f2b92f',
                                    trailColor: '#ffffff',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.social_score}</p>
                                <div >
                                    <p>Social Score</p>
                                </div>
                            </CircularProgressbarWithChildren>

                            {/* <CircularProgressbar
                            value={rug.social_score}
                            text={`${rug.social_score}%`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '20px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `#7bff7b`,
                                textColor: '#f2b92f',
                                trailColor: '#414767',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                        <p className="rug-page-circle-below-text-style">Social Score</p> */}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 5 }}>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style-light-mode">
                            <CircularProgressbarWithChildren
                                value={rug.critical_count + 1}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#abff00`,
                                    textColor: '#f2b92f',
                                    trailColor: '#ffffff',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.critical_count}</p>
                                <div >
                                    <p>Cirtical Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style-light-mode">
                            <CircularProgressbarWithChildren
                                value={rug.warning_count + 1}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#6096ff`,
                                    textColor: '#f2b92f',
                                    trailColor: '#ffffff',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.warning_count}</p>
                                <div >
                                    <p>Warning Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={4} xl={4} xs={12}>
                        <div className="rug-page-circle-progress-bar-container-style-light-mode">
                            <CircularProgressbarWithChildren
                                value={rug.social_count}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `#cfb016`,
                                    textColor: '#f2b92f',
                                    trailColor: '#ffffff',
                                    backgroundColor: '#3e98c7',
                                })}
                            >
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                {/* <img style={{ width: 40, marginTop: -5 }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" /> */}
                                <p className="rug-page-circle-child-top-text-style">{rug.social_count}</p>
                                <div >
                                    <p>Social Count</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>}
    </>)
}

export default CircleProgressBarContainer
