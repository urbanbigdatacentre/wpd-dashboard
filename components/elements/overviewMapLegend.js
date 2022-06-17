// Component to Render the Legend sitting within the National Overview Map (Landing Page)

// Package Imports
import {connect} from "react-redux";
import {styled, Box, Typography, Slider} from "@mui/material";

// Local Imports
import {bindActionCreators} from "redux";
import {changeRadius} from "../../store/actions";
import {usePromiseTracker} from "react-promise-tracker";
import uiText from "../../data/ui-text";
import LocationBox from "./locationBox";
import * as d3 from "d3";

// Overview Map Legend Component

const OverviewMapLegendComponent = ({ changeRadius, changeRadiusWithSlider, toggleLanguage, changeOverviewMapView, toggleDate}) => {

    const { promiseInProgress } = usePromiseTracker({area: "national-overview-map", delay: 500})

    // Handle Date Change
    const handleChange = (e) => {
        if (e.target.value !== null && Number.isInteger(e.target.value) && !Number.isNaN(e.target.value)) {
            // Change Redux Hex Radius value
            changeRadius(Number(e.target.value));
        }
    }


    return(

        !promiseInProgress && (
            <LegendWrapperBox>
                <LegendTitle sx={{marginBottom: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.landingPage.nationalActivityMap[changeOverviewMapView.mapView].title[toggleLanguage.language].toUpperCase()}</LegendTitle>
                <DateRangeText>{new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)).toLocaleString().split(',')[0] + " - " + new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)).toLocaleString().split(',')[0]}</DateRangeText>
                <LegendDescription>{uiText.landingPage.nationalActivityMap[changeOverviewMapView.mapView].description[toggleLanguage.language]}</LegendDescription>
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
                <HexBox sx={{display: `flex`, width: `100%`, justifyContent: `space-between`, marginTop: (theme) => (theme.spacing(2))}}>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >{uiText.global.tooltips.hexagonRadius[toggleLanguage.language].toUpperCase()}</Typography>
                    <Slider min={20000} max={200000} value={changeRadiusWithSlider.hexRadius} onChange={handleChange}/>
                </HexBox>
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

const HexBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        display: `none`
    },
}))

const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    zIndex: 101,
    maxWidth: theme.spacing(35),
    height: `auto`,
    top: theme.spacing(14),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #2196F3`,
    padding: theme.spacing(3),
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.25))`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        maxWidth: theme.spacing(25),
        top: theme.spacing(10),
        height: `auto`,
    },
    [theme.breakpoints.down('420')]: {
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
    fontSize: `13px`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        display: `none`
    },
}))

const DateRangeText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
    },
}))


// REDUX CONNECTIONS
// Map Dispatch to Props

const mapDispatchToProps = (dispatch) => {
    return {
        changeRadius: bindActionCreators(changeRadius, dispatch),
    }
}


// Export Component & Connect to Store
export default connect((state) => state, mapDispatchToProps)(OverviewMapLegendComponent)