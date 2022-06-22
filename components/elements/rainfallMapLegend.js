// Component to render legend for rainfall map component


// Package Imports
import {connect} from "react-redux";
import {Box, Switch, styled, Typography, FormGroup, FormControlLabel} from "@mui/material";
import React, {useState} from "react";
import uiText from "../../data/ui-text";

// Local Imports
import {changeLanguage, setClusterStatus} from "../../store/actions";
import {bindActionCreators} from "redux";
import {usePromiseTracker} from "react-promise-tracker";
import * as d3 from "d3";
import LocationBox from "./locationBox";
import {locationColorKeys} from "../../data/colorMapping";

// Rainfall Map Legend Component
const RainfallMapLegend = ({ toggleLanguage, updatePluviometerData, toggleClusterStatus, setClusterStatus, toggleDate, toggleLocationPreference, mapStyleToggle }) => {
    const { promiseInProgress } = usePromiseTracker({area: 'pluviometer-data', delay: 500});
    const promiseInProgressTwo = usePromiseTracker({area: "RAIN_FORM", delay: 0});

    const handleChange = (e, v) => {
        setClusterStatus(v)
    }

    const colorIndex = updatePluviometerData.locations.findIndex(function(el){return el.id === toggleLocationPreference.locationID})

    const colorCode = colorIndex <= 0 ? '#2196F3' : locationColorKeys[colorIndex - 1].color

    return(
        ((!promiseInProgress) && (!promiseInProgressTwo.promiseInProgress)) && (
        <LegendWrapperBox>
            <LegendTitle sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.avgDailyRainfall[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span> </LegendTitle>
            <DateRangeText>{new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)).toLocaleString().split(',')[0] + " - " + new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)).toLocaleString().split(',')[0]}</DateRangeText>
            <LocationBox locationName={toggleLocationPreference.locationPreference} color={colorCode}/>
            <LegendDescription sx={{fontSize: `14px`}}>{uiText.global.tooltips.rainfallLegendDescription[toggleLanguage.language]}</LegendDescription>
            <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`, marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}}>
                    <LegendCircle sx={{backgroundColor: `#F7996F`}}/>
                    <LegendCircle sx={{backgroundColor: `#EB5A56`}}/>
                    <LegendCircle sx={{backgroundColor: `#DA4167`}}/>
                    <LegendCircle sx={{backgroundColor: `#993C7A`}}/>
                    <LegendCircle sx={{backgroundColor: `#5C2F60`}}/>
                </Box>
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                    <LegendText sx={{fontSize: `12px`}}>{uiText.global.tooltips.lower[toggleLanguage.language]}</LegendText>
                    <LegendText sx={{fontSize: `12px`, textAlign: `right`}}>{uiText.global.tooltips.higher[toggleLanguage.language]}</LegendText>
                </Box>
            </Box>
            <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                <ToggleFormControlLabel
                    control={<ToggleClusterSwitch checked={toggleClusterStatus.cluster}/>}
                    label={<Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >{uiText.global.tooltips.cluster[toggleLanguage.language].toUpperCase()}</Typography>}
                    labelPlacement="start"
                    onChange={(e, v) => handleChange(e,v)} value={toggleClusterStatus.cluster}
                />
            </Box>
            {/*<ToggleMapStyleButtonGroup mapStyleToggle={mapStyleToggle} />*/}
        </LegendWrapperBox>
        )
    );
}

const LegendCircle = styled(Box)(({theme}) => ({
    borderRadius: `20px`,
    width: `20px`,
    height: `20px`,
    [theme.breakpoints.down('sm')]: {
        width: `15px`,
        height: `15px`,
    },

}))

const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    zIndex: 600,
    maxWidth: theme.spacing(38),
    height: `auto`,
    top: theme.spacing(10),
    left: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #2196F3`,
    padding: theme.spacing(3),
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.25))`,
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0),
        top: theme.spacing(-20),
        position: `relative`,
        left: theme.spacing(0),
        right: theme.spacing(0),
        maxWidth: `55%`,
        filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0))`,
        border: `0px solid #2196F3`,
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: `65%`,
    },
    [theme.breakpoints.down('350')]: {
        maxWidth: `75%`,
    },
}))

const LegendText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: `10px`
    },
}))

const LegendTitle = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: `14px`
    },
}))

const LegendDescription = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        display: `none`
    },
}))

const ToggleFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    display: `flex`,
    justifyContent: `space-between`,
    width: `100%`,
    padding: `0`,
    margin: `0`,
    [theme.breakpoints.down('md')]: {
        display: `none`
    },
}))

const ToggleClusterSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
    [theme.breakpoints.down('md')]: {
        display: `none`
    },
}));

const DateRangeText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightLight
}))


const mapDispatchToProps = (dispatch) => {
    return {
        setClusterStatus: bindActionCreators(setClusterStatus, dispatch),
    }
}

export default connect((state)=>state, mapDispatchToProps)(RainfallMapLegend)