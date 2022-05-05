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
import {locationColorKeys} from "../../../data/colorMapping";
import AddingLocationWindow from "../../elements/addingLocationWindow";

// Style Imports
import styles from '../../../styles/modules/location-page/ControlPanel.module.css';


// Control Panel Component
const ControlPanel = ({ toggleLanguage, updatePrimaryLocation, updateAdditionalLocation }) => {

    const [addingLocationStatus, setAddingLocationStatus] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const windowOverlay = document.querySelector('.window-overlay')
        if (windowOverlay) { windowOverlay.addEventListener('click', function() {setAddingLocationStatus(false);})}

        window.onscroll = function() {
            setSticky(document.querySelector('#control-panel').getBoundingClientRect().top < 64)
        }

    }, [sticky])

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

            <Box id={'control-panel'} className={styles.controlPanelInnerBox}>
                <Box className={sticky ? styles.locationControlBoxSticky : styles.locationControlBox}>
                    <MyButton text={uiText.global.labels.addLocation[toggleLanguage.language]} variant={"contained"} onClick={handleClick}/>
                    <Box sx={{marginLeft: `40px`, marginRight: `40px`}}>
                        <LocationControlButton primary={true} data={updatePrimaryLocation.location} contained={false} color={'#2196F3'}/>
                    </Box>
                    {/*SPACE HERE TO MAP OTHER CONTROL BUTTONS*/
                        updateAdditionalLocation.locations.length ? updateAdditionalLocation.locations.map((item, index) => {
                            return (
                                <Box sx={{marginRight: `40px`, }} key={index}>
                                    <LocationControlButton data={item} contained={false} color={locationColorKeys[index].color}/>
                                </Box>
                            )
                        }) : null
                    }
                </Box>
                <DateFilter positionAbsolute={false}/>
            </Box>

            }
            <ControlDashboard color={'#2196F3'} locationData={updatePrimaryLocation.location}/>
            {/*SPACE HERE TO MAP OTHER CONTROL DASHBOARDS*/
                updateAdditionalLocation.locations.length ? updateAdditionalLocation.locations.map((item, index) => {
                    return (
                        <ControlDashboard color={locationColorKeys[index].color} locationData={item}/>
                    )
                }) : null
            }
        </Container>
    );
}

export default connect((state) => state)(ControlPanel)
