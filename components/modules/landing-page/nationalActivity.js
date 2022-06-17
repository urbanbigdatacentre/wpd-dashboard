// WPD Landing National Overview Map Component

// Package Imports
import {connect} from "react-redux";
import {Box, Container, styled, Typography} from "@mui/material";
import uiText from "../../../data/ui-text";

// Local Imports
import FramedMapContainer from "../../layouts/framedMapContainer";

const NationalActivity = ({ mapBoxToken, toggleLanguage }) => {
    return (
        <NationalActivitySectionContainer >
            <NationalActivityTextBoxWrapper>
                <TopBlue variant={'topBlue'}>{uiText.landingPage.nationalActivityMap.topBlue[toggleLanguage.language]}</TopBlue>
                <SectionTitle variant={'title'}>{uiText.landingPage.nationalActivityMap.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></SectionTitle>
                <StandardText variant={'description'} sx={{marginTop: (theme) => (theme.spacing(1))}}>{uiText.landingPage.nationalActivityMap.description[toggleLanguage.language]}</StandardText>
            </NationalActivityTextBoxWrapper>
            <FramedMapContainer mapBoxToken={mapBoxToken} mapType={"NationalOverview"}/>
        </NationalActivitySectionContainer>
    );
}

const NationalActivitySectionContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(15),
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(12),
    },
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(10),

    },
    [theme.breakpoints.down('500')]: {
        marginTop: theme.spacing(10),
    },
}))

const NationalActivityTextBoxWrapper = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(5),
    },
}))

const SectionTitle = styled(Typography)(({theme}) => ({
    fontSize: `45px`,
    textAlign: `center`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `40px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `30px`,
    },
}))

const TopBlue = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
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

export default connect((state)=> state)(NationalActivity)
