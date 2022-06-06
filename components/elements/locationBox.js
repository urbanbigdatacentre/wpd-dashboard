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


const LocationBox = ({locationName, color, iconOnly}) => {

    const icons = {
        "City": <LocationCityRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "State": <TerrainIcon fontSize={"inherit"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Town": <AccountBalanceRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Municipality": <HomeRoundedIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>,
        "Organisation": <PeopleIcon fontSize={"small"} sx={{marginRight: (theme) => (theme.spacing(1))}}/>
    }

    return (
        <StyledLocationBox sx={{backgroundColor: color ? color : (theme) => (theme.palette.primary.main)}}>
            { icons.hasOwnProperty(locationName) ? icons[locationName]: null}
            { iconOnly ? null: <LocationText sx={{
                paddingRight: iconOnly ? (theme) => (theme.spacing(0)) : (theme) => (theme.spacing(1)),
                fontWeight: (theme) => (theme.typography.fontWeightBold),
                fontSize: `11px`,

            }}>{locationName.toUpperCase()}</LocationText>}
        </StyledLocationBox>
    )
}


const StyledLocationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    fontSize: `15px`,
    alignItems: `center`,
    justifyContent: `center`,
    paddingLeft: theme.spacing(1),
    paddingTop: `2px`,
    paddingBottom: `.5px`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.light,
    width: `max-content`,
    height: `max-content`
}))

const LocationText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')] : {
        fontSize: `10px`
    }
}))


export default LocationBox;