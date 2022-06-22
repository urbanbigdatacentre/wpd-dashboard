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
import rainfallScaleColorMapping from "../../../data/rainfallScaleColorMapping";

// Style Imports
import styles from '../../../styles/modules/location-page/VisSectionLayout.module.css';


// Rainfall Map Component

const RainfallMapSection = ({ toggleLanguage, mapBoxToken, ctx }) => {

    return (
        <VisSectionContainer className={styles.visSectionContainer}>
            <Box className={styles.textLegendWrapper}>
                <Box className={styles.textWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    <Box >
                        <MyTooltip title={uiText.locationPage.rainfallMap.title[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.descriptionParOne[toggleLanguage.language] + "\n" + uiText.locationPage.rainfallMap.descriptionParTwo[toggleLanguage.language]}/>
                        <HelpText sx={{marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[toggleLanguage.language]}</HelpText>
                    </Box>
                    <ChartTitle>{uiText.locationPage.rainfallMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></ChartTitle>
                    <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginTop: (theme) => (theme.spacing(1))}}/>

                </Box>
                <Box className={styles.legendWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    {/*<Box className={styles.legendInlineBox}>*/}
                    {/*    <Image src={'/images/icons/official-pluviometer.png'} width={31} height={46} alt={"rainfall map - official pluviometer icon"} />*/}
                    {/*    <HelpText sx={{textAlign: `right`, marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.rainfallMap.legendOfficial[toggleLanguage.language]}</HelpText>*/}
                    {/*    <MyTooltip title={uiText.locationPage.rainfallMap.legendOfficial[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.officialPluviometerTooltip[toggleLanguage.language]}/>*/}
                    {/*</Box>*/}
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/citizen-pluviometer.png'} width={31} height={30} alt={"rainfall map - citizen pluviometer icon"} />
                        <HelpText sx={{textAlign: `right`, marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.rainfallMap.legendCitizen[toggleLanguage.language]}</HelpText>
                        <MyTooltip title={uiText.locationPage.rainfallMap.legendCitizen[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.citizenPluviometerTooltip[toggleLanguage.language]}/>
                    </Box>
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/citizen-submitted-rainfall-event.png'} width={30} height={50} alt={"rainfall map - citizen submitted rainfall event icon"} />
                        <HelpText sx={{textAlign: `right`,marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language]}</HelpText>
                        <MyTooltip title={uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.citizenRainfallEventTooltip[toggleLanguage.language]}/>
                    </Box>
                </Box>
            </Box>
            <Box>
                {/*INSERT VIS LAYOUT HERE*/}
                <FramedMapContainer mapBoxToken={mapBoxToken} mapType={"RainfallMap"} ctx={ctx}/>
            </Box>
        </VisSectionContainer>
    );
}

const VisSectionContainer = styled(Container)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(-20),
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
}))

const HelpText = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `16px`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
        marginLeft: theme.spacing(1),
        textAlign: `left`
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

export default connect((state) => state)(RainfallMapSection)