// Hero section for Location Page - contains background map component

// Package Imports
import {connect} from "react-redux";

// Local Imports
import BackgroundMap from "../../elements/backgroundMap";
import React, {useEffect, useState} from "react";
import AddingLocationWindow from "../../elements/addingLocationWindow";
import {Box, Button, Container, Divider, Skeleton, styled, Typography} from "@mui/material";
import uiText from "../../../data/ui-text";
import SearchIcon from "@mui/icons-material/Search";
import LocationBox from "../../elements/locationBox";
import locationPaths from "../../../data/locationPaths";
import StreetMap from "../../elements/streetMap";
import {usePromiseTracker} from "react-promise-tracker";

// Location Hero Component

const LocationHero = ({toggleLanguage, mapBoxToken, mapStylePlain, updatePrimaryLocation, dashboardRender}) => {

    const [changingLocationStatus, setChangingLocationStatus] = useState(false);

    const { promiseInProgress } = usePromiseTracker({area: "simple-geometry", delay: 5000});


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

    const containerHeight = mapStylePlain ? `400px`: `650px`;

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
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`20px`} width={`10%`}/> : <LocationBox locationName={locationPaths[updatePrimaryLocation.location['placetype']].text}/>}
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`40px`} width={`40%`}/> : <Typography sx={{width: `60%`}} variant={'title'}>{updatePrimaryLocation.location['placename']}<span className={'bluePunctuation'}>.</span></Typography>}
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`10px`} width={`45%`}/> : <Divider sx={{width: `25%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>}
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`10px`} width={`50%`}/> : <Typography sx={{width: `50%`}} variant={'description'}>{uiText.locationPage.hero.descriptionPartOne[toggleLanguage.language] + updatePrimaryLocation.location['placename'] + uiText.locationPage.hero.descriptionPartTwo[toggleLanguage.language]}</Typography>}
                    </MapDescriptionTextBox>
                </MapTextCarouselWrapper>
            </>
        )
    }

    return (
        <MapOuterWrapper>
            { renderPlainMap() }
            <MapInnerWrapper sx={{height: containerHeight}}>
                <MapBackgroundBox />
                <BackgroundMap mapBoxToken={mapBoxToken} mapStylePlain={true}/>
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
    width: `100%`,
    height: `100%`,
    padding: `0`,
    margin: `0`,
    position: `absolute`,
    top: `0`,
    right: `0`,
    left: `0`,
    zIndex: 500,
    background: `linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.87) 20.19%, #FFFFFF 100%);`
}))

const MySkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba(22, 22, 22, 0.3)`,
    marginTop: `10px`,
}))

export default connect((state) => state)(LocationHero)