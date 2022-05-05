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

// Style Imports
import styles from '../../../styles/modules/location-page/VisSectionLayout.module.css';


// Rainfall Map Component

const FloodMapSection = ({ toggleLanguage, mapBoxToken }) => {

    return (
        <Container className={styles.visSectionContainer}>
            <Box className={styles.textLegendWrapper}>
                <Box className={styles.textWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    <Typography variant={'title'}>{uiText.locationPage.floodMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                    <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                    <Typography variant={'description'}>{uiText.locationPage.floodMap.descriptionParOne[toggleLanguage.language]}</Typography>
                    <Typography sx={{marginTop: (theme) => (theme.spacing(1))}} variant={'description'}>{uiText.locationPage.floodMap.descriptionParTwo[toggleLanguage.language]}</Typography>

                </Box>
                <Box className={styles.legendWrapper}>
                    {/*INSERT TEXT LAYOUT HERE*/}
                    <Box className={styles.legendInlineBox}>
                        <span style={{backgroundColor: `#1565C0`}} className={styles.colorScaleCircle}/>
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.floodMap.citizenPerceptionTitle[toggleLanguage.language]}</Typography>
                        <MyTooltip title={uiText.locationPage.floodMap.citizenPerceptionTitle[toggleLanguage.language]} text={uiText.locationPage.floodMap.citizenPerceptionDescription[toggleLanguage.language]}/>
                    </Box>
                    <Box className={styles.legendInlineBox}>
                        <span style={{backgroundColor: `#00D1E1`}} className={styles.colorScaleCircle}/>
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.floodMap.officialTitle[toggleLanguage.language]}</Typography>
                        <MyTooltip title={uiText.locationPage.floodMap.officialTitle[toggleLanguage.language]} text={uiText.locationPage.floodMap.officialDescription[toggleLanguage.language]}/>
                    </Box>
                    <Box className={styles.legendInlineBox}>
                        <Image src={'/images/icons/citizen-submitted-rainfall-event.png'} width={30} height={50} alt={"rainfall map - citizen submitted rainfall event icon"} />
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language]}</Typography>
                        <MyTooltip title={uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language]} text={uiText.locationPage.floodMap.floodEventDescription[toggleLanguage.language]}/>
                    </Box>
                </Box>
            </Box>
            <Box>
                {/*INSERT VIS LAYOUT HERE*/}
                <FramedMapContainer mapType={"FloodMap"} mapBoxToken={mapBoxToken}/>
            </Box>
        </Container>
    );
}

export default connect((state) => state)(FloodMapSection)