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
import {changeDate} from "../../store/actions";


// Style Imports
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {useState} from "react"; // theme css file

// Date Filter Component

const DateFilter = ({ language, startDate, endDate, changeDate, positionAbsolute }) => {

    const [displayPicker, setDisplayPicker] = useState(false);

    const handleCustomSelect = (e) => {
        console.log(e)
        // Change Start Date in Redux store
        changeDate({"startDate": new Date(e['selection'].startDate).getTime().toString(), "endDate": new Date(e['selection'].endDate).getTime().toString()})
    }

    // DISPLAY AND HIDE DATE RANGE PICKER
    const handleCustomClick = (e) => {
        setDisplayPicker(true)
        document.querySelector('.rdrDateRangePickerWrapper').display = 'inline-flex';
    }

    const handleCustomClickAway = (e) => {
        if (e.target.id !== 'custom-date-button') {
            setDisplayPicker(false)
            document.querySelector('.rdrDateRangePickerWrapper').display = 'none'
        }
    }

    // Handle Date Change
    const handleChange = (e, dateSelection) => {

        if ((dateSelection !== null) && (e.target.id !== 'custom-date-button')) {
            // Change Redux Date Range State
            changeDate({"startDate": dateSelection, "endDate": new Date().getTime()});
        }
    }

    const positionMode = positionAbsolute ? `absolute` : `static`

    const customSelectionRange = {
        startDate: new Date(d3.timeFormat("%B %d, %Y")(startDate)),
        endDate: new Date(d3.timeFormat("%B %d, %Y")(endDate)),
        key: 'selection'
    }

    return(
        <DateFilterButtonGroup sx={{position: positionMode}} exclusive value={startDate} onChange={handleChange}>
            <DateFilterButton value={dates['24Hours']} >{"24 " + uiText.global.labels.hours[language]}</DateFilterButton>
            <DateFilterButton value={dates["2Days"]}  >{"2 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={dates["7Days"]}  >{"7 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={dates["30Days"]}  >{"30 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={dates["90Days"]}  >{"90 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton id={'custom-date-button'} value={""} onClick={handleCustomClick} >{uiText.global.labels.custom[language]}</DateFilterButton>
            <ClickAwayListener onClickAway={(e) => handleCustomClickAway(e)}>

                <Box>
                    <Box sx={{display: displayPicker ? `block` : `none`}}>
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
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.35))`
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
}))

// REDUX CONNECTIONS
// Map State + Dispatch to Props

const mapStateToProps = (state) => {
    return {
        startDate: state.toggleDate.startDate,
        endDate: state.toggleDate.endDate,
        language: state.toggleLanguage.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeDate: bindActionCreators(changeDate, dispatch),
    }
}


// Export Component & Connect to Store
export default connect(mapStateToProps, mapDispatchToProps)(DateFilter)
