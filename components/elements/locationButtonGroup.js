// Location Button Group - allows user to toggle between preferred locations in location page maps

// Package Imports
import {connect} from "react-redux";
import {styled, Box, Button} from "@mui/material";
import MyButton from "./button";

// Local Imports
import {locationColorKeys} from "../../data/colorMapping";
import {changeDataType, changeLocationPreference} from "../../store/actions";
import {bindActionCreators} from "redux";

// Location Button Group Component

const LocationButtonGroup = ({toggleLanguage, updatePrimaryLocation, updateAdditionalLocation, changeLocationPreference, locationPreference}) => {

    const handleClick = (e) => {
        console.log(e.target.value)
        changeLocationPreference(e.target.value)
    }

    return (
        <LocationButtonGroupBox>
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
    top: theme.spacing(1),
    left: theme.spacing(1),
    position: `absolute`,
    display: `flex`,
}))


const mapStateToProps = (state) => {
    return {
        updatePrimaryLocation: state.updatePrimaryLocation,
        toggleLanguage: state.toggleLanguage,
        updateAdditionalLocation: state.updateAdditionalLocation,
        locationPreference: state.toggleLocationPreference.locationPreference,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationButtonGroup)

