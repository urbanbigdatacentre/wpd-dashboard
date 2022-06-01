// Control Dashboard Element - Used for Layout and rendering of Stat Bars + Weather Carousel


// Package Imports
import {connect} from "react-redux";
import styles from "../../styles/modules/location-page/ControlPanel.module.css";
import {Box, Typography, Container, styled, Divider} from "@mui/material";
import uiText from "../../data/ui-text";
import StatCard from "./statCard";
import LocationBox from "./locationBox";
import locationPaths from "../../data/locationPaths";
import WeatherCarousel from "./weatherCarousel";

// Local Imports


// Control Dashboard Component


const ControlDashboard = ({ toggleLanguage, locationData, color, weatherAPIToken }) => {

    return (
        <ControlDashboardOuterBox >
            <LocationBox locationName={locationPaths[locationData['placetype']].text} color={color}/>
            <Typography sx={{paddingTop: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold), color: color}}>{locationData['placename'].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
            <Divider sx={{width: `100%`}}/>
            <ControlDashboardInnerBox >
                <ControlDashboardStatCardBox>
                    <StatCard firstInSequence={true} text={uiText.locationPage.controlPanel.floodReports[toggleLanguage.language]} number={34}/>
                    <StatCard text={uiText.locationPage.controlPanel.avgDailyRainfall[toggleLanguage.language]} number={34}/>
                    <StatCard text={uiText.locationPage.controlPanel.citizenReports[toggleLanguage.language]} number={34}/>
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
        alignItems: `flex-start`,
    },
}))

const ControlDashboardStatCardBox = styled(Box)(({theme}) => ({
    padding:` 20px 0 20px 0`,
    display: `flex`,
    width: `60%`
}))

export default connect((state) => state)(ControlDashboard);