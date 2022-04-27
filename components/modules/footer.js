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
                <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.projectTitle[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                <Typography>© UBDC, University of Glasgow | 2022</Typography>
            </FooterFlexBox>
            <FooterFlexBox>
                <Typography sx={{textAlign: `right`}}>{uiText.global.labels.footerLinkTop[toggleLanguage.language].toUpperCase()}</Typography>
                <Typography sx={{textAlign: `right`}}>{uiText.global.labels.footerLinkBottom[toggleLanguage.language].toUpperCase()}</Typography>
            </FooterFlexBox>
        </Toolbar>
    );
}

const FooterFlexBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    minHeight: '60px',

}))


export default connect((state) => state)(Footer)