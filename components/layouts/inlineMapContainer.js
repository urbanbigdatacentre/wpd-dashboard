// Layout Component for Faded Maps & Text Overlays

// Package Imports
import {Box, styled, Typography, Container} from "@mui/material";
import {connect} from "react-redux";

// Local Imports
import StreetMap from "../elements/streetMap";
import uiText from "../../data/ui-text";
import CitizenCarousel from "../elements/citizenCarousel";

// Inline Map Container Component
const InlineMapContainer = ({ toggleLanguage, mapBoxToken }) => {
    return (
        <MapOuterWrapper>
            <MapTextCarouselWrapper>
                <MapDescriptionTextBox>
                    <Typography sx={{width: `40%`}} variant={'topBlue'}>{uiText.landingPage.carouselMap.topBlue[toggleLanguage.language]}</Typography>
                    <Typography sx={{width: `40%`}} variant={'title'}>{uiText.landingPage.carouselMap.title[toggleLanguage.language]}</Typography>
                    <Typography variant={'description'} sx={{width: `40%`, marginTop: (theme) => (theme.spacing(1))}} >{uiText.landingPage.carouselMap.description[toggleLanguage.language]}</Typography>
                </MapDescriptionTextBox>
                <CitizenCarousel/>
            </MapTextCarouselWrapper>
            <MapInnerWrapper>
                <MapBackgroundBox />
                <StreetMap mapBoxToken={mapBoxToken}/>
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
    marginTop: theme.spacing(5),
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