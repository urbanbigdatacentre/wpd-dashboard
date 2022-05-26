// WPD Landing Statistics Bar Module

// Package Imports
import {connect} from "react-redux";

// Local Imports
import StatCard from "../../elements/statCard";
import {Box, Container, styled} from "@mui/material";
import uiText from "../../../data/ui-text";
import {useEffect, useState} from "react";

const StatisticsBar = ({ toggleLanguage }) => {

    const [stats, setStats] = useState({});

    // Function to set stat bar numbers using axios get request on component mount
    useEffect(() => {
        // Create Get Request Here 👇
    }, [stats])

    return (
        <StatisticsBarSectionContainer>
            <StatisticsBarRowBox>
                {/* Use Map Function to Map Stats in State to StatCard Components */}
                <StatCard number={183} text={uiText.landingPage.statisticsBar.pluviometers[toggleLanguage.language]}/>
                <StatCard number={6542} text={uiText.landingPage.statisticsBar.rowsOfData[toggleLanguage.language]}/>
                <StatCard number={183} text={uiText.landingPage.statisticsBar.citizenReporters[toggleLanguage.language]}/>
            </StatisticsBarRowBox>
            <StatisticsBarRowBox>
                <StatCard number={206} text={uiText.landingPage.statisticsBar.partnerSchools[toggleLanguage.language]}/>
                <StatCard number={99} text={uiText.landingPage.statisticsBar.protectionAgencies[toggleLanguage.language]}/>
                <StatCard number={68} text={uiText.landingPage.statisticsBar.cityCoverage[toggleLanguage.language]}/>
            </StatisticsBarRowBox>
        </StatisticsBarSectionContainer>
    );
}

const StatisticsBarSectionContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(12)
    },
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(20)
    },

}));

const StatisticsBarRowBox = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    marginTop: `2rem`
}))


export default connect((state) => state)(StatisticsBar)