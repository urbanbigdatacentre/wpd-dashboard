// Component used to toggle between monochrome and satellite map views

// Package Imports
import {Box, styled, Typography} from "@mui/material";
import uiText from "../../data/ui-text";
import React from "react";
import {connect} from "react-redux";

// Local Imports

// Toggle Map Style Button Group Component
const ToggleMapStyleButtonGroup = ({toggleLanguage, mapStyleToggle}) => {

    return (
        <ToggleMapStyleBox sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(1)), display: `flex`, width: `100%`, justifyContent: `space-between`, alignItems: `center`}}>
            <Typography sx={{width: `max-content`, fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >{uiText.locationPage.floodMap.mapStyle[toggleLanguage.language].toUpperCase()}</Typography>
            {mapStyleToggle}
        </ToggleMapStyleBox>
    );
}

const ToggleMapStyleBox = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: `100%`,
    [theme.breakpoints.down('md')]: {
        display: `none`
    },
}))

export default connect((state) => state)(ToggleMapStyleButtonGroup);