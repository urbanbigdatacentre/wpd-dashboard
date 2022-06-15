// Component to allow user to toggle between types of data in visualisations - Combined - Official - Citizen

// Package Imports
import {ToggleButton, ToggleButtonGroup, styled} from "@mui/material";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeDataType} from "../../store/actions";
import uiText from "../../data/ui-text";

// Local Imports


// Data Type Filter Component
const DataTypeFilter = ({language, changeDataType, dataType, positionMode}) => {

    const handleChange = (e) => {
        if (e.target.value !== null) {
            // Change Redux Language State
            changeDataType(e.target.value);
        }
    }

    return (
        <DataFilterButtonGroup exclusive value={dataType} onChange={handleChange} sx={{position: positionMode, right: positionMode === `absolute` ? (theme) => theme.spacing(10) : (theme) => theme.spacing(1), top: positionMode === `absolute` ? (theme) => theme.spacing(1) : (theme) => theme.spacing(0)}}>
                <DataFilterButton value={"Combined"}>{uiText.global.labels.combined[language]}</DataFilterButton>
                <DataFilterButton value={"Official"}>{uiText.global.labels.officialData[language]}</DataFilterButton>
                <DataFilterButton value={"Citizen"}>{uiText.global.labels.citizenReports[language]}</DataFilterButton>
        </DataFilterButtonGroup>
    )
}

// CSS Styled Components
const DataFilterButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    position: `absolute`,
    zIndex: 600,
    backgroundColor: theme.palette.primary.light,
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.35))`,

}))

const DataFilterButton = styled(ToggleButton)(({theme}) => ({
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
    },
}))

const mapStateToProps = (state) => {
    return {
        dataType: state.toggleDataType.dataType,
        language: state.toggleLanguage.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeDataType: bindActionCreators(changeDataType, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTypeFilter)