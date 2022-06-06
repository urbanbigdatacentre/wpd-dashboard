// Component to Render the Legend sitting within the National Overview Map (Landing Page)

// Package Imports
import {connect} from "react-redux";
import {styled, Box, Typography, Slider} from "@mui/material";

// Local Imports
import {bindActionCreators} from "redux";
import {changeRadius} from "../../store/actions";
import {usePromiseTracker} from "react-promise-tracker";

// Overview Map Legend Component

const OverviewMapLegendComponent = ({ changeRadius, hexRadius}) => {

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
                <LegendTitle sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>NO. CITIZEN REPORTS</LegendTitle>
                <LegendDescription sx={{fontSize: `14px`}}>Data represents number of citizen reports submitted in the last 24 hours across the whole of Brazil.</LegendDescription>
                <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                    <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`, marginBottom: (theme) => (theme.spacing(2))}}>
                        <LegendCircle sx={{backgroundColor: `#F7996F`}}/>
                        <LegendCircle sx={{backgroundColor: `#EB5A56`}}/>
                        <LegendCircle sx={{backgroundColor: `#DA4167`}}/>
                        <LegendCircle sx={{backgroundColor: `#993C7A`}}/>
                        <LegendCircle sx={{backgroundColor: `#5C2F60`}}/>
                    </Box>
                    <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                        <LegendText sx={{fontSize: `12px`}}>Fewer Reports</LegendText>
                        <LegendText sx={{fontSize: `12px`, textAlign: `right`}}>More Reports</LegendText>
                    </Box>
                </Box>
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >HEXAGON RADIUS</Typography>
                    <Slider min={20000} max={200000} value={hexRadius} onChange={handleChange}/>
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
    zIndex: 101,
    maxWidth: theme.spacing(35),
    height: `300px`,
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

// REDUX CONNECTIONS
// Map State + Dispatch to Props

const mapStateToProps = (state) => {
    return {
        hexRadius: state.changeRadiusWithSlider.hexRadius
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeRadius: bindActionCreators(changeRadius, dispatch),
    }
}


// Export Component & Connect to Store
export default connect(mapStateToProps, mapDispatchToProps)(OverviewMapLegendComponent)