// Layout Component to Render if Location Page Loads without Primary Location Set

// Package Imports
import {connect} from "react-redux";
import {Container, Divider, styled, Typography, Box} from "@mui/material";
import React from "react";

// Local Imports
import ThematicIllustration from "../../elements/thematicIllustration";
import SearchBar from "../../elements/search";
import uiText from "../../../data/ui-text";


// No Location Component
const NoLocationSet = ({toggleLanguage}) => {
    return (
        <>
            <ThematicIllustration renderRightOnly={true}/>
            <NoLocationContainer>
                <NoLocationTextAndSearchBox>
                    <Typography sx={{width: `60%`}} variant={'topBlue'}>{uiText.locationPage.noLocation.topBlue[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                    <Typography sx={{width: `60%`}} variant={'title'}>{uiText.locationPage.noLocation.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
                    <Divider sx={{width: `25%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                    <Typography sx={{width: `60%`}} variant={'description'}>{uiText.locationPage.noLocation.description[toggleLanguage.language]}</Typography>
                </NoLocationTextAndSearchBox>
                <SearchBar/>
            </NoLocationContainer>
        </>
    )
}

const NoLocationContainer = styled(Container)(({theme}) => ({
    position: `absolute`,
    paddingTop: `150px`,
    paddingBottom: `150px`
}))

const NoLocationTextAndSearchBox = styled(Box)(({theme}) => ({
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `flex-start`,
}))

export default connect((state) => state)(NoLocationSet);