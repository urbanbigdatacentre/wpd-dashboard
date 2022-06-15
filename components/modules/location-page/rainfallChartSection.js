// Layout Component for Rainfall Chart - Vis developed with D3


// Package Imports
import {connect} from "react-redux";
import {Box, Container, Divider, styled, Typography} from "@mui/material";
import axios from "axios";
import React from 'react';

// Local Imports
import MyTooltip from "../../elements/tooltip";
import uiText from "../../../data/ui-text";
import DataTypeFilter from "../../elements/dataTypeFilter";
import RainfallChart from "../../elements/rainfallChart";
import config from "../../../api/config";
import {bindActionCreators} from "redux";
import {
    changeLocationPreference,
    updateAdditionalLocation,
    updatePluviometerData,
    updatePrimaryLocation
} from "../../../store/actions";

// Style Imports
import styles from '../../../styles/modules/location-page/VisSectionLayout.module.css';
import {useEffect} from "react";


// Rainfall Chart Section Component
class RainfallChartSection extends React.Component {

    render() {
        return (
            <Container className={styles.visSectionContainer}>
                <Box className={styles.textLegendWrapper}>
                    <Box className={styles.textWrapper}>
                        {/*INSERT TEXT LAYOUT HERE*/}
                        <Box>
                            <MyTooltip title={uiText.locationPage.rainfallChart.title[this.props.toggleLanguage.language]} text={uiText.locationPage.rainfallChart.descriptionParOne[this.props.toggleLanguage.language] + "\n" + uiText.locationPage.rainfallChart.descriptionParTwo[this.props.toggleLanguage.language]}/>
                            <HelpText sx={{marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[this.props.toggleLanguage.language]}</HelpText>
                        </Box>
                        <ChartTitle >{uiText.locationPage.rainfallChart.title[this.props.toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></ChartTitle>
                        <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
                    </Box>
                    <Box className={styles.legendWrapper}>
                        {/*INSERT DATA FILTER HERE*/}
                        <DataTypeFilter positionMode={`relative`}/>
                    </Box>
                </Box>
                {/*INSERT RAINFALL CHART HERE*/}
                <RainfallChart />
            </Container>
        )
    }
}

const HelpText = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `16px`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
        marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

const ChartTitle = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `45px`,
    [theme.breakpoints.down('lg')]: {
        fontSize: `40px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `30px`,
    },
}))


const mapDispatchToProps = (dispatch) => {
    return {
        updatePrimaryLocationDispatch: bindActionCreators(updatePrimaryLocation, dispatch),
        updateAdditionalLocationDispatch: bindActionCreators(updateAdditionalLocation, dispatch),
        updatePluviometerData: bindActionCreators(updatePluviometerData, dispatch),
    }
}

export default connect((state) => state, mapDispatchToProps)(RainfallChartSection)