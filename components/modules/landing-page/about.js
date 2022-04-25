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


const About = ({ toggleLanguage }) => {
    return (
      <Container className={styles.aboutSectionContainer}>
          <Box className={styles.aboutTextBox}>
                <Typography variant={'topBlue'}>{uiText.landingPage.about.topBlue[toggleLanguage.language]}</Typography>
                <Typography variant={'title'}>{uiText.landingPage.about.title[toggleLanguage.language]}</Typography>
                <Typography variant={'description'} sx={{marginTop: (theme) => (theme.spacing(1))}} >{uiText.landingPage.about.descriptionParOne[toggleLanguage.language]}</Typography>
                <Typography variant={'description'} sx={{marginTop: (theme) => (theme.spacing(2))}} >{uiText.landingPage.about.descriptionParTwo[toggleLanguage.language]}</Typography>
                <Typography variant={'description'} sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(3))}} >{uiText.landingPage.about.descriptionParThree[toggleLanguage.language]}</Typography>
                <MyButton text={uiText.global.labels.mobileAppButton[toggleLanguage.language]} />
          </Box>
          <Box className={styles.aboutVideoBox}>
              <div className={styles.reactPlayerWrapper}>
                  <div className={styles.reactPlayerInnerWrapper}>
                      <ReactPlayer className={styles.reactPlayer} url='https://www.youtube.com/watch?v=lQUulgzMA18'/>
                      <div className={styles.reactPlayerBackground}></div>
                  </div>
              </div>
          </Box>
      </Container>
    );
}


export default connect((state) => state)(About)