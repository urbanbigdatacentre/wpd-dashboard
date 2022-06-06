// Flood Map Component - Uses Deck GL Icon Layers to render Component

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import _MapContext from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {IconLayer, GeoJsonLayer} from '@deck.gl/layers';

// Local Imports
import mapIcons from '../../public/images/icons/location-icon-atlas.svg';
import {styled, Box, Typography} from "@mui/material";
import dummyGeoJSONTwo from "../../data/dummyGeoJSONTwo";
import locationPaths from "../../data/locationPaths";
import {MapboxLayer} from "@deck.gl/mapbox";
import {bindActionCreators} from "redux";
import {updateFloodCoordinates} from "../../store/actions";

// Map Configuration
const mapStyleSatellite = 'mapbox://styles/andyclarke/cl2svsl4j002f15o39tp0dy2q';
const mapStyleMono = 'mapbox://styles/andyclarke/cl2svmbha002u15pi3k6bqxjn';

const ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};

// Street Map Component
const FloodMap = ({ updateFloodData, updateFloodCoordinates, updateFloodCoordinatesDispatch, mapBoxToken, updateCarouselCoordinates, mapStylePlain, toggleDataType, updateAdditionalLocation, updatePrimaryLocation, toggleLocationPreference }) => {


    const [tooltip, setTooltip] = useState({});
    const [jsonTooltip, setJSONTooltip] = useState({});

    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback(() => {

        if (!mapLoaded) {

            const map = mapRef.current.getMap();
            const deck = deckRef.current.deck;

            // MAP BOX CODE - Water currently overlaps Layers
            const layers = map.getStyle().layers;

            // Find the index of the first symbol layer in the map style.
            let firstSymbolId;
            for (const layer of layers) {
                if (layer.type === 'symbol') {
                    firstSymbolId = layer.id;
                    break;
                }
            }

            map.addLayer(new MapboxLayer({ id: "dummy-layer", deck }));
            map.addLayer(new MapboxLayer({ id: "official-floodzones-geojson-layer", deck }), "admin-0-boundary-disputed");

        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);


    const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference)

    // Find Preferred Location Flood Data
    const floodZonesData = updateFloodData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    const useFloodDataSettings = floodZonesData.length ? floodZonesData[0].floodData : []


    const locationSettings = {
        initialLongitude: useFloodDataSettings.length ? updateFloodCoordinates.latitude : additionalLocationFilter.length ? additionalLocationFilter[0]['longitude'] - 0.07 : updatePrimaryLocation.location.longitude - 0.07,
        initialLatitude: useFloodDataSettings.length ? updateFloodCoordinates.longitude : additionalLocationFilter.length ? additionalLocationFilter[0]['latitude'] - 0.07: updatePrimaryLocation.location.latitude - 0.07,
        zoom: useFloodDataSettings.length ? 15 : 8,
        locationObject: additionalLocationFilter.length ? additionalLocationFilter[0] : updatePrimaryLocation.location,
        floodData: useFloodDataSettings.length ? floodZonesData[0].floodData : []
    }

    // console.log("lon", locationSettings.initialLongitude)
    // console.log("lat", locationSettings.initialLatitude)

    useEffect(() => {

        if (useFloodDataSettings.length) {
            let latitude = floodZonesData[0].floodData[0].geometry['coordinates'][0][0][0][0] === undefined ? floodZonesData[0].floodData[0].geometry['coordinates'][0][0][0] : floodZonesData[0].floodData[0].geometry['coordinates'][0][0][0][0];
            let longitude = floodZonesData[0].floodData[0].geometry['coordinates'][0][0][0][1] === undefined ? floodZonesData[0].floodData[0].geometry['coordinates'][0][0][1] : floodZonesData[0].floodData[0].geometry['coordinates'][0][0][0][1];

            updateFloodCoordinatesDispatch({latitude: latitude, longitude: longitude})
        }
    }, [toggleLocationPreference.locationID])

    const fillMapping = {
        "Baixa": [247, 119, 111, 200],
        "Média": [218, 65, 103, 200],
        "Alta": [92, 47, 96, 200],
    }

    const geoJsonLayerOfficial = new GeoJsonLayer({
        id: 'official-floodzones-geojson-layer',
        data: locationSettings.floodData,
        pickable: true,
        stroked: true,
        filled: true,
        extruded: false,
        pointType: 'circle',
        lineWidthScale: 1,
        lineWidthMinPixels: 0,
        getFillColor: d => fillMapping[d['classvalue']],
        getPointRadius: 1,
        getLineWidth: 2,
        onHover: d => setJSONTooltip(d)
    });

    const geoJsonLayerCitizen = new GeoJsonLayer({
        id: 'geojson-layer' + new Date().getTime(),
        data: dummyGeoJSONTwo.features,
        pickable: true,
        stroked: true,
        filled: true,
        // Do we want extruded maps?
        extruded: false,
        pointType: 'circle',
        lineWidthScale: 0,
        lineWidthMinPixels: 1.5,
        getFillColor: [21, 101, 192, 175],
        getLineColor: [16, 73, 138, 250],
        getPointRadius: 1,
        getLineWidth: 0,
        getElevation: 900,
        onHover: d => setJSONTooltip(d)
    });

    const iconLayer = new IconLayer({
        id: "flood-citizen-event-icon-layer" + new Date().getTime(),
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


    const INITIAL_VIEW_STATE = {
        longitude: locationSettings.initialLongitude,
        latitude: locationSettings.initialLatitude,
        zoom: locationSettings.zoom,
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
        <DeckGL
            ref={deckRef}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
            layers={layerMapping[toggleDataType.dataType]}
            controller={controllerTrue} preventStyleDiffing={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'}
            width={'100%'} >

            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    ref={mapRef}
                    gl={glContext}
                    mapStyle={mapStyleSatellite}
                    mapboxAccessToken={mapBoxToken}
                    onLoad={onMapLoad}
                />
            )}

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


const mapDispatchToProps = (dispatch) => {
    return {
        updateFloodCoordinatesDispatch: bindActionCreators(updateFloodCoordinates, dispatch),
    }
}


export default connect((state) => state, mapDispatchToProps)(FloodMap)