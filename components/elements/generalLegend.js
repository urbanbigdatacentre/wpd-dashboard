// General Legend Component

// Package Imports


// Local Imports


// General Legend Component
import {Box, Divider, Slider, styled, Typography} from "@mui/material";
import LocationBox from "./locationBox";
import {useEffect} from "react";
import locationPaths from "../../data/locationPaths";

const GeneralLegend = ({locationData}) => {

    return (

        <LegendWrapperBox>
            {
                locationData.length ? locationData.map((item, index) => {

                    console.log(locationPaths[item['placetype']])

                    return (
                        <Box key={index}>
                            <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>CHART DATA</Typography>
                            <LocationBox locationName={locationPaths[item['locationType']].text} color={'#fff'}/>
                            <Typography sx={{paddingTop: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold), color: '#fff'}}>{locationPaths[item['locationType']].text.toUpperCase()}</Typography>
                            <Divider sx={{width: `100%`}}/>
                        </Box>
                    )
                }) : null
            }
        </LegendWrapperBox>
    );
}

const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    zIndex: 600,
    maxWidth: theme.spacing(35),
    height: `150px`,
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid #2196F3`,
    padding: theme.spacing(3),
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.25))`
}))

export default GeneralLegend;