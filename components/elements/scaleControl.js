// Scale Control Component - Used across Maps to show scale of map view - should appear on zoomable maps

// Package Imports
import {ScaleControl} from "react-map-gl";
import {Box, styled} from "@mui/material";

const MapScaleControl = ({position}) => {
    return (
        <ScaleControlBox sx={{marginBottom: (theme) => (theme.spacing(2))}}>
            <ScaleControl position={position ? position : 'bottom-left'}/>
        </ScaleControlBox>
    );
}

const ScaleControlBox = styled(Box)(({theme}) => ({
    right: `75px`,
    [theme.breakpoints.down('md')]: {
        right: `0px`,
    },
}))

export default MapScaleControl;


