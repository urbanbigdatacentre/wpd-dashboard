// File contains footer module
// Used globally across UI

// Package Imports
import React from 'react'
import Image from "next/image";
import {Toolbar, Box, Container, Typography, styled} from "@mui/material";
import {connect} from "react-redux";
import Link from 'next/link';

// Local Imports
import styles from '../../styles/modules/Footer.module.css'
import uiText from "../../data/ui-text";


const Footer = ({ toggleLanguage }) => {
    return (
        <Toolbar className={styles.footer}>
            <FooterFlexBox>
                <FooterText sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.projectTitle[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText>
                <FooterText>© UBDC, University of Glasgow | 2022</FooterText>
                <GeneralLinkFlexBox>
                    <Link passHref href={`https://ubdc.ac.uk/privacy-and-cookies/`}><FooterText sx={{textDecoration: `underline`, textAlign: `left`, cursor: `pointer`, marginRight: (theme) => (theme.spacing(3))}}>{uiText.global.labels.privacyAndCookies[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText></Link>
                    <Link passHref href={`https://ubdc.ac.uk/about-ubdc/get-in-touch/`}><FooterText sx={{textDecoration: `underline`, textAlign: `left`, cursor: `pointer`, marginRight: (theme) => (theme.spacing(3))}}>{uiText.global.labels.contactUs[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText></Link>
                    <Link passHref href={`https://ubdc.ac.uk/accessibility/`}><FooterText sx={{textDecoration: `underline`, textAlign: `left`, cursor: `pointer`, marginRight: (theme) => (theme.spacing(3))}}>{uiText.global.labels.accessibility[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText></Link>
                </GeneralLinkFlexBox>
            </FooterFlexBox>
            <FooterFlexBox sx={{width: `100%`, alignItems: `flex-end`}}>
                <Link passHref href={'/'}><FooterText sx={{textDecoration: `underline`, textAlign: `right`, cursor: `pointer`}}>{uiText.global.labels.footerLinkTop[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText></Link>
                <Link passHref href={'/#national-activity'}><FooterText sx={{textDecoration: `underline`, textAlign: `right`, cursor: `pointer`}}>{uiText.global.labels.footerLinkBottom[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText></Link>
            </FooterFlexBox>
        </Toolbar>
    );
}

const GeneralLinkFlexBox = styled(Box)(({theme}) => ({
    textAlign: `left`,
    display: `flex`,
    flexWrap: `wrap`,
    width: `100%`
}))

const FooterFlexBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    [theme.breakpoints.down('md')]: {
        minHeight: '50px',
    },
    [theme.breakpoints.down('400')]: {
        minHeight: '40px',
    },
}))

const FooterText = styled(Typography)(({theme}) => ({
    width: `max-content`,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('400')]: {
        fontSize: `10px`,
    },
}))

export default connect((state) => state)(Footer)