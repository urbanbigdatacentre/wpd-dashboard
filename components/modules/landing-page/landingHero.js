// WPD Landing Hero Module

// Package Imports
import {Container, Typography, Box} from "@mui/material";
import Image from 'next/image';

// Local Imports
import styles from '../../../styles/modules/landing-page/LandingHero.module.css'
import ThematicIllustration from "../../elements/thematicIllustration";
import LanguageToggle from "../../elements/languageToggle";

export default function LandingHeroSection(props) {
    return (
        <>
            <LanguageToggle/>
            <ThematicIllustration />
            <Container className={styles.heroInnerContainer}>
                <Typography variant={'title'}>Waterproofing Data<span className={'bluePunctuation'}>.</span></Typography>
                <Typography>Connecting Brazillian Flood Data From Communities & Official Sources</Typography>
            </Container>
        </>
    );
}