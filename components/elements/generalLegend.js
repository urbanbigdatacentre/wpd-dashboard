// General Legend Component

// Package Imports
import {connect} from "react-redux";
import {Box, Divider, IconButton, styled, Typography} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import * as d3 from "d3";

// Local Imports
import uiText from "../../data/ui-text";
import {locationColorKeys} from "../../data/colorMapping";
import {useState} from "react";
import LocationBox from "./locationBox";
import locationPaths from "../../data/locationPaths";
import {toggleLocationPreference} from "../../store/reducers";
import {filterCitizenEventDataByDate, filterPluviometerData} from "../../api/dataFilteringFunctions";

// General Legend Component
const GeneralLegend = ({locationData, toggleLanguage, toggleDate, updatePrimaryLocation, floodMap, updateCitizenEventsRainfallData, toggleLocationPreference, updateCitizenEventsFloodZonesData, updateCitizenEventsRiverFloodData}) => {


    const [menuOpen, setMenuOpenStatus] = useState(false);

    const handleClose = () => {
        setMenuOpenStatus(false)
    }

    const handleOpen = () => {
        setMenuOpenStatus(true)
    }

    // Reformat order of location data array
    let sortedDataArray = [];

    if (locationData.length) {
        sortedDataArray.push( ... locationData.filter((element, index) => element['id'] === updatePrimaryLocation?.location['placeid']))
        sortedDataArray.push( ... locationData.filter((element, index) => element['id'] !== updatePrimaryLocation?.location['placeid']))
    }


    const calculateMeasurements = (dataItem) => {
        let totalMeasurements = 0

        const filteredData = filterPluviometerData([dataItem], toggleDate);

        filteredData['pluviometerData'].forEach(function(singlePluviometer) {
            totalMeasurements += singlePluviometer.hasOwnProperty('records') ?  singlePluviometer.records.length : 0
        })

        return totalMeasurements;
    }

    const renderLegend = (item, index) => {

        const colorCode = index === 0 ? '#2196F3' : locationColorKeys[index - 1]?.color

        const citizenRiverAndFloodData = [];

        const floodZonesData = [... updateCitizenEventsFloodZonesData.locations.filter((element, index) => element['id'] === item['id'])]
        const riverFloodData = [... updateCitizenEventsRiverFloodData.locations.filter((element, index) => element['id'] === item['id'])]

        if (floodZonesData[0]?.citizenFloodZonesEvents) {citizenRiverAndFloodData.push(... filterCitizenEventDataByDate(floodZonesData, 'citizenFloodZonesEvents', toggleDate)['citizenFloodZonesEvents'])}
        if (riverFloodData[0]?.citizenRiverFloodEvents) {citizenRiverAndFloodData.push(... filterCitizenEventDataByDate(riverFloodData, 'citizenRiverFloodEvents', toggleDate)['citizenRiverFloodEvents'])}


        if (floodMap) {
            return (
                <>
                    <LegendLocationName sx={{color: colorCode, paddingRight: (theme) => (theme.spacing(8))}}>{item['locationName'].toUpperCase()}</LegendLocationName>
                    <Divider sx={{width: `100%`, margin: `4px 0 2px 0`}}/>
                    <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{item['floodData'].length + " " + uiText.locationPage.floodMap.riskAreas[toggleLanguage.language].toUpperCase()}</LegendDataText>
                    <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{citizenRiverAndFloodData.length + " " + uiText.global.tooltips.floodEvents[toggleLanguage.language].toUpperCase()}</LegendDataText>
                </>
            )
        } else {
            // Find number of citizen submitted rainfall for each item
            const citizenRainEventLocationMatch = updateCitizenEventsRainfallData.locations.filter(function(el){return el.id === item['id']})

            const lengthOfArray = citizenRainEventLocationMatch.length ? filterCitizenEventDataByDate(citizenRainEventLocationMatch, 'citizenRainfallEvents', toggleDate)['citizenRainfallEvents'].length : 0;

            return (
                <>
                    <LegendLocationName sx={{color: colorCode}}>{item['locationName'].toUpperCase()}</LegendLocationName>
                    <Divider sx={{width: `100%`, margin: `4px 0 2px 0`}}/>
                    <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{item['pluviometerData'].length + " " + uiText.global.tooltips.pluviometers[toggleLanguage.language].toUpperCase()}</LegendDataText>
                    <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{calculateMeasurements(item) + " " + uiText.global.tooltips.meausurements[toggleLanguage.language].toUpperCase()}</LegendDataText>
                    <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{lengthOfArray + " " + uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language].toUpperCase()}</LegendDataText>
                </>
            )
        }
    }

    return (

        <LegendWrapperBox>
            <Box id={"open-menu"} sx={{display: menuOpen ? `block` : `none`}}>
                {/*SECTION DISPLAYED ON MENU OPEN*/}
                <MyIconButton onClick={handleClose} color={"primary"}>
                    <DoubleArrowRoundedIcon fontSize={"small"}/>
                </MyIconButton>
                <LegendMetaInfoBox>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.dataOverview[toggleLanguage.language].toUpperCase()}</Typography>
                    <DateRangeText>{new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)).toLocaleString().split(',')[0] + " - " + new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)).toLocaleString().split(',')[0]}</DateRangeText>
                </LegendMetaInfoBox>
                {
                    sortedDataArray.length ? sortedDataArray.map((item, index) => {



                        return (
                            <LegendItemBox key={index}>
                                {renderLegend(item, index)}
                            </LegendItemBox>
                        )
                    }) : null
                }
            </Box>
            <Box id={'closed-menu'} sx={{display: menuOpen ? `none` : `flex`, flexDirection: `column`}}>
                {/*SECTION DISPLAYED ON MENU CLOSED*/}
                <MyIconButton  onClick={handleOpen} color={"primary"}>
                    <DoubleArrowRoundedIcon fontSize={"small"} sx={{transform: `rotate(180deg)`}}/>
                </MyIconButton>

                <Box sx={{marginTop: (theme) => (theme.spacing(0))}}>
                    <LegendKeyBox>
                        <LegendColorKey sx={{visibility: `hidden`}}></LegendColorKey>
                    </LegendKeyBox>
                    {
                        locationData.length ? locationData.map((item, index) => {

                            const colorCode = index === 0 ? '#2196F3' : locationColorKeys[index - 1]?.color

                            return (
                                <LegendKeyBox key={index}>
                                    <LegendColorKey sx={{backgroundColor: colorCode}}></LegendColorKey>
                                </LegendKeyBox>
                            )
                        }) : null
                    }
                </Box>
            </Box>

        </LegendWrapperBox>
    );
}

const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    zIndex: 601,
    maxWidth: theme.spacing(35),
    right: `0px`,
    bottom: `0px`,
    top: `0px`,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(3),
    paddingRight: theme.spacing(3.5),
    filter: `drop-shadow(-4px 0px 8px rgba(33, 150, 243, 0.1))`,
    [theme.breakpoints.down('sm')]: {
        display: `none`
    },
}))

const LegendMetaInfoBox = styled(Box)(({theme}) => ({

}))

const LegendKeyBox = styled(Box)(({theme}) => ({

}))

const LegendItemBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(3),

}))

const LegendColorKey = styled(Box)(({theme}) => ({
    borderRadius: `50px`,
    marginTop: theme.spacing(2),
    width: theme.spacing(2),
    height: theme.spacing(2),
}))

const LegendDataText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    fontWeight: theme.typography.fontWeightLight,
}))

const LegendLocationName = styled(Typography)(({theme}) => ({
    fontSize: `14px`,
    fontWeight: theme.typography.fontWeightBold
}))

const DateRangeText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    fontWeight: theme.typography.fontWeightLight
}))

const MyIconButton = styled(IconButton)(({theme}) => ({
    position: `absolute`,
    top: theme.spacing(1),
    right: theme.spacing(2.1),
}))

export default connect((state) => state)(GeneralLegend);