// Navbar Component File

// Package Imports
import {AppBar, Toolbar, Box, Container, Typography} from "@mui/material";

// Local Imports
import MyButton from '../elements/button'

// CSS Import for Module Components
import styles from '../../styles/modules/Navbar.module.css'

// The Component
export default function MyNavbar() {
    return (
        <AppBar position="fixed" className={styles.navbar}>
            <Toolbar>
                <Box sx={{color: (theme) => (theme.palette.text.primary), fontWeight: (theme) => (theme.typography.weights.heavy)}} className={styles.navOuterContainer}>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.weights.heavy)}} >{"WATERPROOFING DATA"} <span className={'bluePunctuation'}>.</span></Typography>
                    <Container className={styles.navRightContainer}>
                        <Typography sx={{fontWeight: (theme) => (theme.typography.weights.heavy), padding: "0 5rem"}}>{'NATIONAL OVERVIEW'}<span className={'bluePunctuation'}>.</span></Typography>
                        <MyButton text={"Join the Project"}/>
                    </Container>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

