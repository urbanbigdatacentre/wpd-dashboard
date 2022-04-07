// WPD Landing National Overview Map Component

// Package Imports
import {connect} from "react-redux";
import {Box, Container, Typography} from "@mui/material";
import uiText from "../../../data/ui-text";

// Local Imports
import styles from '../../../styles/modules/landing-page/NationalActivity.module.css'
import NationalActivityMap from "../../elements/nationalActivityMap";

const NationalActivity = ({ mapBoxToken, toggleLanguage }) => {
    return (
        <Container className={styles.nationalActivitySectionContainer} sx={{marginTop: (theme) => (theme.spacing(20))}}>
            <Box className={styles.nationalActivityTextBoxWrapper}>
                <Typography variant={'topBlue'}>{uiText.landingPage.nationalActivityMap.topBlue[toggleLanguage.language]}</Typography>
                <Typography variant={'title'}>{uiText.landingPage.nationalActivityMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                <Typography variant={'description'} sx={{marginTop: (theme) => (theme.spacing(1))}}>{uiText.landingPage.nationalActivityMap.description[toggleLanguage.language]}</Typography>
            </Box>
            <NationalActivityMap mapBoxToken={mapBoxToken}/>
        </Container>
    );
}

export default connect((state)=> state)(NationalActivity)
