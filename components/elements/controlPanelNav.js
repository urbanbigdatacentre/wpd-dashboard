// Navigation Component for Control Panel - Will Stick to Top on Scroll

// Package Imports
import {connect} from "react-redux";
import styles from "../../styles/modules/location-page/ControlPanel.module.css";
import {Box, Container, Toolbar} from "@mui/material";
import MyButton from "./button";
import uiText from "../../data/ui-text";
import LocationControlButton from "./locationControlButton";
import {locationColorKeys} from "../../data/colorMapping";
import DateFilter from "./dateFilter";
import {useEffect, useState} from "react";

// Local Imports


// Control Panel Nav Component

const ControlPanelNav = ({toggleLanguage, updateAdditionalLocation, updatePrimaryLocation, clickHandler, setAddingLocationStatus }) => {

    const [sticky, setSticky] = useState(false);

    useEffect(() => {

        const windowOverlay = document.querySelector('.window-overlay')
        if (windowOverlay) { windowOverlay.addEventListener('click', function() {setAddingLocationStatus(false);})}

        window.onscroll = function() {
            window.location.href.includes('location') ? setSticky(document.querySelector('#control-panel').getBoundingClientRect().top < 64) : null
        }

    }, [sticky])

    const result = sticky ? (
        <Box>
            <Box id={'control-panel'}>
                <Box className={styles.controlPanelInnerBoxSticky} sx={{}}>
                    <Container className={styles.controlPanelContainerSticky}>
                        <Box className={styles.locationControlBox}>
                            <MyButton text={uiText.global.labels.addLocation[toggleLanguage.language]} variant={"contained"} onClick={clickHandler}/>
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
                    </Container>
                </Box>
            </Box>
            <div>
                <Box className={styles.controlPanelInnerBoxHolder}>
                    <Box className={styles.locationControlBox}>
                        <MyButton text={uiText.global.labels.addLocation[toggleLanguage.language]} variant={"contained"} onClick={clickHandler}/>
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
            </div>
        </Box>
    ) : (
        <div id={'control-panel'}>
            <Box className={styles.controlPanelInnerBox}>
                <Box className={styles.locationControlBox}>
                    <MyButton text={uiText.global.labels.addLocation[toggleLanguage.language]} variant={"contained"} onClick={clickHandler}/>
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
        </div>
    )

    return result;
}

export default connect((state) => state)(ControlPanelNav)