// Component for National Activity Map built using deck.gl

// Package Imports
import {connect} from "react-redux";
import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl'
import {Box, styled, Typography} from "@mui/material";

// Local Imports

// Map Component
const NationalActivityMap = ({ mapBoxToken }) => {

    return (
        <NationalActivityMapBox>
            <Typography sx={{zIndex: 600, position: `absolute`, top: (theme) => (theme.spacing(5))}}>Hello World</Typography>
            <MapBoxWrapper>
                <DeckGL initialViewState={{longitude: -53.2, latitude: -10.3333333, zoom: 4}} height={'100%'} width={'100%'}>
                    <StaticMap
                        mapStyle={'mapbox://styles/mapbox/streets-v11'}
                        mapboxAccessToken={mapBoxToken}
                    />
                </DeckGL>
            </MapBoxWrapper>
        </NationalActivityMapBox>
    );

}

const NationalActivityMapBox = styled(Box)(({theme}) => ({
    position: `relative`,

}))

const MapBoxWrapper = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(5),
    height: `600px`,
    width: `100%`,
    position: `relative`,
    borderRadius: theme.shape.borderRadius,
    outline: `2px solid #E5E5E5`,
    zIndex: `100`
}))


export default connect((state) => state)(NationalActivityMap)