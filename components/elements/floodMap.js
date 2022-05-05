// Flood Map Component - Uses Deck GL Icon Layers to render Component

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import _MapContext from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React, {useEffect, useState} from "react";
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {IconLayer, GeoJsonLayer} from '@deck.gl/layers';

// Local Imports
import mapIcons from '../../public/images/icons/location-icon-atlas.svg';
import {styled, Box, Typography} from "@mui/material";
import dummyGeoJSON from "../../data/dummyGeoJSON";
import dummyGeoJSONTwo from "../../data/dummyGeoJSONTwo";

// Map Configuration
const mapStyleMapBox1 = 'mapbox://styles/mapbox/streets-v11';
const mapStyleMono = 'mapbox://styles/andyclarke/cl2svmbha002u15pi3k6bqxjn';
const mapStyleSatellite = 'mapbox://styles/andyclarke/cl2svsl4j002f15o39tp0dy2q';
const mapStyleMapBox2 = 'mapbox://styles/andyclarke/cl1z4iue1002w14qdnfkb3gjj'
const mapStyleCarto = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const ambientLight = new AmbientLight({
    color: [247, 203, 21],
    intensity: 1
});

const dirLight = new SunLight({
    timestamp: Date.UTC(2019, 7, 1, 22),
    color: [247, 203, 21],
    intensity: 1.0,
    _shadow: true
});

const ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};

// Street Map Component
const FloodMap = ({ mapBoxToken, updateCarouselCoordinates, mapStylePlain, toggleDataType }) => {

    const [effects] = useState(() => {
        const lightingEffect = new LightingEffect({ambientLight, dirLight});
        lightingEffect.shadowColor = [0, 0, 0, 0.5];
        return [lightingEffect];
    });


    const [tooltip, setTooltip] = useState({});
    const [jsonTooltip, setJSONTooltip] = useState({});

    const geoJsonLayerOfficial = new GeoJsonLayer({
        id: 'geojson-layer',
        data: dummyGeoJSON.features,
        pickable: true,
        stroked: false,
        filled: true,
        // Do we want extruded maps?
        extruded: false,
        pointType: 'circle',
        lineWidthScale: 0,
        lineWidthMinPixels: 1,
        getFillColor: [0, 209, 225, 225],
        getLineColor: [12, 23, 45, 334],
        getPointRadius: 1,
        getLineWidth: 0,
        getElevation: 100,
        onHover: d => setJSONTooltip(d)
    });

    const geoJsonLayerCitizen = new GeoJsonLayer({
        id: 'geojson-layer',
        data: dummyGeoJSONTwo.features,
        pickable: true,
        stroked: false,
        filled: true,
        // Do we want extruded maps?
        extruded: false,
        pointType: 'circle',
        lineWidthScale: 0,
        lineWidthMinPixels: 1,
        getFillColor: [21, 101, 192, 200],
        getLineColor: [12, 23, 45, 334],
        getPointRadius: 1,
        getLineWidth: 0,
        getElevation: 900,
        onHover: d => setJSONTooltip(d)
    });

    const iconLayer = new IconLayer({
        id: "icon-layer",
        data: [
            {
                coordinates: [updateCarouselCoordinates.longitude, updateCarouselCoordinates.latitude],
                timestamp: "2022-04-09T13:32:30.745Z",
                type: "Rain Event",
                citizenType: "Student",
                citizenOrganisation: "School in São Paulo",
                submissionText: "It's a dry day here today!"
            },
            {
                coordinates: [updateCarouselCoordinates.longitude + 0.07, updateCarouselCoordinates.latitude + 0.07],
                timestamp: "2022-04-07T13:32:30.745Z",
                type: "Rain Event",
                citizenType: "Teacher",
                citizenOrganisation: "Colégio Humboldt São Paulo",
                submissionText: "Chuva leve a noite toda continua chovendo ainda."
            }
        ],
        pickable: true,
        iconAtlas: mapIcons.src,
        getIcon: (d) => d.citizenType,
        // NOTE ** ITS ONLY POSSIBLE TO HAVE ONE ICON HERE
        iconMapping: ICON_MAPPING,
        sizeScale: 10,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 12,
        // onHover: d => setTooltip(d)
    });

    // const initialLongitude = mapStylePlain ? updatePrimaryLocation.location.geo.longitude - 0.07 : updateCarouselCoordinates.longitude - 0.07
    // const initialLatitude = mapStylePlain ? updatePrimaryLocation.location.geo.latitude : updateCarouselCoordinates.latitude

    const INITIAL_VIEW_STATE = {
        longitude: updateCarouselCoordinates.longitude - 0.07,
        latitude: updateCarouselCoordinates.latitude,
        zoom: 10,
        minZoom: 2,
        maxZoom: 16,
        pitch: 25,
        bearing: 0
    };

    let layerMapping = {
        "Combined": [iconLayer, geoJsonLayerCitizen, geoJsonLayerOfficial],
        "Official": [geoJsonLayerOfficial],
        "Citizen": [iconLayer, geoJsonLayerCitizen]
    }

    const controllerTrue = mapStylePlain ? Boolean(0) : Boolean(1)

    return (
        <DeckGL layers={layerMapping[toggleDataType.dataType]} controller={controllerTrue} preventStyleDiffing={true} initialViewState={INITIAL_VIEW_STATE} height={'100%'} width={'100%'} ContextProvider={_MapContext.Provider} >
            <StaticMap
                reuseMaps
                mapStyle={mapStyleSatellite}
                mapboxAccessToken={mapBoxToken}
                getTooltip={({object}) => object && `Population:`}
            />

            {/*AREA TO CREATE TOOLTIP*/}

            {tooltip.hasOwnProperty('object') ? (
                <MyTooltipBox sx={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: tooltip.x, top: tooltip.y}}>
                    <TooltipFlex>
                        <Box sx={{display: `flex`}}>
                            <TypeOrganisationBox>
                                <Typography sx={{fontSize: `20px`}} >{tooltip.object.citizenType}</Typography>
                                <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{tooltip.object.citizenOrganisation}</Typography>
                            </TypeOrganisationBox>
                        </Box>
                        <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{tooltip.object.type.toUpperCase()}<span className={"bluePunctuation"}>.</span></Typography>
                    </TooltipFlex>
                    <Typography sx={{fontSize: `20px`, textAlign: `left`, marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} >{'"' + tooltip.object.submissionText + '"'}</Typography>
                    <TooltipFlex>
                        <Typography sx={{color: `#888888`}} >{new Date(tooltip.object.timestamp).toLocaleString().split(',')[0]}</Typography>
                    </TooltipFlex>
                </MyTooltipBox>
            ): null}
        </DeckGL>
    );

}

const MyTooltipBox = styled(Box)(({theme}) => ({
    display: `flex`,
    width: `400px`,
    flexDirection: `column`,
    minHeight: `150px`,
    justifyContent: `space-between`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: `0px 0px 15px #E5E5E5`,
    border: `1.5px solid #E5E5E5`,
}))

const TooltipFlex = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxHeight: `60px`
}))

const TypeOrganisationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-around`,
    marginLeft: theme.spacing(0),
}))

export default connect((state) => state)(FloodMap)