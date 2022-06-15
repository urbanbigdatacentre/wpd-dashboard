// WPD Landing Statistics Bar Module

// Package Imports
import {connect} from "react-redux";

// Local Imports
import StatCard from "../../elements/statCard";
import {Box, Container, styled, Skeleton} from "@mui/material";
import uiText from "../../../data/ui-text";
import {useEffect, useState} from "react";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import axios from "axios";
import config from "../../../api/config";

const StatisticsBar = ({ configureAPI, toggleLanguage }) => {

    const { promiseInProgress } = usePromiseTracker({area: "summary", delay: 400000})
    const [stats, setStats] = useState({});

    // Function to set stat bar numbers using axios get request on component mount
    useEffect(() => {
        // Create Get Request Here 👇
        if (configureAPI?.node_env?.NODE_ENV) {
            trackPromise(
                axios.get(`${config[configureAPI['node_env'].NODE_ENV]}/dashboard/summary`)
                    .then(res => {
                        if (res.data?.responseData?.array_to_json !== undefined) {
                            setStats(res.data.responseData.array_to_json[0])
                        }
                    })
                , "summary")
        }
    }, [Object.keys(stats).length, configureAPI['node_env'].NODE_ENV])


    if (!promiseInProgress) {
        return (
            <StatisticsBarSectionContainer>
                <StatisticsBarRowBox>
                    {/* Use Map Function to Map Stats in State to StatCard Components */}
                    <StatCard number={stats?.pluviometers !== undefined ? stats.pluviometers : "-"} text={uiText.landingPage.statisticsBar.pluviometers[toggleLanguage.language]}/>
                    <StatCard number={stats?.citizenreporters !== undefined ? stats.citizenreporters : "-"} text={uiText.landingPage.statisticsBar.citizenReporters[toggleLanguage.language]}/>
                    <StatCard number={stats?.partnerschools !== undefined ? stats.partnerschools : "-"} text={uiText.landingPage.statisticsBar.partnerSchools[toggleLanguage.language]}/>
                    <StatCard number={stats?.civildefenseagencies !== undefined ? stats.civildefenseagencies : "-"} text={uiText.landingPage.statisticsBar.protectionAgencies[toggleLanguage.language]}/>
                    <StatCard number={stats?.rowsofdata !== undefined ? stats.rowsofdata : "-"} text={uiText.landingPage.statisticsBar.rowsOfData[toggleLanguage.language]}/>
                </StatisticsBarRowBox>
            </StatisticsBarSectionContainer>
        );
    } else {
        return (
            <StatisticsBarSectionContainer>
                <StatisticsBarRowBox>
                    <MyStatCardSkeleton/>
                    <MyStatCardSkeleton/>
                    <MyStatCardSkeleton/>
                    <MyStatCardSkeleton/>
                    <MyStatCardSkeleton/>
                </StatisticsBarRowBox>
            </StatisticsBarSectionContainer>
        )
    }

}

const MyStatCardSkeleton = styled(Skeleton)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    padding: `5rem 7rem`,
    border: `1px solid #E5E5E5`,
    boxShadow: `none`,
    textAlign: `center`,
    width: `max-content`,
    [theme.breakpoints.down('md')]: {
        padding: `.5rem .5rem`,
    },
}))

const StatisticsBarSectionContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    justifyContent: `center`,
    marginTop: theme.spacing(6),
    flexDirection: `column`,
}));

const StatisticsBarRowBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexWrap: `wrap`,
    gap: `2rem`,
    justifyContent: `center`,
    alignItems: `center`,
}))


export default connect((state) => state)(StatisticsBar)