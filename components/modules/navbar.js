// Navbar Component File

// Package Imports
import {AppBar, Toolbar} from "@mui/material";

// Local Imports
import MyButton from '../elements/button'

// CSS Imports
import styles from '../../styles/modules/Navbar.module.css'

export default function MyNavbar() {
    return (
        <AppBar position="fixed" className={styles.navbar}>
            <Toolbar>
                <MyButton text={"Join the Project"}/>
            </Toolbar>
        </AppBar>
    );
}

// CSS for Module Components Goes Inside File
