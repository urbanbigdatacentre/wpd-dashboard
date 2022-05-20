// Component to Render Location Tag Inside a Contained Box

// Package Imports
import {Typography, styled, Box} from "@mui/material";
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import TerrainIcon from '@mui/icons-material/Terrain';

// Local Imports

// LocationBox Component


const LocationBox = ({locationName, color}) => {

    const icons = {
        "City": <LocationCityRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "State": <TerrainIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Town": <AccountBalanceRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Municipality": <HomeRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Organisation": <PeopleIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>
    }

    return (
        <StyledLocationBox sx={{backgroundColor: color ? color : (theme) => (theme.palette.primary.main)}}>
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
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.light,
}))


export default LocationBox;