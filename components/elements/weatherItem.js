// Component for Rendering Weather Forecast Item in Weather Carousel

// Package Imports
import {connect} from "react-redux";
import {Card, styled, Typography, Box} from "@mui/material";
import Image from 'next/image';

// Local Imports
import uiText from "../../data/ui-text";
import weatherPaths from "../../data/weatherPaths";
import {useEffect, useState} from "react";

// Weather Item Component

const WeatherItem = ({ toggleLanguage, data, weekdayIndex }) => {

    const days = [
        {
            path: uiText.global.days.sunday
        },
        {
            path: uiText.global.days.monday
        },
        {
            path: uiText.global.days.tuesday
        },
        {
            path: uiText.global.days.wednesday
        },
        {
            path: uiText.global.days.thursday
        },
        {
            path: uiText.global.days.friday
        },
        {
            path: uiText.global.days.saturday
        }
    ]

    return (
        <WeatherCard>
            <Image alt={'weather icon'} src={weatherPaths[data.weather[0]['icon']].path} width={80} height={80}/>
            <RightBox>
                <Temperature>{Math.round(data.temp['day']) + "°C"}</Temperature>
                <Weekday>{days[(new Date().getDay() + weekdayIndex) % 7].path[toggleLanguage.language] }</Weekday>
                <DateText>{new Date(data.dt * 1000).toLocaleDateString()}</DateText>
            </RightBox>
        </WeatherCard>
    );
}

const WeatherCard = styled(Card)(({theme}) => ({
    display: `flex`,
    background: `linear-gradient(180deg, #0291E6 0%, #1565C0 100%)`,
    padding: `0rem 1rem`,
    boxShadow: `none`,
    textAlign: `center`,
    width: `max-content`,
    [theme.breakpoints.down('1250')]: {
        padding: `0rem .25rem`,
    },
}))

const RightBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    padding: `1rem 1rem`,
    boxShadow: `none`,
    textAlign: `center`,
    width: `max-content`
}))

const Temperature = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.light,
    fontWeight: `800`,
    fontSize: `35px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `30px`,
    },
}))

const Weekday = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.light,
    fontWeight: `800`,
    fontSize: `1rem`,
}))

const DateText = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.light,
    fontWeight: `300`,
    fontSize: `.75rem`,
}))



export default connect((state) => state)(WeatherItem)