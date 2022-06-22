// Component used to render all child components of the rainfall map on the location specific page

// Package Imports
import {connect} from "react-redux";
import {Box, Container, Divider, styled, Typography} from "@mui/material";
import Image from "next/image";
import React, {useState} from "react";

// Local Imports
import uiText from "../../../data/ui-text";
import FramedMapContainer from "../../layouts/framedMapContainer";
import MyTooltip from "../../elements/tooltip";

// Style Imports
import styles from '../../../styles/modules/location-page/VisSectionLayout.module.css';


// Rainfall Map Component

const FloodMapSection = ({ toggleLanguage, mapBoxToken }) => {

    return (
        <VisSectionContainer className={styles.visSectionContainer}>
            <Box className={styles.textLegendWrapper}>
                <Box className={styles.textWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    <Box>
                        <MyTooltip title={uiText.locationPage.floodMap.title[toggleLanguage.language]} text={uiText.locationPage.floodMap.descriptionParOne[toggleLanguage.language] + "\n" + uiText.locationPage.floodMap.descriptionParTwo[toggleLanguage.language]}/>
                        <HelpText sx={{marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[toggleLanguage.language]}</HelpText>
                    </Box>
                    <ChartTitle>{uiText.locationPage.floodMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></ChartTitle>
                    <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                </Box>
                <LegendWrapperBox  className={styles.legendWrapper}>
                    <Box className={styles.legendInlineBox}>
                        <span style={{backgroundColor: `#DA4167`}} className={styles.colorScaleCircle}/>
                        <HelpText sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.floodMap.officialTitle[toggleLanguage.language]}</HelpText>
                        <MyTooltip title={uiText.locationPage.floodMap.officialTitle[toggleLanguage.language]} text={uiText.locationPage.floodMap.officialDescription[toggleLanguage.language]}/>
                    </Box>
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/citizen-submitted-rainfall-event.png'} width={30} height={50} alt={"rainfall map - citizen submitted rainfall event icon"} />
                        <HelpText sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language]}</HelpText>
                        <MyTooltip title={uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language]} text={uiText.locationPage.floodMap.floodEventDescription[toggleLanguage.language]}/>
                    </Box>
                </LegendWrapperBox>
            </Box>
            <Box>
                {/*INSERT VIS LAYOUT HERE*/}
                <FramedMapContainer mapType={"FloodMap"} mapBoxToken={mapBoxToken}/>
            </Box>
        </VisSectionContainer>
    );
}

const VisSectionContainer = styled(Container)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
}))

const LegendWrapperBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        marginBottom: `225px !important`,
    },
}))

const HelpText = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `16px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
        marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

const ChartTitle = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `45px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `40px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `30px`,
    },
}))

export default connect((state) => state)(FloodMapSection)