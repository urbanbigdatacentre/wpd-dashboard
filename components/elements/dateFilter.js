// Component for changing dates
// Clicking this component will change date preferences in the global state
// and across the app

// Package Imports
import {ToggleButton, ToggleButtonGroup, styled} from "@mui/material";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// Local Imports
import uiText from "../../data/ui-text";
import dates from '../../data/dates';
import {changeDate} from "../../store/actions";
import {useEffect, useState} from "react";

// Date Filter Component

const DateFilter = ({ language, startDate, endDate, changeDate }) => {

    // Handle Date Change
    const handleChange = (e, dateSelection) => {

        if (dateSelection !== null) {
            // Change Redux Date Range State
            changeDate({"startDate": dateSelection, "endDate": endDate});
        }
    }

    return(
        <DateFilterButtonGroup exclusive value={startDate} onChange={handleChange}>
            <DateFilterButton value={dates['24Hours']} >{"24 " + uiText.global.labels.hours[language]}</DateFilterButton>
            <DateFilterButton value={dates["2Days"]}  >{"2 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={dates["7Days"]}  >{"7 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={dates["30Days"]}  >{"30 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={dates["90Days"]}  >{"90 " + uiText.global.labels.days[language]}</DateFilterButton>
            <DateFilterButton value={""}  >{uiText.global.labels.custom[language]}</DateFilterButton>
        </DateFilterButtonGroup>
    )
}


// CSS Styled Components
const DateFilterButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    position: `absolute`,
    zIndex: 600,
    top: theme.spacing(6),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.35))`
}))

const DateFilterButton = styled(ToggleButton)(({theme}) => ({
    fontWeight: theme.typography.fontWeightRegular,
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
