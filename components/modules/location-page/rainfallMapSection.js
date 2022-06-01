// Component used to render all child components of the rainfall map on the location specific page

// Package Imports
import {connect} from "react-redux";
import {Box, Container, Divider, Typography} from "@mui/material";
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
        <Container className={styles.visSectionContainer}>
            <Box className={styles.textLegendWrapper}>
                <Box className={styles.textWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    <Box >
                        <MyTooltip title={uiText.locationPage.rainfallMap.title[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.descriptionParOne[toggleLanguage.language] + "\n" + uiText.locationPage.rainfallMap.descriptionParTwo[toggleLanguage.language]}/>
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[toggleLanguage.language]}</Typography>
                    </Box>
                    <Typography variant={'title'}>{uiText.locationPage.rainfallMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                    <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginTop: (theme) => (theme.spacing(1))}}/>

                </Box>
                <Box className={styles.legendWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/official-pluviometer.png'} width={31} height={46} alt={"rainfall map - official pluviometer icon"} />
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.rainfallMap.legendOfficial[toggleLanguage.language]}</Typography>
                        <MyTooltip title={uiText.locationPage.rainfallMap.legendOfficial[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.officialPluviometerTooltip[toggleLanguage.language]}/>
                    </Box>
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/citizen-pluviometer.png'} width={31} height={30} alt={"rainfall map - citizen pluviometer icon"} />
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.rainfallMap.legendCitizen[toggleLanguage.language]}</Typography>
                        <MyTooltip title={uiText.locationPage.rainfallMap.legendCitizen[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.citizenPluviometerTooltip[toggleLanguage.language]}/>
                    </Box>
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/citizen-submitted-rainfall-event.png'} width={30} height={50} alt={"rainfall map - citizen submitted rainfall event icon"} />
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language]}</Typography>
                        <MyTooltip title={uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language]} text={uiText.locationPage.rainfallMap.citizenRainfallEventTooltip[toggleLanguage.language]}/>
                    </Box>
                </Box>
            </Box>
            <Box>
                {/*INSERT VIS LAYOUT HERE*/}
                <FramedMapContainer mapBoxToken={mapBoxToken} mapType={"RainfallMap"} ctx={ctx}/>
            </Box>
        </Container>
    );
}

export default connect((state) => state)(RainfallMapSection)