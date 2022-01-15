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
import axios from "axios"
import PageHeader from 'components/PageHeader'
import LanguageIcon from '@material-ui/icons/Language';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import FaceIcon from '@material-ui/icons/Face';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SmsIcon from '@material-ui/icons/Sms';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import BookIcon from '@material-ui/icons/Book';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const BaseUrl = "http://localhost:5000"; // "https://dex-api.windswap.finance"; // "http://168.119.111.227:3007";

const MobileViewRugCheckerLightMode = ({ tokenAddress }: ReportProps) => {
    const [rug, setRug] = useState<RugInfo>(config)
    const { isDark, toggleTheme } = useTheme()
    const [ holders, setHolders ] = useState("0")

    const percentage = 78;

    useEffect(() => {
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

    return (<div>

        <div className="rug-page-new-mobile-layout-scores-card-style-light-mode">
            <p className="rug-page-circle-socres-title-text-style-light-mode">Scores</p>
            <div>
                <Grid container
                    justify="space-between"
                    spacing={3}
                    style={{ marginTop: 5 }}>
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
                        </div>
                    </Grid>

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
                </Grid>
            </div>
        </div>

        <div className="rug-new-mobile-layout-holder-style-light-mode">
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
        </div>

        <div className="rug-checker-page-new-desicng-social-share-container-top-style-light-mode">
            <p className="rug-page-circle-socres-title-text-style-light-mode">Socials</p>
            <Grid container
                justify="space-between"
                spacing={3}
                style={{ marginTop: 5, justifyContent: "start" }}>
                {rug.socials.website !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.website}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <LanguageIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.email !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.email}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <MailOutlineIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.blog !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.blog}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <BookIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.reddit !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.reddit}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <svg style={{ color: "#fcfcfd" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-reddit" viewBox="0 0 16 16">
                                <path d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.203.203 0 0 0-.153.028.186.186 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z" />
                            </svg>
                        </div>
                    </a>
                </Grid>}
                {rug.socials.slack !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.slack}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <svg style={{ color: "#fcfcfd" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-slack" viewBox="0 0 16 16">
                                <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                            </svg>
                        </div>
                    </a>
                </Grid>}

                {rug.socials.facebook !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.facebook}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <FacebookIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.twitter !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.twitter}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <TwitterIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.bitcointalk !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.bitcointalk}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <svg style={{ color: "#fcfcfd" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-bitcoin" viewBox="0 0 16 16">
                                <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
                            </svg>
                        </div>
                    </a>
                </Grid>}
                {rug.socials.github !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.github}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <GitHubIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.telegram !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.telegram}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <TelegramIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}

                {rug.socials.wechat !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.wechat}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <FaceIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.linkedin !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.linkedin}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <LinkedInIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
                {rug.socials.discord !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.discord}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <svg style={{ color: "#fcfcfd" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                                <path d="M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z" />
                                <path d="M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z" />
                            </svg>
                        </div>
                    </a>
                </Grid>}
                {rug.socials.whitepaper !== "" && <Grid item lg={2} sm={2} xl={2} xs={2}>
                    <a href={rug.socials.whitepaper}>
                        <div className="rug-page-social-icon-container-style-light-mode">
                            <BorderColorIcon style={{ fill: "#fcfcfd" }} />
                        </div>
                    </a>
                </Grid>}
            </Grid>

        </div>

        <div className="rug-new-mobile-layout-holder-style-light-mode">
            <div className="rug-page-right-bottom-card-container-style-light-mode">
                <p className="rug-page-circle-socres-title-text-style-light-mode">Messages</p>
                <textarea className="rug-checker-page-right-colum-message-card-container-style-light-mode" placeholder="Ownership not renounced." />
            </div>
        </div>

    </div>)
}

export default MobileViewRugCheckerLightMode
