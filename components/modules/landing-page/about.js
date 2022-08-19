// WPD Landing About the Project Component

// Package Imports
import {Box, Container, Typography, styled} from "@mui/material";
import {connect} from "react-redux";
import ReactPlayer from 'react-player'

// Local Imports
import uiText from "../../../data/ui-text";
import MyButton from '../../elements/button';

// Style Imports
import styles from '../../../styles/modules/landing-page/About.module.css'
import Link from "next/link";


const About = ({ toggleLanguage }) => {
    return (
      <AboutSectionContainer>
          <AboutTextBox>
                <TopBlue variant={'topBlue'}>{uiText.landingPage.about.topBlue[toggleLanguage.language]}</TopBlue>
                <SectionTitle variant={'title'}>{uiText.landingPage.about.title[toggleLanguage.language]}</SectionTitle>
                <StandardText variant={'description'} sx={{marginTop: (theme) => (theme.spacing(1))}} >{uiText.landingPage.about.descriptionParOne[toggleLanguage.language]}</StandardText>
                <StandardText variant={'description'} sx={{marginTop: (theme) => (theme.spacing(2))}} >{uiText.landingPage.about.descriptionParTwo[toggleLanguage.language]}</StandardText>
                <StandardText variant={'description'} sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(3))}} >{uiText.landingPage.about.descriptionParThree[toggleLanguage.language]}</StandardText>
                <Link passHref href={`https://play.google.com/store/apps/details?id=com.dadosaprovadagua.wpdmobileapp`}><MyButton text={uiText.global.labels.mobileAppButton[toggleLanguage.language]} variant={"contained"}/></Link>
          </AboutTextBox>
          <AboutVideoBox >
              <ReactPlayerWrapper >
                  <ReactPlayerInnerWrapper>
                      <ReactPlayer className={styles.reactPlayer} url={toggleLanguage.language === 'en' ? 'https://www.youtube.com/embed/lQUulgzMA18?showinfo=0&enablejsapi=1&origin=http://localhost:3000' : 'https://www.youtube.com/embed/U92B4gBIgik?showinfo=0&enablejsapi=1&origin=http://localhost:3000'}/>
                      <div className={styles.reactPlayerBackground}></div>
                  </ReactPlayerInnerWrapper>
              </ReactPlayerWrapper>
          </AboutVideoBox>
      </AboutSectionContainer>
    );
}



const AboutSectionContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(15),
    display: `flex`,
    justifyContent: `space-between`,
    [theme.breakpoints.down('1100')]: {
        flexDirection: `column`
    },
    [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(10),
    },
}))


const AboutTextBox = styled(Box)(({theme}) => ({
    textAlign: `left`,
    display: `flex`,
    flexDirection: `column`,
    width: `40%`,
    [theme.breakpoints.down('1100')]: {
        width: `100%`,
    },
}))

const AboutVideoBox = styled(Box)(({theme}) => ({
    height: `auto`,
    display: `flex`,
    flexDirection: `column`,
    width: `45%`,
    [theme.breakpoints.down('1100')]: {
        width: `60%`,
    },
    [theme.breakpoints.down('900')]: {
        width: `70%`,
    },
}))

const ReactPlayerInnerWrapper = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    width: `100%`,
    height: `100%`
}))

const ReactPlayerWrapper = styled(Box)(({theme}) => ({
    position: `relative`,
    width: `100%`,
    height: `100%`,
    justifyContent: `center`,
    alignItems: `center`,
    [theme.breakpoints.down('1100')]: {

    },
}))

const SectionTitle = styled(Typography)(({theme}) => ({
    fontSize: `45px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `40px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `30px`,
    },
}))

const TopBlue = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `20px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `18px`,
    },
}))

const StandardText = styled(Typography)(({theme}) => ({
    fontSize: `16px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))


export default connect((state) => state)(About)