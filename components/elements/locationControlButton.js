// Component used to render location control button used inside Control Panel


// Package Imports
import {connect} from "react-redux";
import {Typography, styled, Box, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import {bindActionCreators} from "redux";
import {updateAdditionalLocation, updatePrimaryLocation, removeAdditionalLocation} from "../../store/actions";

// Local Imports


// Location Control Button Component

const LocationControlButton = ({ toggleLanguage, primary, data, color, contained, updatePrimaryLocation, updateAdditionalLocation, updatePrimaryLocationAction, removeAdditionalLocation }) => {

    const handleClick = (e) => {
        if (primary) {
            const newPrimary = updateAdditionalLocation.locations[0];
            // Update Primary Location
            updatePrimaryLocationAction(newPrimary)
            // Remove same item from additionalLocation state
            removeAdditionalLocation(newPrimary);
        } else {
            // Find Which Item to remove
            removeAdditionalLocation(updateAdditionalLocation.locations.find((element, index) => element['placeid'] == data['placeid']));
            // removeAdditionalLocation(newPrimary);
        }
    }

    return (

      <MyLocationControlBox sx={{backgroundColor: contained ? color : `none`, color: contained ? `#fff` : color, border: contained ? `none`: `1px solid ${color}`}}>
          <MyCancelIconButton sx={{display: updateAdditionalLocation.locations.length ? `block`: `none`}} onClick={() => handleClick()}>
              <CancelIcon style={{color: color}}/>
          </MyCancelIconButton>
          <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `14px`}} >{data['placename'].toUpperCase()}</Typography>
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

const mapDispatchToProps = (dispatch) => {
    return {
        updatePrimaryLocationAction: bindActionCreators(updatePrimaryLocation, dispatch),
        removeAdditionalLocation: bindActionCreators(removeAdditionalLocation, dispatch),
    }
}


export default connect((state) => state, mapDispatchToProps)(LocationControlButton)