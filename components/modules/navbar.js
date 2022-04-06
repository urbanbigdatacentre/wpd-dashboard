// Navbar Component File

// Package Imports
import {AppBar, Toolbar, Box, Container, Typography} from "@mui/material";

// Local Imports
import MyButton from '../elements/button'
import uiText from "../../data/ui-text";

// CSS Import for Module Components
import styles from '../../styles/modules/Navbar.module.css'
import {connect} from "react-redux";

// The Component
const MyNavbar = ({ toggleLanguage }) => {
    return (
        <AppBar position="fixed" className={styles.navbar}>
            <Toolbar>
                <Box sx={{color: (theme) => (theme.palette.text.primary), fontWeight: (theme) => (theme.typography.weights.heavy)}} className={styles.navOuterContainer}>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.weights.heavy)}} >{uiText.global.labels.projectTitle[toggleLanguage.language].toUpperCase()} <span className={'bluePunctuation'}>.</span></Typography>
                    <Container className={styles.navRightContainer}>
                        <Typography sx={{fontWeight: (theme) => (theme.typography.weights.heavy), padding: "0 5rem"}}>{uiText.global.labels.navRightLink[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                        <MyButton text={uiText.global.labels.navButton[toggleLanguage.language]}/>
                    </Container>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default connect((state) => state)(MyNavbar)