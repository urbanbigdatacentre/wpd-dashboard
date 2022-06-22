// Layout Component for Faded Maps & Text Overlays

// Package Imports
import {Box, styled, Typography, Container, Divider, Button} from "@mui/material";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";

// Local Imports
import StreetMap from "../elements/streetMap";
import uiText from "../../data/ui-text";
import CitizenCarousel from "../elements/citizenCarousel";
import LocationBox from "../elements/locationBox";
import locationPaths from "../../data/locationPaths";
import SearchIcon from "@mui/icons-material/Search";
import LocationButtonGroup from "../elements/locationButtonGroup";
import MyButton from "../elements/button";
import AddingLocationWindow from "../elements/addingLocationWindow";

// Inline Map Container Component
const InlineMapContainer = ({ toggleLanguage, mapBoxToken, mapStylePlain, updatePrimaryLocation, dashboardRender }) => {

    const [changingLocationStatus, setChangingLocationStatus] = useState(false);

    useEffect(() => {
        const window = document.querySelector('.window-overlay')
        if (window) { window.addEventListener('click', function() {setChangingLocationStatus(false);})}
    })

    const handleClick = (e) => {
        setChangingLocationStatus(true);
    }

    const handleClose = (e) => {
        setChangingLocationStatus(false);
    }

    const renderPlainMap = () => {
        return (
            <>

                {
                    /*{ Section used for Adding Location Search Bar }*/
                    changingLocationStatus ? <AddingLocationWindow addingLocationStatusHandler={handleClose} changingLocation={true}/> : <></>

                }

                <ChangeLocationContainer>
                    <Button onClick={handleClick} variant={'outlined'} sx={{border: `1px solid #2196F3`, background: `rgba(255, 255, 255, 0.75)`, padding: (theme) => (theme.spacing(.75)), '&:hover': {
                            background: `rgba(255, 255, 255, 0.75)`,
                            boxShadow: `0px 0px 15px rgba(33, 150, 243, .25)`,
                        }}} type="submit" aria-label="search">
                        <Typography sx={{fontSize: `15px`, color: `#161616`,borderRadius: `5px`, fontWeight: (theme) => (theme.typography.fontWeightBold), textAlign: 'right', marginRight: (theme) => (theme.spacing(1))}}>{uiText.global.labels.changeLocation[toggleLanguage.language].toUpperCase()}</Typography>
                        <SearchIcon style={{ fill: `#2196F3` }} />
                    </Button>
                </ChangeLocationContainer>
                <MapTextCarouselWrapper>
                    <MapDescriptionTextBox>
                        <LocationBox locationName={locationPaths[updatePrimaryLocation.location['placetype']].text}/>
                        <SectionTitle sx={{width: `60%`}} variant={'title'}>{updatePrimaryLocation.location['placename']}<span className={'bluePunctuation'}>.</span></SectionTitle>
                        <Divider sx={{width: `25%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                        <StandardText sx={{width: `50%`}} variant={'description'}>{uiText.locationPage.hero.descriptionPartOne[toggleLanguage.language] + updatePrimaryLocation.location['placename'] + uiText.locationPage.hero.descriptionPartTwo[toggleLanguage.language]}</StandardText>
                    </MapDescriptionTextBox>
                </MapTextCarouselWrapper>
            </>
        )
    }

    const renderFullMapCarousel = () => {
        return (
            <MapTextCarouselWrapper>
                <MapDescriptionTextBox>
                    <TopBlue sx={{width: `50%`}} variant={'topBlue'}>{uiText.landingPage.carouselMap.topBlue[toggleLanguage.language]}</TopBlue>
                    <SectionTitle sx={{width: `50%`}} variant={'title'}>{uiText.landingPage.carouselMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span> </SectionTitle>

                    {
                        /*INSERT LOGIC TO HIDE DESCRIPTION AND ADD LOCATION BUTTON GROUPS*/
                        dashboardRender ? (<LocationButtonGroup positionMode={'relative'}/>) : (<StandardText variant={'description'} sx={{width: `40%`, marginTop: (theme) => (theme.spacing(1))}} >{uiText.landingPage.carouselMap.description[toggleLanguage.language]}</StandardText>)
                    }
                </MapDescriptionTextBox>
                <CitizenCarousel useAPIData={dashboardRender}/>
            </MapTextCarouselWrapper>
        )
    }

    return (
        <MapOuterWrapper>
            { mapStylePlain ? renderPlainMap() : (
                renderFullMapCarousel()
            )}
            <MapInnerWrapper sx={theme => ({
                height: mapStylePlain ? `400px`: `650px`,
                [theme.breakpoints.down('md')]: {
                    height: mapStylePlain ? `400px`: `550px`,
                },
            })}>
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
    borderRadius: `5px`,
}))

const MapDescriptionTextBox = styled(Box)(({theme}) => ({
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
    background: `linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.87) 25.19%, #FFFFFF 100%);`,
    [theme.breakpoints.down('1000')]: {
        width: `90%`,
    },
}))


const SectionTitle = styled(Typography)(({theme}) => ({
    fontSize: `45px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `40px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `30px`,
        width: `100%`,
    },
    [theme.breakpoints.down('1000')]: {
        width: `75%`,
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `30px`,
        width: `100%`,
    },
}))

const TopBlue = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `20px`,
    },
    [theme.breakpoints.down('1000')]: {
        width: `75%`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `18px`,
        width: `100%`,
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `16px`,
    },
}))

const StandardText = styled(Typography)(({theme}) => ({
    fontSize: `16px`,
    [theme.breakpoints.down('1000')]: {
        width: `75%`,
    },
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))


export default connect((state) => state)(InlineMapContainer)