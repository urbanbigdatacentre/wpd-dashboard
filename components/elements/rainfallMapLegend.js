// Component to render legend for rainfall map component


// Package Imports
import {connect} from "react-redux";
import {Box, Switch, styled, Typography, FormGroup, FormControlLabel} from "@mui/material";
import {useState} from "react";
import uiText from "../../data/ui-text";

// Local Imports
import {changeLanguage, setClusterStatus} from "../../store/actions";
import {bindActionCreators} from "redux";
import {usePromiseTracker} from "react-promise-tracker";

// Rainfall Map Legend Component

const RainfallMapLegend = ({toggleLanguage, toggleClusterStatus, setClusterStatus}) => {
    const { promiseInProgress } = usePromiseTracker({area: 'pluviometer-data', delay: 500});

    const handleChange = () => {
        setClusterStatus(!toggleClusterStatus.cluster)
    }

    return(
        !promiseInProgress && (
        <LegendWrapperBox>
            <LegendTitle sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.avgDailyRainfall[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span> </LegendTitle>
            <LegendDescription sx={{fontSize: `14px`}}>{uiText.global.tooltips.rainfallLegendDescription[toggleLanguage.language] + "Location"}</LegendDescription>
            <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`, marginBottom: (theme) => (theme.spacing(2))}}>
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
                    control={<ToggleClusterSwitch defaultChecked/>}
                    label={<Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >{uiText.global.tooltips.cluster[toggleLanguage.language].toUpperCase()}</Typography>}
                    labelPlacement="start"
                    onChange={handleChange}
                />
            </Box>
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
    maxWidth: theme.spacing(35),
    height: `260px`,
    top: theme.spacing(10),
    left: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #2196F3`,
    padding: theme.spacing(3),
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.25))`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        maxWidth: theme.spacing(25),
        top: theme.spacing(10),
        height: `175px`,
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
}));


const mapDispatchToProps = (dispatch) => {
    return {
        setClusterStatus: bindActionCreators(setClusterStatus, dispatch),
    }
}

export default connect((state)=>state, mapDispatchToProps)(RainfallMapLegend)