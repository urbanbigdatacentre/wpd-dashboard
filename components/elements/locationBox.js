// Component to Render Location Tag Inside a Contained Box

// Package Imports
import {Typography, styled, Box} from "@mui/material";
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

// Local Imports

// LocationBox Component


const LocationBox = ({locationName}) => {

    const icons = {
        "City": <LocationCityRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Town": <AccountBalanceRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Municipality": <HomeRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "School": <SchoolRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>
    }

    return (
        <StyledLocationBox>
            { icons.hasOwnProperty(locationName) ? icons[locationName]: null}
            <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `12px`}} >{locationName.toUpperCase()}</Typography>
        </StyledLocationBox>
    )
}


const StyledLocationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    fontSize: `12px`,
    alignItems: `center`,
    justifyContent: `center`,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: `2px`,
    paddingBottom: `2px`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.light,
}))


export default LocationBox;