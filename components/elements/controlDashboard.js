// Control Dashboard Element - Used for Layout and rendering of Stat Bars + Weather Carousel


// Package Imports
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import styles from "../../styles/modules/location-page/ControlPanel.module.css";
import {Box, Typography, Container, styled, Divider} from "@mui/material";
import uiText from "../../data/ui-text";
import StatCard from "./statCard";
import LocationBox from "./locationBox";
import locationPaths from "../../data/locationPaths";
import WeatherCarousel from "./weatherCarousel";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import axios from "axios";
import config from "../../api/config";
import * as d3 from "d3";

// Local Imports


// Control Dashboard Component


const ControlDashboard = ({ toggleLanguage, locationData, color, weatherAPIToken, configureAPI, toggleDate }) => {

    const { promiseInProgress } = usePromiseTracker({area: "place-summary", delay: 0})

    const [stats, setStats] = useState({});

    useEffect(() => {
        trackPromise(
        axios.get(`${config[configureAPI['node_env'].NODE_ENV]}/dashboard/placesummary?id=${locationData['placeid']}&startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`)
            .then(res => {
                if (res.data?.responseData?.array_to_json !== undefined) {
                    setStats(res.data.responseData.array_to_json[0])
                }
            })
        , "place-summary")
    }, [Object.keys(stats).length, configureAPI['node_env'].NODE_ENV])

    return (
        <ControlDashboardOuterBox >
            <LocationBox locationName={locationPaths[locationData['placetype']].text} color={color}/>
            <Typography sx={{paddingTop: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold), color: color}}>{locationData['placename'].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
            <Divider sx={{width: `100%`}}/>
            <DateRangeText>{new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)).toLocaleString().split(',')[0] + " - " + new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)).toLocaleString().split(',')[0]}</DateRangeText>
            <ControlDashboardInnerBox >
                <ControlDashboardStatCardBox>
                    <StatCard firstInSequence={true} text={uiText.locationPage.controlPanel.floodReports[toggleLanguage.language]} number={stats?.floodreports !== undefined ? stats.floodreports : "-"}/>
                    <StatCard text={uiText.locationPage.controlPanel.avgDailyRainfall[toggleLanguage.language]} number={stats?.avgdailyrainfall !== undefined ? Math.round(stats.avgdailyrainfall) + "mm" : "-"}/>
                    <StatCard text={uiText.locationPage.controlPanel.citizenReports[toggleLanguage.language]} number={stats?.citizenreporters !== undefined ? stats.citizenreporters : "-"}/>
                </ControlDashboardStatCardBox>
                <WeatherCarousel weatherAPIToken={weatherAPIToken} locationData={locationData}/>
            </ControlDashboardInnerBox>
        </ControlDashboardOuterBox>
    );
}

const ControlDashboardOuterBox = styled(Box)(({theme}) => ({
    paddingTop: theme.spacing(4),
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    flexDirection: `column`
}))

const ControlDashboardInnerBox = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    width: `100%`,
    alignItems: `center`,
    [theme.breakpoints.down('1250')]: {
        flexDirection: `column`,
        alignItems: `center`,
    },
}))

const DateRangeText = styled(Typography)(({theme}) => ({
    fontSize: `14px`,
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
    },
}))

const ControlDashboardStatCardBox = styled(Box)(({theme}) => ({
    padding:` 20px 0 20px 0`,
    display: `flex`,
    width: `60%`,
    [theme.breakpoints.down('1250')]: {
        width: `75%`,
        justifyContent: `space-between`,
    },
    [theme.breakpoints.down('900')]: {
        width: `100%`,
    },
    [theme.breakpoints.down('550')]: {
        flexWrap: `wrap`,
        gap: `1em`,
        justifyContent: `center`
    },
}))

export default connect((state) => state)(ControlDashboard);