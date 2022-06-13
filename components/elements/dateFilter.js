// Component for changing dates
// Clicking this component will change date preferences in the global state
// and across the app

// Package Imports
import {ToggleButton, ToggleButtonGroup, styled, ClickAwayListener, Box} from "@mui/material";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { DateRangePicker } from 'react-date-range';
import * as d3 from 'd3';

// Local Imports
import uiText from "../../data/ui-text";
import dates from '../../data/dates';
import {
    changeDate,
    changeLocationPreference,
    removeCitizenFloodZonesEventsData,
    removeCitizenRainfallEventsData, removeCitizenRiverFloodEventsData,
    removeFloodZonesData,
    removePluviometerData,
    updateAdditionalLocation,
    updateCitizenFloodZonesEventsData,
    updateCitizenRainfallEventsData, updateCitizenRiverFloodEventsData,
    updateFloodZonesData,
    updateGreatestDateRange,
    updatePluviometerData,
    updatePrimaryLocation
} from "../../store/actions";


// Style Imports
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {useState} from "react";
import requestPluviometerData from "../../api/requestPluviometerData";
import requestFloodZonesData from "../../api/requestFloodZonesData";
import requestCitizenEvents from "../../api/requestCitizenEvents"; // theme css file

// Date Filter Component

const DateFilter = (props) => {

    const [displayPicker, setDisplayPicker] = useState(false);

    const handleCustomSelect = (e) => {
        // Change Start Date in Redux store
        handleRequests({"startDate": new Date(e['selection'].startDate).getTime().toString(), "endDate": new Date(e['selection'].endDate).getTime().toString()})
        props.changeDate({"startDate": new Date(e['selection'].startDate).getTime().toString(), "endDate": new Date(e['selection'].endDate).getTime().toString()})
    }

    // DISPLAY AND HIDE DATE RANGE PICKER
    const handleCustomClick = (e) => {
        setDisplayPicker(true)
        document.querySelector('.rdrDateRangePickerWrapper').display = 'inline-flex';
    }

    const handleCustomClickAway = (e) => {
        if (e.target.id !== 'custom-date-button') {
            setDisplayPicker(false)
            document.querySelector('.rdrDateRangePickerWrapper').display = 'none';
        }
    }

    // Handle Date Change
    const handleChange = (e, dateSelection) => {

        // Remove All Selected Classes
        ['24-hours-button', '2-days-button', '7-days-button', '30-days-button', '90-days-button', 'custom-date-button'].forEach(function(item){
            document.getElementById(item).classList.remove('Mui-selected')
        })

        if ((dateSelection !== null) && (e.target.id !== 'custom-date-button')) {
            // Change Redux Date Range State
            handleRequests({"startDate": dateSelection, "endDate": new Date().getTime().toString()})
            props.changeDate({"startDate": dateSelection, "endDate": new Date().getTime().toString()});
        } else {
            document.querySelector('#custom-date-button').classList += ' Mui-selected'
        }
    }

    const positionMode = props.positionAbsolute ? `absolute` : `static`

    const customSelectionRange = {
        startDate: new Date(d3.timeFormat("%B %d, %Y")(props.toggleDate.startDate)),
        endDate: new Date(d3.timeFormat("%B %d, %Y")(props.toggleDate.endDate)),
        key: 'selection'
    }

    // ========
    // CHECK IF REQUEST IS REQUIRED OR NOT
    // ========

    const handleRequests = (dateSelection) => {

        // Check if date range exceeds current data capacity and therefore new request is needed
        const startDateGreater = new Date(d3.timeFormat("%B %d, %Y")(dateSelection.startDate)) < new Date(d3.timeFormat("%B %d, %Y")(props.toggleGreatestDateRange.startDate))

        if (startDateGreater) {
            // Update Greatest Date Range
            props.toggleGreatestDateRangeDispatch({"startDate": new Date(d3.timeFormat("%B %d, %Y")(dateSelection.startDate)).getTime().toString(), "endDate": props.toggleDate.endDate})

            // Remove Existing Data for all locations
            props.updatePluviometerData.locations.forEach(function(location) {

                // Remove the Old Data
                props.removePluviometerDataDispatch(location['id'])
                props.removeCitizenRainfallEventsDataDispatch(location['id'])
                props.removeCitizenFloodZonesEventsDataDispatch(location['id'])
                props.removeCitizenRiverFloodEventsDataDispatch(location['id'])

                // Make Requests for Older Data after 1000

                    // Make Request for Pluviometer Data
                    requestPluviometerData({"placename": location['locationName'], "placeid": location['id']}, {startDate: new Date(d3.timeFormat("%B %d, %Y")(dateSelection.startDate)).getTime().toString(), endDate: dates.now}, props.configureAPI, props.updatePluviometerData, props.updatePluviometerDataDispatch)

                    // Make Request for Citizen Rainfall Events
                    requestCitizenEvents(location['id'], 9, new Date(d3.timeFormat("%B %d, %Y")(dateSelection.startDate)).getTime().toString(), dates.now, location['locationName'], props.configureAPI, props.updateCitizenEventsRainfallData, props.updateCitizenEventsRainfallDataDispatch, true)

                    // Make Request for Citizen FloodZones Events
                    requestCitizenEvents(location['id'], 10, new Date(d3.timeFormat("%B %d, %Y")(dateSelection.startDate)).getTime().toString(), dates.now, location['locationName'], props.configureAPI, props.updateCitizenEventsFloodZonesData, props.updateCitizenFloodZonesEventsDataDispatch, true)

                    // Make Request for Citizen RiverFlood Events
                    requestCitizenEvents(location['id'], 11, new Date(d3.timeFormat("%B %d, %Y")(dateSelection.startDate)).getTime().toString(), dates.now, location['locationName'], props.configureAPI, props.updateCitizenEventsRiverFloodData, props.updateCitizenRiverFloodEventsDataDispatch, true)

            })
            console.log("Requests Made in Date Filter")
        }

    }

    return(
        <DateFilterButtonGroup sx={{position: positionMode}} exclusive value={props.toggleDate.startDate} onChange={handleChange}>
            <DateFilterButton id={'24-hours-button'} value={dates['24Hours']} >{"24 " + uiText.global.labels.hours[props.toggleLanguage.language]}</DateFilterButton>
            <DateFilterButton id={'2-days-button'} value={dates["2Days"]}  >{"2 " + uiText.global.labels.days[props.toggleLanguage.language]}</DateFilterButton>
            <DateFilterButton id={'7-days-button'} value={dates["7Days"]}  >{"7 " + uiText.global.labels.days[props.toggleLanguage.language]}</DateFilterButton>
            <DateFilterButton id={'30-days-button'} value={dates["30Days"]}  >{"30 " + uiText.global.labels.days[props.toggleLanguage.language]}</DateFilterButton>
            <DateFilterButton id={'90-days-button'} value={dates["90Days"]}  >{"90 " + uiText.global.labels.days[props.toggleLanguage.language]}</DateFilterButton>
            <DateFilterButton id={'custom-date-button'} value={""} onClick={handleCustomClick}>{uiText.global.labels.custom[props.toggleLanguage.language]}</DateFilterButton>
            <ClickAwayListener onClickAway={(e) => handleCustomClickAway(e)}>

                <Box>
                    <Box sx={{zIndex: `90000`, display: displayPicker ? `block` : `none`}}>
                        <DateRangePicker
                            maxDate={new Date()}
                            minDate={new Date(2021, 1, 1)}
                            fixedHeight={true}
                            ranges={[customSelectionRange]}
                            onChange={handleCustomSelect}/>
                    </Box>
                </Box>

            </ClickAwayListener>

        </DateFilterButtonGroup>
    )
}


// CSS Styled Components
const DateFilterButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    zIndex: 600,
    top: theme.spacing(6),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.35))`,
    [theme.breakpoints.down('sm')]: {
        top: theme.spacing(5.5),
        right: theme.spacing(.25),
    },
}))

const DateFilterButton = styled(ToggleButton)(({theme}) => ({
    padding: `5px 10px 5px 10px`,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: `12px`,
    color: theme.palette.primary.black,
    backgroundColor: theme.palette.primary.light,
    margin: `0px 1px 0px 0px`,
    border: `1.5px solid #2196F3`,
    '&:last-of-type': {
        margin: `0px 0px 0px 0px`,
    },
    '&.Mui-selected': {
        border: `1.5px solid rgba(21, 101, 192, 0.5)`,
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
        '&:hover, &.Mui-focusVisible': {
            backgroundColor: theme.palette.primary.darkBlue,
            color: theme.palette.primary.light,
        },
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `10px`,
        padding: `2px 6px 2px 6px`,
    },
    [theme.breakpoints.down('450')]: {
        fontSize: `8px`,
    },
    [theme.breakpoints.down('350')]: {
        display: `none`
    },
}))

// REDUX CONNECTIONS
// Map Dispatch to Props

const mapDispatchToProps = (dispatch) => {
    return {
        changeDate: bindActionCreators(changeDate, dispatch),
        toggleGreatestDateRangeDispatch: bindActionCreators(updateGreatestDateRange, dispatch),
        updatePrimaryLocationDispatch: bindActionCreators(updatePrimaryLocation, dispatch),
        updateAdditionalLocationDispatch: bindActionCreators(updateAdditionalLocation, dispatch),
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
        updatePluviometerDataDispatch: bindActionCreators(updatePluviometerData, dispatch),
        removePluviometerDataDispatch: bindActionCreators(removePluviometerData, dispatch),
        updateFloodDataDispatch: bindActionCreators(updateFloodZonesData, dispatch),
        removeFloodDataDispatch: bindActionCreators(removeFloodZonesData, dispatch),
        updateCitizenEventsRainfallDataDispatch: bindActionCreators(updateCitizenRainfallEventsData, dispatch),
        removeCitizenRainfallEventsDataDispatch: bindActionCreators(removeCitizenRainfallEventsData, dispatch),
        updateCitizenFloodZonesEventsDataDispatch: bindActionCreators(updateCitizenFloodZonesEventsData, dispatch),
        removeCitizenFloodZonesEventsDataDispatch: bindActionCreators(removeCitizenFloodZonesEventsData, dispatch),
        updateCitizenRiverFloodEventsDataDispatch: bindActionCreators(updateCitizenRiverFloodEventsData, dispatch),
        removeCitizenRiverFloodEventsDataDispatch: bindActionCreators(removeCitizenRiverFloodEventsData, dispatch)
    }
}


// Export Component & Connect to Store
export default connect((state) => state, mapDispatchToProps)(DateFilter)
