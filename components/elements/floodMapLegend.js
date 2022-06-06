// Component used to render legend for Flood Map allowing users to scroll between flood risk zones

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Typography} from "@mui/material";
import {usePromiseTracker} from "react-promise-tracker";
import uiText from "../../data/ui-text";
import FloodMapZonesCarousel from "./floodMapZonesCarousel";
import locationPaths from "../../data/locationPaths";
import LocationBox from "./locationBox";
import {locationColorKeys} from "../../data/colorMapping";
// Local Imports

// FloodMapLegend Component

const FloodMapLegend = ({toggleLanguage, updateFloodData, toggleLocationPreference, mapBoxToken}) => {

    const { promiseInProgress } = usePromiseTracker({area: 'floodzones-data', delay: 0});

    // Find Current Flood Zones Data
    const floodZonesDataFilter = updateFloodData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    const floodDataArray = floodZonesDataFilter.length ? floodZonesDataFilter[0].floodData : [];

    const colorIndex = updateFloodData.locations.findIndex(function(el){return el.id === toggleLocationPreference.locationID})

    const colorCode = colorIndex <= 0 ? '#2196F3' : locationColorKeys[colorIndex - 1].color


    return (
        !promiseInProgress && (
            <LegendWrapperBox>
                <LegendTitle sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), marginBottom: (theme) => (theme.spacing(2))}}>{uiText.global.tooltips.browseRiskZones[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span> </LegendTitle>
                <LocationBox locationName={toggleLocationPreference.locationPreference} color={colorCode}/>
                <NoFloodZonesText sx={{marginBottom: floodDataArray.length ? (theme) => (theme.spacing(2)): 0}}><span style={{fontWeight: `800`}}>{floodDataArray.length + " "}</span>{uiText.locationPage.floodMap.riskAreas[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></NoFloodZonesText>
                <FloodMapZonesCarousel mapBoxToken={mapBoxToken} data={floodDataArray}/>

                {floodDataArray.length ? <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                    <Box sx={{
                        display: `flex`,
                        width: `100%`,
                        justifyContent: `space-between`,
                        marginTop: (theme) => (theme.spacing(2)),
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
                {/*SPACE TO INCLUDE CAROUSEL TO SWITCH BETWEEN MAP VIEWS*/}

            </LegendWrapperBox>
        )
    );
}

const NoFloodZonesText = styled(Typography)(({theme}) => ({
    fontWeight: `400`,
    marginTop: theme.spacing(1),
    fontSize: `14px`
}))


const LegendCircle = styled(Box)(({theme}) => ({
    borderRadius: `20px`,
    width: `30px`,
    height: `30px`,
    [theme.breakpoints.down('sm')]: {
        width: `15px`,
        height: `15px`,
    },

}))

const DescriptionBox = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: `100%`,
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