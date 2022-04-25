// Component to Render the Legend sitting within the National Overview Map (Landing Page)

// Package Imports
import {connect} from "react-redux";
import {styled, Box, Typography, Slider} from "@mui/material";

// Local Imports
import {bindActionCreators} from "redux";
import {changeRadius} from "../../store/actions";

// Overview Map Legend Component

const OverviewMapLegendComponent = ({ changeRadius, hexRadius}) => {

    // Handle Date Change
    const handleChange = (e) => {
        if (e.target.value !== null && Number.isInteger(e.target.value) && !Number.isNaN(e.target.value)) {
            // Change Redux Hex Radius value
            changeRadius(Number(e.target.value));
        }
    }

    return(
        <LegendWrapperBox>
            <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>NO. CITIZEN REPORTS</Typography>
            <Typography sx={{fontSize: `14px`}}>Data represents number of citizen reports submitted in the last 24 hours across the whole of Brazil.</Typography>
            <Box sx={{display: `flex`, flexDirection: `column`, width: `100%`}}>
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`, marginBottom: (theme) => (theme.spacing(2))}}>
                    <LegendCircle sx={{backgroundColor: `#1565C0`}}/>
                    <LegendCircle sx={{backgroundColor: `#2196F3`}}/>
                    <LegendCircle sx={{backgroundColor: `#00D1E1`}}/>
                    <LegendCircle sx={{backgroundColor: `#FFBA08`}}/>
                    <LegendCircle sx={{backgroundColor: `#FF8C42`}}/>
                    <LegendCircle sx={{backgroundColor: `#C23254`}}/>
                </Box>
                <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                    <Typography sx={{fontSize: `12px`}}>Fewer Reports</Typography>
                    <Typography sx={{fontSize: `12px`}}>More Reports</Typography>
                </Box>
            </Box>
            <Box sx={{display: `flex`, width: `100%`, justifyContent: `space-between`}}>
                <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >HEXAGON RADIUS</Typography>
                <Slider min={2000} max={40000} value={hexRadius} onChange={handleChange}/>
            </Box>
        </LegendWrapperBox>
    );
}

const LegendCircle = styled(Box)(({theme}) => ({
    borderRadius: `20px`,
    width: `20px`,
    height: `20px`
}))

const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    zIndex: 600,
    maxWidth: theme.spacing(35),
    height: `300px`,
    top: theme.spacing(14),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #2196F3`,
    padding: theme.spacing(3),
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.25))`
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