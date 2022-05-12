// Control Panel Module Component - Renders all Control Panel Layout + Children


// Package Imports
import {connect} from "react-redux";
import {Box, Container, Typography} from "@mui/material";
import {useEffect} from "react";
import {useState} from "react";

// Local Imports
import DateFilter from "../../elements/dateFilter";
import uiText from "../../../data/ui-text";
import MyButton from "../../elements/button";
import LocationControlButton from "../../elements/locationControlButton";
import ControlDashboard from "../../elements/controlDashboard";
import ControlPanelNav from "../../elements/controlPanelNav";
import {locationColorKeys} from "../../../data/colorMapping";
import AddingLocationWindow from "../../elements/addingLocationWindow";

// Style Imports
import styles from '../../../styles/modules/location-page/ControlPanel.module.css';


// Control Panel Component
const ControlPanel = ({ toggleLanguage, updatePrimaryLocation, updateAdditionalLocation, weatherAPIToken }) => {

    const [addingLocationStatus, setAddingLocationStatus] = useState(false);

    useEffect(() => {
        const window = document.querySelector('.window-overlay')
        if (window) { window.addEventListener('click', function() {setAddingLocationStatus(false);})}
    })

    const handleClick = (e) => {
        setAddingLocationStatus(true);
    }

    const handleClose = (e) => {
        setAddingLocationStatus(false);
    }

    return (
        <Container maxWidth="lg" className={styles.controlPanelSectionContainer}>

            {
                /*{ Section used for Adding Location Search Bar }*/
                addingLocationStatus ? <AddingLocationWindow addingLocationStatusHandler={handleClose}/> : <></>

            }

            <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.locationPage.controlPanel.controlPanel[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
            {
                // INSERT LOGIC TO APPEND CONTROL PANEL ON SCROLL

            <ControlPanelNav clickHandler={handleClick} setAddingLocationStatus={setAddingLocationStatus}/>

            }
            <ControlDashboard weatherAPIToken={weatherAPIToken} color={'#2196F3'} locationData={updatePrimaryLocation.location}/>
            {/*SPACE HERE TO MAP OTHER CONTROL DASHBOARDS*/
                updateAdditionalLocation.locations.length ? updateAdditionalLocation.locations.map((item, index) => {
                    return (
                        <ControlDashboard key={index}  weatherAPIToken={weatherAPIToken} color={locationColorKeys[index].color} locationData={item}/>
                    )
                }) : null
            }
        </Container>
    );
}

export default connect((state) => state)(ControlPanel)
