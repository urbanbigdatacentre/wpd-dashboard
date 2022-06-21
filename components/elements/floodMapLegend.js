// Component used to render legend for Flood Map allowing users to scroll between flood risk zones

// Package Imports
import {connect} from "react-redux";
import {Box, Divider, FormControlLabel, styled, Switch, Typography} from "@mui/material";
import {IconButton, Tooltip, Alert, AlertTitle} from "@mui/material";
import {usePromiseTracker} from "react-promise-tracker";
import uiText from "../../data/ui-text";
import FloodMapZonesCarousel from "./floodMapZonesCarousel";
import locationPaths from "../../data/locationPaths";
import LocationBox from "./locationBox";
import {locationColorKeys} from "../../data/colorMapping";
import {bindActionCreators} from "redux";
import {setClusterStatus} from "../../store/actions";
import React from "react";
import ToggleMapStyleButtonGroup from "./toggleMapStyleButtonGroup";
// Local Imports

// FloodMapLegend Component

const FloodMapLegend = ({toggleLanguage, updateFloodData, toggleLocationPreference, mapBoxToken, setClusterStatus, toggleClusterStatus, refreshButtonComponent, mapStyleToggle}) => {

    const { promiseInProgress } = usePromiseTracker({area: 'floodzones-data', delay: 0});

    const handleChange = (e, v) => {
        setClusterStatus(v)
    }

    // Find Current Flood Zones Data
    const floodZonesDataFilter = updateFloodData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    const floodDataArray = floodZonesDataFilter.length ? floodZonesDataFilter[0].floodData : [];

    const colorIndex = updateFloodData.locations.findIndex(function(el){return el.id === toggleLocationPreference.locationID})

    const colorCode = colorIndex <= 0 ? '#2196F3' : locationColorKeys[colorIndex - 1]?.color


    return (
        !promiseInProgress && (
            <LegendWrapperBox>
                <LegendTitle sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), marginBottom: (theme) => (theme.spacing(1))}}>{uiText.global.tooltips.browseRiskZones[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span> </LegendTitle>
                <FloodMapInfo sx={{marginBottom: (theme) => (theme.spacing(1))}}>{uiText.locationPage.floodMap.floodMapInfo[toggleLanguage.language]}</FloodMapInfo>

                {/*<LocationBox locationName={toggleLocationPreference.locationPreference} color={colorCode}/>*/}
                <NoFloodZonesText sx={{marginBottom: floodDataArray.length ? (theme) => (theme.spacing(2)): 0}}><span style={{fontWeight: `800`}}>{floodDataArray.length !== 500 ? floodDataArray.length + " " : floodDataArray.length + "+ "}</span>{uiText.locationPage.floodMap.riskAreas[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></NoFloodZonesText>
                {floodDataArray.length === 500 ? <MyAlert sx={{border: `1px solid #2196F3`, fontSize: `13px`}} severity={"info"}>
                    <AlertTitle>{uiText.locationPage.floodMap.floodMapAlertTitle[toggleLanguage.language]}</AlertTitle>
                    {uiText.locationPage.floodMap.floodMapAlert[toggleLanguage.language]}
                </MyAlert> : null}
                {/*<FloodMapZonesCarousel mapBoxToken={mapBoxToken} data={floodDataArray}/>*/}


                {floodDataArray.length ? <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                    <Box sx={{
                        display: `flex`,
                        width: `100%`,
                        justifyContent: `space-between`,
                        marginTop: (theme) => (theme.spacing(1)),
                        marginBottom: (theme) => (theme.spacing(2))
                    }}>
                        <LegendCircle sx={{backgroundColor: `#F7996F`}}/>
                        <LegendCircle sx={{backgroundColor: `#DA4167`}}/>
                        <LegendCircle sx={{backgroundColor: `#5C2F60`}}/>
                    </Box>
                    <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                        <LegendText
                            sx={{fontSize: `12px`}}>{uiText.global.tooltips.lower[toggleLanguage.language] + " " + uiText.global.tooltips.risk[toggleLanguage.language]}</LegendText>
                        <LegendText sx={{
                            fontSize: `12px`,
                            textAlign: `right`
                        }}>{uiText.global.tooltips.higher[toggleLanguage.language] + " " + uiText.global.tooltips.risk[toggleLanguage.language]}</LegendText>
                    </Box>

                </Box>: null}
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                    <ToggleFormControlLabel
                        control={<ToggleClusterSwitch onChange={(e, v) => handleChange(e,v)} checked={toggleClusterStatus.cluster}/>}
                        label={<Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >{uiText.global.tooltips.cluster[toggleLanguage.language].toUpperCase() + " " + uiText.global.tooltips.floodEvents[toggleLanguage.language].toUpperCase()}</Typography>}
                        labelPlacement="start"
                    />
                </Box>
                <ToggleMapStyleButtonGroup mapStyleToggle={mapStyleToggle} />
                {/*SPACE TO INCLUDE CAROUSEL TO SWITCH BETWEEN MAP VIEWS*/}
                {refreshButtonComponent}
            </LegendWrapperBox>
        )
    );
}

const NoFloodZonesText = styled(Typography)(({theme}) => ({
    fontWeight: `400`,
    marginTop: theme.spacing(1),
    fontSize: `14px`,
    [theme.breakpoints.down('md')]: {
        marginBottom: `0`
    },
}))

const MyAlert = styled(Alert)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        display: `none`
    },
}))

const LegendCircle = styled(Box)(({theme}) => ({
    borderRadius: `20px`,
    width: `30px`,
    height: `30px`,
    [theme.breakpoints.down('md')]: {
        width: `20px`,
        height: `20px`,
    },
    [theme.breakpoints.down('sm')]: {
        width: `15px`,
        height: `15px`,
    },

}))

const FloodMapInfo = styled(Typography)(({theme}) => ({
    fontSize: `13px`,
    color: `#2196F3`
}))


const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    zIndex: 600,
    maxWidth: theme.spacing(40),
    minWidth: theme.spacing(40),
    height: `max-content`,
    top: theme.spacing(10),
    left: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #2196F3`,
    padding: theme.spacing(3),
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.25))`,
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
        maxWidth: theme.spacing(28),
        minWidth: theme.spacing(28),
        height: `auto`,
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        maxWidth: theme.spacing(23),
        minWidth: theme.spacing(23),
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        top: `auto`,
    },
    [theme.breakpoints.down('350')]: {
        top: theme.spacing(6),
    },
}))

const LegendText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: `10px`
    },
}))

const LegendTitle = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: `14px`
    },
}))

const LegendDescription = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        display: `none`
    },
}))



const ToggleFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    display: `flex`,
    justifyContent: `space-between`,
    width: `100%`,
    padding: `0`,
    margin: `0`,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('700')]: {
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
    [theme.breakpoints.down('700')]: {
        display: `none`
    },
}));


const mapDispatchToProps = (dispatch) => {
    return {
        setClusterStatus: bindActionCreators(setClusterStatus, dispatch),
    }
}

export default connect((state)=>state, mapDispatchToProps)(FloodMapLegend)