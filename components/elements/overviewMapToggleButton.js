// Component used to switch between data views on the landing page - national overview map

// Package Imports
import {connect} from "react-redux";
import {ToggleButton, ButtonGroup, styled, Box, Button} from "@mui/material";
import uiText from "../../data/ui-text";
import {changeSearchTerm, setOverviewMapView} from "../../store/actions";
import {bindActionCreators} from "redux";
// Local Imports


// Overview Map Toggle Button Component

const OverviewMapToggleButton = ({toggleLanguage, changeOverviewMapView, setOverviewMapView}) => {

    const handleClick = (e) => {
        if (e.target.value !== changeOverviewMapView.mapView) {setOverviewMapView(e.target.value)}
    }

    const citizenReportsValue = "Citizen Reports";
    const tweetsValue = "Tweets";
    const avgDailyRainfallValue = "Avg Daily Rainfall";

    return (
        <ButtonGroupBox aria-label={'overview map legend'}>
            <MyToggleButton value={citizenReportsValue} variant={citizenReportsValue === changeOverviewMapView.mapView ? 'contained': 'outlined'} onClick={handleClick}>
                {uiText.locationPage.controlPanel.citizenReports[toggleLanguage.language]}
            </MyToggleButton>
            {/*COMMENT OUT TWEETS FOR NOW*/}
            {/*<MyToggleButton value={tweetsValue} variant={tweetsValue === changeOverviewMapView.mapView ? 'contained': 'outlined'} onClick={handleClick}>*/}
            {/*    {uiText.global.labels.tweets[toggleLanguage.language]}*/}
            {/*</MyToggleButton>*/}
            <MyToggleButton value={avgDailyRainfallValue} variant={avgDailyRainfallValue === changeOverviewMapView.mapView ? 'contained': 'outlined'} onClick={handleClick}>
                {uiText.global.tooltips.avgDailyRainfall[toggleLanguage.language]}
            </MyToggleButton>
        </ButtonGroupBox>
    );
}

const ButtonGroupBox = styled(ButtonGroup)(({theme}) => ({
    position: `absolute`,
    top: theme.spacing(6),
    left: theme.spacing(1),
    zIndex: `500`,
    boxShadow :`0px 0px 15px rgba(33, 150, 243, 0.25)`,
    backgroundColor: `#fff`,
    '& .MuiToggleButton-root': {
        margin: `5px 5px`,
        padding: `0px 15px`,
        '&.Mui-selected': {
            color: theme.palette.primary.main,
            '&:hover, &.Mui-focusVisible': {
                color: theme.palette.primary.main,
            },
        },
    },
    '& .MuiToggleButtonGroup-grouped': {
        '&.MuiToggleButtonGroup-grouped:not(:last-of-type), &.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
            borderRadius: `5px`,
        },
        border: 0,
        color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down('md')]: {
        top: theme.spacing(-1),
        left: theme.spacing(0),
    },
}))

const MyToggleButton = styled(Button)(({theme}) => ({
    boxShadow :`none`,
    '&:hover, &.Mui-focusVisible': {
        backgroundColor: '#1565C0',
        color: '#fff',
        boxShadow :`none`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`
    },
    [theme.breakpoints.down('400')]: {
        padding: `5px 6px`,
        fontSize: `11px`
    },

}))

const mapDispatchToProps = (dispatch) => {
    return {
        setOverviewMapView: bindActionCreators(setOverviewMapView, dispatch),
    }
}

export default connect((state)=>state, mapDispatchToProps)(OverviewMapToggleButton)