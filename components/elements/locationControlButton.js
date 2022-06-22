// Component used to render location control button used inside Control Panel


// Package Imports
import {connect} from "react-redux";
import {Typography, styled, Box, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {bindActionCreators} from "redux";
import {
    changeLocationPreference,
    updatePrimaryLocation,
    removeAdditionalLocation,
    removePluviometerData,
    removeFloodZonesData,
    removeCitizenRainfallEventsData,
    removeCitizenFloodZonesEventsData,
    removeCitizenRiverFloodEventsData
} from "../../store/actions";


// Local Imports


// Location Control Button Component

const LocationControlButton = ({ toggleLocationPreference, changeLocationPreferenceDispatch, primary, data, color, contained, removePluviometerData, updateAdditionalLocation, updatePrimaryLocationAction, removeAdditionalLocation, removeFloodZonesData, removeCitizenRainfallEventsData, removeCitizenFloodZonesEventsData, removeCitizenRiverFloodEventsData }) => {

    const handleClick = (e) => {
        if (primary) {
            const newPrimary = updateAdditionalLocation.locations[0];
            // Update Primary Location
            updatePrimaryLocationAction(newPrimary)
            // Remove same item from additionalLocation state
            removeAdditionalLocation(newPrimary);
            // Remove pluviometer Data for that item
            removePluviometerData(data['placeid'])
            // Remove Flood Data for that Location
            removeFloodZonesData(data['placeid'])
            // Remove Citizen Rainfall Events Data for that Location
            removeCitizenRainfallEventsData(data['placeid'])
            // Remove Citizen FloodZone Events Data for that Location
            removeCitizenFloodZonesEventsData(data['placeid'])
            // Remove Citizen RiverFlood Events Data for that Location
            removeCitizenRiverFloodEventsData(data['placeid'])
            // Set new primary as new location preference
            if (toggleLocationPreference.locationID === data['placeid']) {
                changeLocationPreferenceDispatch(newPrimary['placename'], newPrimary['placeid'])
            }

        } else {
            const locationItem = updateAdditionalLocation.locations.find((element, index) => element['placeid'] == data['placeid']);
            // Remove Pluviometer Data
            removePluviometerData(locationItem['placeid'])
            // Remove Flood Zones Data
            removeFloodZonesData(locationItem['placeid'])
            // Remove Citizen Rainfall Events Data for that Location
            removeCitizenRainfallEventsData(locationItem['placeid'])
            // Remove Citizen FloodZone Events Data for that Location
            removeCitizenFloodZonesEventsData(locationItem['placeid'])
            // Remove Citizen FloodZone Events Data for that Location
            removeCitizenRiverFloodEventsData(locationItem['placeid'])
            // Find Which Item to remove
            removeAdditionalLocation(locationItem);
            // If location preference - change location preference

        }
    }

    return (

      <MyLocationControlBox sx={{backgroundColor: contained ? color : `none`, color: contained ? `#fff` : color, border: contained ? `none`: `1px solid ${color}`}}>
          <MyCancelIconButton sx={{display: updateAdditionalLocation.locations.length ? `block`: `none`}} onClick={() => handleClick()}>
              <CancelIcon style={{color: color}}/>
          </MyCancelIconButton>
          <LocationName sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `14px`}} >{data['placename'].toUpperCase()}</LocationName>
      </MyLocationControlBox>
    );
}

const MyCancelIconButton = styled(IconButton)(({theme}) => ({
    position: `absolute`,
    zIndex: 1000,
    opacity: 1,
    top: -15,
    left: -15,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0.25)
}))

const MyLocationControlBox = styled(Box)(({theme}) => ({
    position: `relative`,
    display: `flex`,
    fontSize: `12px`,
    alignItems: `center`,
    justifyContent: `center`,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: `8px`,
    paddingBottom: `8px`,
    borderRadius: theme.shape.borderRadius,
    minWidth: `max-content`,

}))

const LocationName = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `11px`,
    },
}))

const mapDispatchToProps = (dispatch) => {
    return {
        updatePrimaryLocationAction: bindActionCreators(updatePrimaryLocation, dispatch),
        removeAdditionalLocation: bindActionCreators(removeAdditionalLocation, dispatch),
        removePluviometerData: bindActionCreators(removePluviometerData, dispatch),
        changeLocationPreferenceDispatch: bindActionCreators(changeLocationPreference, dispatch),
        removeFloodZonesData: bindActionCreators(removeFloodZonesData, dispatch),
        removeCitizenRainfallEventsData: bindActionCreators(removeCitizenRainfallEventsData, dispatch),
        removeCitizenFloodZonesEventsData: bindActionCreators(removeCitizenFloodZonesEventsData, dispatch),
        removeCitizenRiverFloodEventsData: bindActionCreators(removeCitizenRiverFloodEventsData, dispatch)


    }
}


export default connect((state) => state, mapDispatchToProps)(LocationControlButton)