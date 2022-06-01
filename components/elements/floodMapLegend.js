// Component used to render legend for Flood Map allowing users to scroll between flood risk zones

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Typography} from "@mui/material";
import {usePromiseTracker} from "react-promise-tracker";
import uiText from "../../data/ui-text";
import FloodMapZonesCarousel from "./floodMapZonesCarousel";
// Local Imports

// FloodMapLegend Component

const FloodMapLegend = ({toggleLanguage, updateFloodData, toggleLocationPreference}) => {

    const { promiseInProgress } = usePromiseTracker({area: 'floodzones-data', delay: 0});

    // Find Current Flood Zones Data
    const floodZonesDataFilter = updateFloodData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    const floodDataArray = floodZonesDataFilter.length ? floodZonesDataFilter[0].floodData : []

    return (
        !promiseInProgress && (
            <LegendWrapperBox>
                <LegendTitle sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.browseRiskZones[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span> </LegendTitle>
                <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                    <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`, marginBottom: (theme) => (theme.spacing(2))}}>
                        <LegendCircle sx={{backgroundColor: `#F7996F`}}/>
                        <LegendCircle sx={{backgroundColor: `#DA4167`}}/>
                        <LegendCircle sx={{backgroundColor: `#5C2F60`}}/>
                    </Box>
                    <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                        <LegendText sx={{fontSize: `12px`}}>{uiText.global.tooltips.lower[toggleLanguage.language] + " " + uiText.global.tooltips.risk[toggleLanguage.language]}</LegendText>
                        <LegendText sx={{fontSize: `12px`, textAlign: `right`}}>{uiText.global.tooltips.higher[toggleLanguage.language] + " " + uiText.global.tooltips.risk[toggleLanguage.language]}</LegendText>
                    </Box>
                </Box>
                {/*SPACE TO INCLUDE CAROUSEL TO SWITCH BETWEEN MAP VIEWS*/}
                <FloodMapZonesCarousel data={floodDataArray}/>
            </LegendWrapperBox>
        )
    );
}

const LegendCircle = styled(Box)(({theme}) => ({
    borderRadius: `20px`,
    width: `30px`,
    height: `30px`,
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


export default connect((state)=>state)(FloodMapLegend)