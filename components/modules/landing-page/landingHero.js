// WPD Landing Hero Module

// Package Imports
import {Container, Typography, Box} from "@mui/material";
import Image from 'next/image';
import { connect } from 'react-redux'

// Local Imports
import styles from '../../../styles/modules/landing-page/LandingHero.module.css'
import ThematicIllustration from "../../elements/thematicIllustration";
import LanguageToggle from "../../elements/languageToggle";
import {toggleLanguage} from "../../../store/reducers";
import Clock from "../../elements/clock";

const LandingHeroSection = ({ toggleLanguage, tick }) => {
    return (
        <>
            <LanguageToggle language={toggleLanguage.language}/>
            <ThematicIllustration />
            <Container className={styles.heroInnerContainer}>
                <Typography variant={'title'}>Waterproofing Data<span className={'bluePunctuation'}>.</span></Typography>
                <Typography>Connecting Brazilian Flood Data From Communities & Official Sources</Typography>
            </Container>
            <Clock lastUpdate={tick.lastUpdate} light={tick.light} />
        </>
    );
}


export default connect((state) => state)(LandingHeroSection)