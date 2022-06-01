// File contains footer module
// Used globally across UI

// Package Imports
import React from 'react'
import Image from "next/image";
import {Toolbar, Box, Container, Typography, styled} from "@mui/material";
import {connect} from "react-redux";
// Local Imports
import Link from 'next/link';
import styles from '../../styles/modules/Footer.module.css'
import uiText from "../../data/ui-text";


const Footer = ({ toggleLanguage }) => {
    return (
        <Toolbar className={styles.footer}>
            <FooterFlexBox>
                <FooterText sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.projectTitle[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText>
                <FooterText>© UBDC, University of Glasgow | 2022</FooterText>
            </FooterFlexBox>
            <FooterFlexBox>
                <FooterText sx={{textAlign: `right`}}>{uiText.global.labels.footerLinkTop[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText>
                <FooterText sx={{textAlign: `right`}}>{uiText.global.labels.footerLinkBottom[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></FooterText>
            </FooterFlexBox>
        </Toolbar>
    );
}

const FooterFlexBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    minHeight: '60px',
    [theme.breakpoints.down('md')]: {
        minHeight: '50px',
    },
    [theme.breakpoints.down('400')]: {
        minHeight: '40px',
    },
}))

const FooterText = styled(Typography)(({theme}) => ({

    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
    [theme.breakpoints.down('400')]: {
        fontSize: `10px`,
    },
}))

export default connect((state) => state)(Footer)