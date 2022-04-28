// Component used to render location control button used inside Control Panel


// Package Imports
import {connect} from "react-redux";
import {Typography, styled, Box, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

// Local Imports


// Location Control Button Component

const LocationControlButton = ({ toggleLanguage, text, color, contained }) => {

    return (

      <MyLocationControlBox sx={{backgroundColor: contained ? color : `none`, color: contained ? `#fff` : color, border: contained ? `none`: `1px solid ${color}`}}>
          <MyCancelIconButton>
              <CancelIcon color={"primary"}/>
          </MyCancelIconButton>
          <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `14px`}} >{text.toUpperCase()}</Typography>
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
    paddingTop: `2px`,
    paddingBottom: `2px`,
    marginLeft: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
}))


export default connect((state) => state)(LocationControlButton)