// Layout Component for Faded Maps & Text Overlays

// Package Imports
import {Box, styled, Typography, Container, Divider, IconButton} from "@mui/material";
import {connect} from "react-redux";

// Local Imports
import StreetMap from "../elements/streetMap";
import uiText from "../../data/ui-text";
import CitizenCarousel from "../elements/citizenCarousel";
import LocationBox from "../elements/locationBox";
import locationPaths from "../../data/locationPaths";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

// Inline Map Container Component
const InlineMapContainer = ({ toggleLanguage, mapBoxToken, mapStylePlain, updatePrimaryLocation }) => {

    const containerHeight = mapStylePlain ? `400px`: `800px`;

    const renderPlainMap = () => {
        return (
            <>
                <ChangeLocationContainer>
                    <Typography sx={{borderRadius: (theme) => (theme.shape.borderRadius), fontWeight: (theme) => (theme.typography.fontWeightBold), textAlign: 'right', marginRight: (theme) => (theme.spacing(1)), padding: (theme) => (theme.spacing(1)), backgroundColor: `rgba(255, 255, 255, 0.35);`}}>{uiText.global.labels.changeLocation[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                    <IconButton sx={{border: `1px solid #2196F3`, backgroundColor: (theme) => (theme.palette.primary.light), padding: (theme) => (theme.spacing(.75))}} type="submit" aria-label="search">
                        <SearchIcon style={{ fill: `#2196F3` }} />
                    </IconButton>
                </ChangeLocationContainer>
                <MapTextCarouselWrapper>
                    <MapDescriptionTextBox>
                        <LocationBox locationName={locationPaths[updatePrimaryLocation.location['placetype']].text}/>
                        <Typography sx={{width: `60%`}} variant={'title'}>{updatePrimaryLocation.location['placename']}<span className={'bluePunctuation'}>.</span></Typography>
                        <Divider sx={{width: `25%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                        <Typography sx={{width: `50%`}} variant={'description'}>{uiText.locationPage.hero.descriptionPartOne[toggleLanguage.language] + updatePrimaryLocation.location['placename'] + uiText.locationPage.hero.descriptionPartTwo[toggleLanguage.language]}</Typography>
                    </MapDescriptionTextBox>
                </MapTextCarouselWrapper>
            </>
        )
    }

    const renderFullMapCarousel = () => {
        return (
            <MapTextCarouselWrapper>
                <MapDescriptionTextBox>
                    <Typography sx={{width: `40%`}} variant={'title'}>{uiText.landingPage.carouselMap.title[toggleLanguage.language]}</Typography>
                    <Typography variant={'description'} sx={{width: `40%`, marginTop: (theme) => (theme.spacing(1))}} >{uiText.landingPage.carouselMap.description[toggleLanguage.language]}</Typography>
                </MapDescriptionTextBox>
                <CitizenCarousel/>
            </MapTextCarouselWrapper>
        )
    }

    return (
        <MapOuterWrapper>
            { mapStylePlain ? renderPlainMap() : (
                renderFullMapCarousel()
            )}
            <MapInnerWrapper sx={{height: containerHeight}}>
                <MapBackgroundBox />
                <StreetMap mapBoxToken={mapBoxToken} mapStylePlain={mapStylePlain}/>
            </MapInnerWrapper>
        </MapOuterWrapper>
    );
}

const MapOuterWrapper = styled(Box)(({theme}) => ({
    position: `relative`,
    width: `100vw`,
    display: `flex`,
    justifyContent: `center`,
    backgroundColor: `#fff`
}))

const MapInnerWrapper = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(8),
    height: `800px`,
    width: `100%`,
    position: `relative`,
    zIndex: `100`,
}))

const MapTextCarouselWrapper = styled(Container)(({theme}) => ({
    width: `100%`,
    height: `100%`,
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `start`,
    zIndex: 600,
    top: theme.spacing(6),
}))

const ChangeLocationContainer = styled(Container)(({theme}) => ({
    width: `100%`,
    position: `absolute`,
    display: `flex`,
    justifyContent: `end`,
    alignItems: `center`,
    zIndex: 1000,
    top: `80px`,
    right: `0`,
    left: `0`,
    borderRadius: theme.shape.borderRadius,
}))

const MapDescriptionTextBox = styled(Container)(({theme}) => ({
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `flex-start`,
}))

const MapBackgroundBox = styled(Container)(({theme}) => ({
    width: `70%`,
    height: `100%`,
    padding: `0`,
    margin: `0`,
    position: `absolute`,
    top: `0`,
    right: `0`,
    left: `0`,
    zIndex: 500,
    background: `linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.87) 40.19%, #FFFFFF 100%);`
}))


export default connect((state) => state)(InlineMapContainer)