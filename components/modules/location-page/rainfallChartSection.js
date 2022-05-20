// Layout Component for Rainfall Chart - Vis developed with D3


// Package Imports
import {connect} from "react-redux";
import {Box, Container, Divider, Typography} from "@mui/material";
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



// // Rainfall Chart Section Component
// const RainfallChartSection2 = ({ toggleLanguage, configureAPI, updatePrimaryLocation, toggleDate, updatePrimaryLocationDispatch }) => {
//
//     useEffect(() => {
//         console.log("executing")
//         // ADD METHOD TO REQUEST DATA FOR ALL LOCATIONS
//
//         // DECLARE PLUVIOMETER API URL
//         const API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/pluviometers?id=${updatePrimaryLocation.location['placeid']}&startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`
//         axios.get(API_URL)
//             .then(res => {
//                 const newLocation = {
//                     ...updatePrimaryLocation.location,
//                     pluviometerData: res.data['responseData']['array_to_json']
//                 }
//                 updatePrimaryLocationDispatch(newLocation)
//             })
//     }, [updatePrimaryLocationDispatch, Object.keys(updatePrimaryLocation.location).length, toggleDate, configureAPI])
//
//     return (
//       <Container className={styles.visSectionContainer}>
//           <Box className={styles.textLegendWrapper}>
//               <Box className={styles.textWrapper}>
//                   {/*INSERT TEXT LAYOUT HERE*/}
//                   <Box>
//                       <MyTooltip title={uiText.locationPage.rainfallChart.title[toggleLanguage.language]} text={uiText.locationPage.rainfallChart.descriptionParOne[toggleLanguage.language] + "\n" + uiText.locationPage.rainfallChart.descriptionParTwo[toggleLanguage.language]}/>
//                       <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[toggleLanguage.language]}</Typography>
//                   </Box>
//                   <Typography variant={'title'}>{uiText.locationPage.rainfallChart.title[toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
//                   <Divider sx={{width: `60%`, height: (theme) => (theme.spacing(1)), background: `linear-gradient(90deg, #2196F3 0%, #1565C0 100%)`, marginBottom: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(1))}}/>
//               </Box>
//               <Box className={styles.legendWrapper}>
//                   {/*INSERT DATA FILTER HERE*/}
//                   <DataTypeFilter positionMode={`relative`}/>
//               </Box>
//           </Box>
//           {/*INSERT RAINFALL CHART HERE*/}
//           <RainfallChart />
//       </Container>
//     );
// }


//

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
                            <Typography sx={{marginLeft: (theme) => (theme.spacing(2)), marginRight: (theme) => (theme.spacing(1)), fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={"description"}>{uiText.global.labels.howToRead[this.props.toggleLanguage.language]}</Typography>
                        </Box>
                        <Typography variant={'title'}>{uiText.locationPage.rainfallChart.title[this.props.toggleLanguage.language]}<span className={'bluePunctuation'}>.</span></Typography>
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


const mapDispatchToProps = (dispatch) => {
    return {
        updatePrimaryLocationDispatch: bindActionCreators(updatePrimaryLocation, dispatch),
        updateAdditionalLocationDispatch: bindActionCreators(updateAdditionalLocation, dispatch),
        updatePluviometerData: bindActionCreators(updatePluviometerData, dispatch),
    }
}

export default connect((state) => state, mapDispatchToProps)(RainfallChartSection)