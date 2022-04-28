// Control Panel Module Component - Renders all Control Panel Layout + Children


// Package Imports
import {connect} from "react-redux";
import {Box, Container, Typography} from "@mui/material";
import {useEffect} from "react";

// Local Imports
import DateFilter from "../../elements/dateFilter";
import uiText from "../../../data/ui-text";
import MyButton from "../../elements/button";
import LocationControlButton from "../../elements/locationControlButton";
import ControlDashboard from "../../elements/controlDashboard";

// Style Imports
import styles from '../../../styles/modules/location-page/ControlPanel.module.css';
import {useState} from "react";
import AddingLocationWindow from "../../elements/addingLocationWindow";

// Control Panel Component
const ControlPanel = ({ toggleLanguage, updatePrimaryLocation }) => {

    const [addingLocationStatus, setAddingLocationStatus] = useState(false);

    useEffect(() => {
        const window = document.querySelector('.window-overlay')
        if (window) { window.addEventListener('click', function() {setAddingLocationStatus(false);})}
    })

    const handleClick = (e) => {
        setAddingLocationStatus(true);
    }

    return (
        <Container maxWidth="lg" className={styles.controlPanelSectionContainer}>

            {
                /*{ Section used for Adding Location Search Bar }*/
                addingLocationStatus ? <AddingLocationWindow /> : <></>

            }

            <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.locationPage.controlPanel.controlPanel[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
            <Box className={styles.controlPanelInnerBox}>
                <Box className={styles.locationControlBox}>
                    <MyButton text={uiText.global.labels.addLocation[toggleLanguage.language]} variant={"contained"} onClick={handleClick}/>
                    <LocationControlButton text={updatePrimaryLocation.location['placename']} contained={false} color={'#2196F3'}/>
                    {/*SPACE HERE TO MAP OTHER CONTROL BUTTONS*/}
                </Box>
                <DateFilter positionAbsolute={false}/>
            </Box>
            <ControlDashboard color={'#2196F3'} locationData={updatePrimaryLocation}/>
            {/*SPACE HERE TO MAP OTHER CONTROL DASHBOARDS*/}
        </Container>
    );
}

export default connect((state) => state)(ControlPanel)
