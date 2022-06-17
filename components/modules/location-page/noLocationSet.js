// Layout Component to Render if Location Page Loads without Primary Location Set

// Package Imports
import {connect} from "react-redux";
import {Container, Divider, styled, Typography, Box} from "@mui/material";
import React, {useEffect, useState} from "react";

// Local Imports
import ThematicIllustration from "../../elements/thematicIllustration";
import SearchBar from "../../elements/searchBar";
import uiText from "../../../data/ui-text";
import SearchResults from "../../elements/searchResults";


// No Location Component
const NoLocationSet = ({toggleLanguage}) => {

    useEffect(() => {
        const window = document.querySelector('.search-results-window-overlay')
        if (window) { window.addEventListener('click', function() {setSearchResultStatus(false);})}
    })

    const [searchResultStatus, setSearchResultStatus] = useState(false);

    const handleSearchClick = (e) => {
        setSearchResultStatus(true);
    }

    const handleSearchClose = (e) => {
        setSearchResultStatus(false);
    }

    return (
        <>
            {searchResultStatus ? <WindowOverlay className={"window-overlay"}/>: <></> }
            {searchResultStatus ? <SearchResults searchResultsPopoverStatusHandler={handleSearchClose}/> : null}
            <ThematicIllustration renderRightOnly={true}/>
            <NoLocationContainer>
                <NoLocationTextAndSearchBox>
                    <TopBlue sx={{width: `60%`}} variant={'topBlue'}>{uiText.locationPage.noLocation.topBlue[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></TopBlue>
                    <SectionTitle sx={{width: `60%`}} variant={'title'}>{uiText.locationPage.noLocation.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></SectionTitle>
                    <MyDivider sx={{width: `25%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                    <StandardText sx={{width: `60%`}} variant={'description'}>{uiText.locationPage.noLocation.description[toggleLanguage.language]}</StandardText>
                </NoLocationTextAndSearchBox>
                <SearchBar iconClickHandler={handleSearchClick}/>
            </NoLocationContainer>
            <PageStretcher/>
        </>
    )
}

const PageStretcher = styled(Box)(({theme}) => ({
    paddingBottom: theme.spacing(25),
    [theme.breakpoints.down('720')]: {
        paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(40),
    },
}))

const MyDivider = styled(Divider)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        width: `40%`
    },
    [theme.breakpoints.down('sm')]: {
        width: `60%`
    },
    [theme.breakpoints.down('400')]: {
        width: `80%`
    },
}))

const NoLocationContainer = styled(Container)(({theme}) => ({
    position: `absolute`,
    paddingTop: `150px`,
    paddingBottom: `150px`,
}))

const NoLocationTextAndSearchBox = styled(Box)(({theme}) => ({
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `flex-start`,
}))

const WindowOverlay = styled(Box)(({theme}) => ({
    position: `fixed`,
    top: `0`,
    right: `0`,
    opacity: `.5`,
    zIndex: `3000`,
    width: `100%`,
    height: `100%`,
    backgroundColor: `#888888`,
}))

const SectionTitle = styled(Typography)(({theme}) => ({
    fontSize: `45px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `40px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `30px`,
        width: `80%`
    },
    [theme.breakpoints.down('400')]: {
        width: `100%`
    },
}))

const TopBlue = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `20px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `18px`,
        width: `80%`
    },
}))

const StandardText = styled(Typography)(({theme}) => ({
    fontSize: `16px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
        width: `80%`
    },
    [theme.breakpoints.down('400')]: {
        width: `100%`
    },
}))

export default connect((state) => state)(NoLocationSet);