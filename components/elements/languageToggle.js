// WPD Language Toggle Component

// Package Imports
import React, {useEffect} from 'react';
import {Container, Box, Toolbar, ToggleButtonGroup, ToggleButton, styled, Typography} from "@mui/material";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

// Local Imports
import {changeLanguage} from "../../store/actions";
import uiText from "../../data/ui-text";

const LanguageToggle = ({ language, changeLanguage }) => {

    // Handle Toggle Change
    const handleChange = (e, languageSelection) => {
        if (languageSelection !== null) {
            // Change Redux Language State
            changeLanguage(languageSelection);
        }
    }

        return (
            <Box sx={{
                position: "absolute",
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
                zIndex: '100',
                fontWeight: (theme) => (theme.typography.weights.heavy),
                color: (theme) => (theme.palette.primary.main)
            }}>
                <Toolbar>
                    <Container sx={{
                        background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.5) 7.57%, #FFFFFF 57.64%, rgba(255, 255, 255, 0.5) 100%)'
                    }}>
                        <ButtonLabel display={'inline'}>{uiText.global.labels.language[language].toUpperCase()}</ButtonLabel>
                        <StyledToggleButtonGroup
                        value={language}
                        exclusive
                        aria-label={'language selection'}
                        onChange={handleChange}
                        >
                            <MyToggleButton value={'en'}>EN</MyToggleButton>
                            <MyToggleButton value={'br'}>BR</MyToggleButton>
                        </StyledToggleButtonGroup>
                    </Container>
                </Toolbar>
            </Box>
        );
}


// Styling for Toggle Button & Group
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    marginLeft: 20,
    '& .MuiToggleButton-root': {
        margin: `5px 5px`,
        padding: `0px 15px`,
        '&.Mui-selected': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.contrastText,
            '&:hover, &.Mui-focusVisible': {
                backgroundColor: '#fff',
                color: theme.palette.primary.main,
            },
        },
    },
    '& .MuiToggleButtonGroup-grouped': {
        '&.MuiToggleButtonGroup-grouped:not(:last-of-type), &.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
            borderRadius: `5px`,
        },
        border: 0,
        color: theme.palette.primary.contrastText,
    },

}));

const ButtonLabel = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.down('sm')]: {
        fontSize: `14px`,
    },
}))


const MyToggleButton = styled(ToggleButton)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: `14px`,
        color: `#fff`
    },
}))

const mapStateToProps = (state) => {
    return {
        language: state.toggleLanguage.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: bindActionCreators(changeLanguage, dispatch),
    }
}

// Export Component & Connect to Store
export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle)
