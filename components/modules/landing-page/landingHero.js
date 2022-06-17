// WPD Landing Hero Module

// Package Imports
import {Container, Typography, styled} from "@mui/material";
import { connect } from 'react-redux'

// Local Imports
import styles from '../../../styles/modules/landing-page/LandingHero.module.css'
import ThematicIllustration from "../../elements/thematicIllustration";
import LanguageToggle from "../../elements/languageToggle";
import uiText from "../../../data/ui-text";
import Search from '../../elements/searchBar';
import {useEffect, useState} from "react";
import SearchResults from "../../elements/searchResults";

const LandingHeroSection = ({ toggleLanguage }) => {

    const [searchResultStatus, setSearchResultStatus] = useState();

    const handleSearchClick = (e) => {
        setSearchResultStatus(true);
    }

    const handleSearchClose = (e) => {
        setSearchResultStatus(false);
    }

    useEffect(() => {
        const window = document.querySelector('.search-results-window-overlay')
        if (window) { window.addEventListener('click', function() {setSearchResultStatus(false);})}
        // else {window.removeEventListener('click', function() {setSearchResultStatus(false)})}
    })

    return (
        <>
            <LanguageToggle language={toggleLanguage.language}/>
            <ThematicIllustration />
            {searchResultStatus ? <SearchResults addingLocation={false} searchResultsPopoverStatusHandler={handleSearchClose}/> : <></>}
            <Container className={styles.heroInnerContainer}>
                <TopBlue variant={'topBlue'}>{uiText.landingPage.hero.topBlue[toggleLanguage.language]}</TopBlue>
                <PageTitle variant={'h1'}>{uiText.global.labels.projectTitle[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></PageTitle>
                <StandardText>{uiText.landingPage.hero.subtitle[toggleLanguage.language]}</StandardText>
                <Search addingLocation={false} iconClickHandler={handleSearchClick} />
            </Container>

        </>
    );
}


const PageTitle = styled(Typography)(({theme}) => ({
    fontSize: `60px`,
    textAlign: `center`,
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
        fontSize: `50px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `35px`,
    },
}))

const TopBlue = styled(Typography)(({theme}) => ({
    fontSize: `25px`,
    textAlign: `center`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `20px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `18px`,
    },
}))

const StandardText = styled(Typography)(({theme}) => ({
    fontSize: `16px`,
    textAlign: `center`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

export default connect((state) => state)(LandingHeroSection)