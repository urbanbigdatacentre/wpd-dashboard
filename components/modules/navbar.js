// Navbar Component File

// Package Imports
import {AppBar, Toolbar, Box, Container, Typography} from "@mui/material";
import Link from 'next/link';

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
                    <Link href="/" >
                        <Typography sx={{fontWeight: (theme) => (theme.typography.weights.heavy), cursor: `pointer`}} >{uiText.global.labels.projectTitle[toggleLanguage.language].toUpperCase()} <span className={'bluePunctuation'}>.</span></Typography>
                    </Link>
                    <Container className={styles.navRightContainer}>
                        <Link href="/#national-activity" scroll={false}>
                            <Typography sx={{fontWeight: (theme) => (theme.typography.weights.heavy), padding: "0 5rem", cursor: `pointer`}}>{uiText.global.labels.navRightLink[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                        </Link>
                        <MyButton text={uiText.global.labels.navButton[toggleLanguage.language]}/>
                    </Container>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default connect((state) => state)(MyNavbar)