// Carousel Item used to represent Flood Map Risk Zone

// Package Imports
import {connect} from "react-redux";
import {Box, Card, styled, Typography} from "@mui/material";
import React, {useCallback, useRef, useState} from "react";
import Image from "next/image";
import weatherPaths from "../../data/weatherPaths";
import uiText from "../../data/ui-text";
// Local Imports

// Flood Map Carousel Item Component
const FloodMapCarouselItem = ({ data, index, toggleLanguage}) => {

    const classMapping = {
        "Baixa": "#F7996F",
        "Média": "#DA4167",
        "Alta": "#5C2F60",
    }

    const typeMapping = {
        "O": uiText.locationPage.floodMap.officialTitle[toggleLanguage.language],
        "C": uiText.locationPage.floodMap.citizenPerceptionTitle[toggleLanguage.language],
    }

    return (
        <ZoneCard>
            <LeftBox>
                <ZoneText>{uiText.global.tooltips.zone[toggleLanguage.language] + " " + (index+ 1)}</ZoneText>
                <OfficialCitizenText>{typeMapping[data.submissiontype]}</OfficialCitizenText>
            </LeftBox>
            <LegendCircle sx={{backgroundColor: classMapping[data['classvalue']]}}/>
        </ZoneCard>
    );
}

const ZoneCard = styled(Card)(({theme}) => ({
    display: `flex`,
    padding: `0rem 1rem`,
    boxShadow: `none`,
    alignItems: `center`,
    width: `max-content`,

    [theme.breakpoints.down('1250')]: {
        padding: `0rem .25rem`,
    },
}))

const ZoneText = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    textAlign: `left`,
    fontWeight: theme.typography.fontWeightBold
}))

const OfficialCitizenText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    fontWeight: theme.typography.fontWeightLight,
    textAlign: `left`,
    width: `max-content`
}))

const LeftBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    marginBottom: theme.spacing(2),
    boxShadow: `none`,
    textAlign: `center`,
    marginRight: theme.spacing(2)

}))

const LegendCircle = styled(Box)(({theme}) => ({
    width: `35px`,
    height: `35px`,
    borderRadius: `50px`
}))

export default connect((state) => state)(FloodMapCarouselItem)