// WPD Language Toggle Component

// Package Imports
import * as React from 'react';
import {Container, Box, Toolbar, ToggleButtonGroup, ToggleButton, styled} from "@mui/material";

// Local Imports


export default function LanguageToggle() {

    // Set Initial State - Language 'English'
    const [language, setLanguage] = React.useState('English');

    // Handle Toggle Change
    const handleChange = (e, languageSelection) => {
        if (languageSelection !== null) {
            setLanguage(languageSelection);
        };
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
                        {'LANGUAGE'}

                        <StyledToggleButtonGroup
                        value={language}
                        exclusive
                        aria-label={'language selection'}
                        onChange={handleChange}
                        >
                            <ToggleButton value={'English'}>
                                EN
                            </ToggleButton>
                            
                            <ToggleButton value={'Brazilian Portuguese'}>
                                BR
                            </ToggleButton>

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