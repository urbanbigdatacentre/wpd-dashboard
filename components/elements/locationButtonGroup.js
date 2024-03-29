// Location Button Group - allows user to toggle between preferred locations in location page maps

// Package Imports
import {connect} from "react-redux";
import {styled, Box, Button} from "@mui/material";
import MyButton from "./button";

// Local Imports
import {locationColorKeys} from "../../data/colorMapping";
import {
    changeDataType,
    changeLocationPreference, removeFloodZonesData,
    updateFloodCoordinates,
    updateFloodZonesData
} from "../../store/actions";
import {bindActionCreators} from "redux";
import requestFloodZonesBBOXData from "../../api/requestFloodZonesBBOXData";


// Location Button Group Component

const LocationButtonGroup = ({toggleLanguage, configureAPI, updateFloodCoordinates, updateFloodData, updateFloodDataDispatch, removeFloodDataDispatch, toggleLocationPreference, updatePrimaryLocation, updateAdditionalLocation, changeLocationPreference, locationPreference, positionMode}) => {

    const handleClick = (e) => {

        // Define Location Object & Settings - Primary vs Additional
        const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === e.target.value)
        const logicalLocationObject =  additionalLocationFilter.length ? additionalLocationFilter[0]: updatePrimaryLocation.location
        changeLocationPreference(e.target.value, logicalLocationObject['placeid'])

        // Update Flood Coordinates
        updateFloodCoordinates({latitude: logicalLocationObject.longitude, longitude: logicalLocationObject.latitude, zoom: 8})

        // // Request new floodzones data
        // const bounds = latLngToBounds(logicalLocationObject.latitude, logicalLocationObject.longitude, 8, 1000, 600)
        // requestFloodZonesBBOXData(bounds.join(','), configureAPI, updateFloodData, updateFloodDataDispatch, toggleLocationPreference, removeFloodDataDispatch);
    }


    return (
        <LocationButtonGroupBox sx={{position: positionMode, top: positionMode !== 'absolute' ? (theme) => (theme.spacing(3)) : (theme) => (theme.spacing(1)), left: positionMode !== 'absolute' ? (theme) => (theme.spacing(0)) : (theme) => (theme.spacing(1))}}>
            <MyButton value={updatePrimaryLocation.location['placename']} onClick={(e) => handleClick(e)} preferredLocation={locationPreference === updatePrimaryLocation.location['placename']} addMargin={true} text={updatePrimaryLocation.location['placename']} variant={'contained'}></MyButton>
            {updateAdditionalLocation.locations.length ? updateAdditionalLocation.locations.map((item, index) => {
                return (
                    <MyButton value={item['placename']} onClick={(e) => handleClick(e)} key={index} preferredLocation={locationPreference === item['placename']} addMargin={true} color={locationColorKeys[index].color} text={item['placename']} variant={'contained'}></MyButton>
                );
            }) : null}
        </LocationButtonGroupBox>
    );
}

const LocationButtonGroupBox = styled(Box)(({theme}) => ({
    zIndex: 600,
    display: `flex`,
    flexWrap: `wrap`,
    gap: `1em .5em`
}))


const mapStateToProps = (state) => {
    return {
        updatePrimaryLocation: state.updatePrimaryLocation,
        toggleLanguage: state.toggleLanguage,
        updateAdditionalLocation: state.updateAdditionalLocation,
        locationPreference: state.toggleLocationPreference.locationPreference,
        configureAPI: state.configureAPI,
        updateFloodData: state.updateFloodData,
        toggleLocationPreference: state.toggleLocationPreference
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
        updateFloodCoordinates: bindActionCreators(updateFloodCoordinates, dispatch),
        updateFloodDataDispatch: bindActionCreators(updateFloodZonesData, dispatch),
        removeFloodDataDispatch: bindActionCreators(removeFloodZonesData, dispatch),


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationButtonGroup)

