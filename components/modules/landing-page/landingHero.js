// WPD Landing Hero Module

// Package Imports
import {Container, Typography, Box} from "@mui/material";
import Image from 'next/image';
import { connect } from 'react-redux'

// Local Imports
import styles from '../../../styles/modules/landing-page/LandingHero.module.css'
import ThematicIllustration from "../../elements/thematicIllustration";
import LanguageToggle from "../../elements/languageToggle";
import uiText from "../../../data/ui-text";

const LandingHeroSection = ({ toggleLanguage }) => {
    return (
        <>
            <LanguageToggle language={toggleLanguage.language}/>
            <ThematicIllustration />
            <Container className={styles.heroInnerContainer}>
                <Typography variant={'pageTitle'}>{uiText.global.labels.projectTitle[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                <Typography>{uiText.landingPage.hero.subtitle[toggleLanguage.language]}</Typography>
            </Container>
        </>
    );
}


export default connect((state) => state)(LandingHeroSection)