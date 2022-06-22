// Hero section for Location Page - contains background map component

// Package Imports
import {connect} from "react-redux";

// Local Imports
import BackgroundMap from "../../elements/backgroundMap";
import React, {useEffect, useState} from "react";
import {Box, Button, Container, Divider, Skeleton, styled, Typography} from "@mui/material";
import uiText from "../../../data/ui-text";
import SearchIcon from "@mui/icons-material/Search";
import LocationBox from "../../elements/locationBox";
import locationPaths from "../../../data/locationPaths";
import StreetMap from "../../elements/streetMap";
import {usePromiseTracker} from "react-promise-tracker";
import {useRouter} from "next/router";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

// Location Hero Component

const LocationHero = ({toggleLanguage, mapBoxToken, updatePrimaryLocation}) => {

    const { promiseInProgress } = usePromiseTracker({area: "simple-geometry", delay: 5000});

    const router = useRouter();


    const handleClick = (e) => {
        router.push(`/`)
    }

    const renderPlainMap = () => {
        return (
            <>
                <MapTextCarouselWrapper>
                    <MapDescriptionTextBox>
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`20px`} width={`10%`}/> : <LocationBox locationName={locationPaths[updatePrimaryLocation.location['placetype']].text}/>}
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`40px`} width={`40%`}/> : <PageTitle sx={{width: `60%`}} variant={'h1'}>{updatePrimaryLocation.location['placename']}<span className={'bluePunctuation'}>.</span></PageTitle>}
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`10px`} width={`45%`}/> : <MyDivider sx={{width: `25%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>}
                        {promiseInProgress ? <MySkeleton variant={'rectangular'} height={`10px`} width={`50%`}/> : <StandardText sx={{width: `50%`}} variant={'description'}>{uiText.locationPage.hero.descriptionPartOne[toggleLanguage.language] + updatePrimaryLocation.location['placename'] + uiText.locationPage.hero.descriptionPartTwo[toggleLanguage.language]}</StandardText>}
                    </MapDescriptionTextBox>
                </MapTextCarouselWrapper>
            </>
        )
    }

    return (
        <MapOuterWrapper>
            { renderPlainMap() }
            <MapInnerWrapper >
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
    height: `400px`,
    [theme.breakpoints.down('md')]: {
        height: `300px`,
    },
    [theme.breakpoints.down('sm')]: {
        height: `250px`,
    },
}))

const MyDivider = styled(Divider)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        width: `40%`,
    },
    [theme.breakpoints.down('sm')]: {
        width: `70%`,
    },
    [theme.breakpoints.down('550')]: {
        width: `85%`,
    },
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
    background: `linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.87) 40.19%, #FFFFFF 100%);`
}))

const MySkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba(22, 22, 22, 0.3)`,
    marginTop: `10px`,
}))

const PageTitle = styled(Typography)(({theme}) => ({
    fontSize: `60px`,
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
        fontSize: `50px`,
    },
    [theme.breakpoints.down('md')]: {
        width: `70%`
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `35px`,
        width: `80%`
    },
    [theme.breakpoints.down('550')]: {
        width: `100%`,
    },
}))


const ChangeLocationText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

const StandardText = styled(Typography)(({theme}) => ({
    fontSize: `16px`,

    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('md')]: {
        width: `70%`
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
        width: `80%`
    },
}))

export default connect((state) => state)(LocationHero)