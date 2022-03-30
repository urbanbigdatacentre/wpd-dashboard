// WPD Language Toggle Component

// Package Imports
import * as React from 'react';
import {Container, Box, Toolbar, ToggleButtonGroup, ToggleButton, styled} from "@mui/material";

// Local Imports


export default function LanguageToggle() {

    // Set Initial State
    const [language, setLanguage] = React.useState('English');

    // Handle Toggle Change
    const handleChange = (e, languageSelection) => {
        setLanguage(languageSelection);
    }

        return (
            <Box sx={{
                position: "absolute",
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
                zIndex: '100',
                fontWeight: (theme) => (theme.typography.weights.heavy),
                color: (theme) => (theme.palette.text.secondary)
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
    marginLeft: 40,
    '& .MuiToggleButtonGroup-grouped': {
        border: 0,
        color: theme.palette.text.white,
        fontWeight: theme.typography.fontWeightBold,
    },
}));