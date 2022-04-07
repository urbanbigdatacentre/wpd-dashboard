// WPD Landing Statistics Bar Module

// Package Imports
import {connect} from "react-redux";

// Local Imports
import StatCard from "../../elements/statCard";
import {Box, Container} from "@mui/material";
import uiText from "../../../data/ui-text";
import {useEffect, useState} from "react";
import styles from '../../../styles/modules/landing-page/StatisticsBar.module.css';

const StatisticsBar = ({ toggleLanguage }) => {

    const [stats, setStats] = useState({});

    // Function to set stat bar numbers using axios get request on component mount
    useEffect(() => {
        // Create Get Request Here 👇
    }, [stats])

    return (
        <Container className={styles.statisticsBarSectionContainer}>
            <Box className={styles.statisticsBarRowContainer}>
                <StatCard number={183} text={uiText.landingPage.statisticsBar.pluviometers[toggleLanguage.language]}/>
                <StatCard number={6542} text={uiText.landingPage.statisticsBar.rowsOfData[toggleLanguage.language]}/>
                <StatCard number={183} text={uiText.landingPage.statisticsBar.citizenReporters[toggleLanguage.language]}/>
            </Box>
            <Box className={styles.statisticsBarRowContainer}>
                <StatCard number={206} text={uiText.landingPage.statisticsBar.partnerSchools[toggleLanguage.language]}/>
                <StatCard number={99} text={uiText.landingPage.statisticsBar.protectionAgencies[toggleLanguage.language]}/>
                <StatCard number={68} text={uiText.landingPage.statisticsBar.cityCoverage[toggleLanguage.language]}/>
            </Box>
        </Container>
    );
}

export default connect((state) => state)(StatisticsBar)