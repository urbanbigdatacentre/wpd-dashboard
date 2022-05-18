// Component for Rendering Weather Forecast Item in Weather Carousel

// Package Imports
import {connect} from "react-redux";
import {Card, styled, Typography, Box} from "@mui/material";
import Image from 'next/image';

// Local Imports
import uiText from "../../data/ui-text";
import weatherPaths from "../../data/weatherPaths";

// Weather Item Component

const WeatherItem = ({ toggleLanguage, data }) => {

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
            <Image alt={'weather icon'} src={weatherPaths[data.category]} width={60} height={60}/>
            <RightBox>
                <Temperature>{data.temperature + "°C"}</Temperature>
                <Weekday>{days[new Date(data.timestamp).getDay()].path[toggleLanguage.language]}</Weekday>
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
    width: `max-content`
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
    fontSize: `2.5rem`,
}))

const Weekday = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.light,
    fontWeight: `800`,
    fontSize: `1rem`,
}))



export default connect((state) => state)(WeatherItem)