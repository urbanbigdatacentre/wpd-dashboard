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
import {styled, Box, Typography} from "@mui/material";
import dummyGeoJSONTwo from "../../data/dummyGeoJSONTwo";
import CITIZEN_EVENTS_ICON_MAPPING from "../../data/citizenRainfallEventsIconMapping";
import {MapboxLayer} from "@deck.gl/mapbox";
import {bindActionCreators} from "redux";
import {updateFloodCoordinates} from "../../store/actions";
import formatCitizenEventsData from "../../api/formatCitizenEventsData";
import avatarIcons from "../../public/images/icons/location-icon-atlas.svg";
import IconClusterLayer from "./iconClusterLayer";
import {locationColorKeys} from "../../data/colorMapping";
import uiText from "../../data/ui-text";
import LocationBox from "./locationBox";

// Map Configuration
const mapStyleSatellite = 'mapbox://styles/andyclarke/cl2svsl4j002f15o39tp0dy2q';

// Street Map Component
const FloodMap = ({ toggleLanguage, updateFloodData, updateFloodCoordinates, updateFloodCoordinatesDispatch, mapBoxToken, updateCarouselCoordinates, mapStylePlain, toggleDataType, updateAdditionalLocation, updatePrimaryLocation, toggleLocationPreference, updateCitizenEventsFloodZonesData, updateCitizenEventsRiverFloodData, toggleClusterStatus }) => {

    const [hoverInfo, setHoverInfo] = useState({});

    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback(() => {

        if (!mapLoaded) {

            const map = mapRef.current.getMap();
            const deck = deckRef.current.deck;

            map.addLayer(new MapboxLayer({ id: "dummy-layer", deck }));
            map.addLayer(new MapboxLayer({ id: "official-floodzones-geojson-layer", deck }), "admin-0-boundary-disputed");
            map.addLayer(new MapboxLayer({ id: "citizen-events-icon-cluster", deck }), "country-label");
            map.addLayer(new MapboxLayer({ id: "citizen-events-layer", deck }), "country-label");


        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);

    // Function to render Tooltip
    const renderTooltip = (info) => {
        const {object, x, y} = info;

        const wrapper = document.querySelector('#rainfall-map-wrapper')
        const wrapperWidth = wrapper ? wrapper.getBoundingClientRect().width : 1200;
        const wrapperHeight = wrapper ? wrapper.getBoundingClientRect().height : 600;

        let tooltipPositionSX = {
            top: y,
            width: `max-content`,
        };

        if (x > (wrapperWidth / 2)) {tooltipPositionSX['right'] = wrapperWidth - x - 25}
        else {tooltipPositionSX['left'] = x}

        if (object) {
            if (object.hasOwnProperty('cluster')) {
                // Set Y Position
                if (y > (wrapperHeight / 2)) {tooltipPositionSX['top'] = y - 100}
                else {tooltipPositionSX['top'] = y}
            } else {
                if (y > (wrapperHeight / 2)) {
                    tooltipPositionSX['top'] = y - 150
                }
                else {tooltipPositionSX['top'] = y}
            }
        }

        if (!object) {
            return null;
        }

        const colorIndex = updateCitizenEventsFloodZonesData.locations.findIndex(function(el){return el.id === toggleLocationPreference.locationID})

        const colorCode = colorIndex <= 0 ? '#2196F3' : locationColorKeys[colorIndex - 1].color

        return object.cluster ? (

            <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                <TooltipFlex>
                    <Box sx={{display: `flex`}}>
                        <TypeOrganisationBox>
                            <Typography sx={{fontSize: `17px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.multiple[toggleLanguage.language] + " " + uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language]}</Typography>
                            <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{object.point_count + " " + uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language] + " " + uiText.global.tooltips.nearby[toggleLanguage.language]}</Typography>
                        </TypeOrganisationBox>
                    </Box>
                </TooltipFlex>
            </MyTooltipBox>
        ) : !info.layer.id.includes('geojson') ? (
                <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                    <TooltipFlex>
                        <Box sx={{width: `100%`, justifyContent: `space-between`, alignItems: `center`, display: `flex`}}>
                            <TypeOrganisationBox>
                                <Typography sx={{fontWeight: `400`}} >{uiText.locationPage.rainfallMap.citizenReport[toggleLanguage.language].toUpperCase() + " "}</Typography>
                                <Typography sx={{fontSize: `11px`, color: (theme) => (theme.palette.primary.main)}}>{object.citizenType !== undefined ? object.citizenType.text : ""}</Typography>
                            </TypeOrganisationBox>
                            <Typography sx={{marginLeft: (theme) => (theme.spacing(4)), fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.floodEvent[toggleLanguage.language].toUpperCase()}<span className={"bluePunctuation"}>.</span></Typography>
                        </Box>
                    </TooltipFlex>
                    <Typography sx={{fontSize: `20px`, fontWeight: (theme) => (theme.typography.fontWeightLight), marginTop: (theme) => (theme.spacing(2))}}>{object.submissionText !== undefined ? "'" + object.submissionText + "'" : uiText.global.tooltips.noComment[toggleLanguage.language]}</Typography>
                    <TooltipFlex sx={{marginTop: (theme) => (theme.spacing(2))}}>
                        <Typography sx={{ color: `#888888`, fontSize: `14px`, fontWeight: (theme) => (theme.typography.fontWeightLight)}} >{object?.timestamp ? new Date(object.timestamp).toLocaleString().split(',')[0] : null}</Typography>
                        <LocationBox locationName={toggleLocationPreference.locationPreference} color={colorCode}/>
                    </TooltipFlex>
                </MyTooltipBox>
            ) : null;
    }

    const hideTooltip = () => {
        setHoverInfo({});
    }

    const expandTooltip = (info) => {
        if (info.picked) {
            setHoverInfo(info);
        } else {
            setHoverInfo({});
        }
    }


    const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference)

    // Find Preferred Location Flood Data
    const floodZonesData = updateFloodData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})
    const useFloodDataSettings = floodZonesData.length ? floodZonesData[0].floodData : []

    // Find Preferred Citizen FloodZones Data
    const citizenFloodZonesEventsData = updateCitizenEventsFloodZonesData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    // Find Preferred Citizen RiverFlood Data
    const citizenRiverFloodEventsData = updateCitizenEventsRiverFloodData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    const locationSettings = {
        initialLongitude: useFloodDataSettings.length ? updateFloodCoordinates.latitude : additionalLocationFilter.length ? additionalLocationFilter[0]['longitude'] - 0.07 : updatePrimaryLocation.location.longitude - 0.07,
        initialLatitude: useFloodDataSettings.length ? updateFloodCoordinates.longitude : additionalLocationFilter.length ? additionalLocationFilter[0]['latitude'] - 0.07: updatePrimaryLocation.location.latitude - 0.07,
        zoom: useFloodDataSettings.length ? 15 : 8,
        locationObject: additionalLocationFilter.length ? additionalLocationFilter[0] : updatePrimaryLocation.location,
        floodData: useFloodDataSettings.length ? floodZonesData[0].floodData : [],
        citizenFloodZonesEventsData: citizenFloodZonesEventsData.length ? citizenFloodZonesEventsData[0] : {},
        citizenRiverFloodEventsData: citizenRiverFloodEventsData.length ? citizenRiverFloodEventsData[0] : {}
    }

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
        /*onHover: d => setJSONTooltip(d)*/
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
        // onHover: d => setJSONTooltip(d)
    });

    // ICON LAYER CONFIGURATION - CITIZEN FLOOD EVENTS

    // Format and join citizen event arrays together - FloodZones - RiverFloods

    const joinedCitizenDataArray = [ ...formatCitizenEventsData(locationSettings.citizenFloodZonesEventsData, 'citizenFloodZonesEvents'), ...formatCitizenEventsData(locationSettings.citizenRiverFloodEventsData, 'citizenRiverFloodEvents')]

    const layerPropsCitizenEvents = {
        data: joinedCitizenDataArray,
        pickable: true,
        getPosition: (d) => d.coordinates,
        iconAtlas: avatarIcons.src,
        iconMapping: CITIZEN_EVENTS_ICON_MAPPING,
        onHover: !hoverInfo.objects && setHoverInfo,
        getIcon: (d) => d.citizenType,
        sizeScale: 10,
        getSize: (d) => 12,
    };

    const citizenEventsLayer = toggleClusterStatus.cluster ?
        new IconClusterLayer({...layerPropsCitizenEvents, id: 'citizen-events-icon-cluster', sizeScale: 50}) :
        new IconLayer({
            ...layerPropsCitizenEvents,
            id: "citizen-events-layer",
            getIcon: (d) => 'marker',
            sizeScale: 6,
            getPosition: (d) => d.coordinates,
            getSize: (d) => 9,
        });

    const INITIAL_VIEW_STATE = {
        longitude: locationSettings.initialLongitude,
        latitude: locationSettings.initialLatitude,
        zoom: locationSettings.zoom,
        minZoom: 1,
        maxZoom: 50,
        pitch: 25,
        bearing: 0
    };

    let layerMapping = {
        "Combined": [geoJsonLayerCitizen, geoJsonLayerOfficial, citizenEventsLayer],
        "Official": [geoJsonLayerOfficial],
        "Citizen": [geoJsonLayerCitizen, citizenEventsLayer]
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
            width={'100%'}
            onViewStateChange={hideTooltip}
            onHover={expandTooltip}
            onClick={expandTooltip}
        >

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

            {renderTooltip(hoverInfo)}

        </DeckGL>
    );

}

const MyTooltipBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    maxWidth: `400px`,
    padding: theme.spacing(2),
    boxShadow: `0px 0px 15px #E5E5E5`,
    border: `1.5px solid #E5E5E5`,
}))

const TooltipFlex = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxWidth: `350px`,
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