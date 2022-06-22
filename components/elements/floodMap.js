// Flood Map Component - Uses Deck GL Icon Layers to render Component

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import {WebMercatorViewport} from '@deck.gl/core';
import DeckGL from "@deck.gl/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {IconLayer, GeoJsonLayer} from '@deck.gl/layers';
import RefreshIcon from '@mui/icons-material/Refresh';

// Local Imports
import {styled, Box, Typography, Button, ToggleButtonGroup, ToggleButton} from "@mui/material";
import CITIZEN_EVENTS_ICON_MAPPING from "../../data/citizenRainfallEventsIconMapping";
import {MapboxLayer} from "@deck.gl/mapbox";
import {bindActionCreators} from "redux";
import {removeFloodZonesData, updateFloodCoordinates, updateFloodZonesData} from "../../store/actions";
import formatCitizenEventsData from "../../api/formatCitizenEventsData";
import avatarIcons from "../../public/images/icons/location-icon-atlas.png";
import IconClusterLayer from "./iconClusterLayer";
import {locationColorKeys} from "../../data/colorMapping";
import uiText from "../../data/ui-text";
import LocationBox from "./locationBox";
import {filterCitizenEventDataByDate} from "../../api/dataFilteringFunctions";
import requestFloodZonesBBOXData from "../../api/requestFloodZonesBBOXData";
import FloodMapLegend from "./floodMapLegend";
import latLngToBounds from "../../data/getBoundingBox";
import {usePromiseTracker} from "react-promise-tracker";
import CircularProgress from "@mui/material/CircularProgress";

// Map Configuration
const mapStyleSatellite = 'mapbox://styles/andyclarke/cl2svsl4j002f15o39tp0dy2q';
const mapStyleMono = 'mapbox://styles/andyclarke/cl4nznypi004i14s7qd086rbc';

// Street Map Component
const FloodMap = ({ toggleLanguage, configureAPI, toggleDate, updateFloodData, updateFloodCoordinates, updateFloodCoordinatesDispatch, mapBoxToken, updateCarouselCoordinates, mapStylePlain, toggleDataType, updateAdditionalLocation, updatePrimaryLocation, toggleLocationPreference, updateCitizenEventsFloodZonesData, updateCitizenEventsRiverFloodData, toggleClusterStatus, updateFloodDataDispatch, removeFloodDataDispatch }) => {

    const [hoverInfo, setHoverInfo] = useState({});

    const { promiseInProgress } = usePromiseTracker({area: 'floodzones-data', delay: 0});

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

            // Set Reload Coordinates
            updateFloodCoordinatesDispatch({latitude: updatePrimaryLocation.location.longitude, longitude: updatePrimaryLocation.location.latitude, zoom: 8})

            const bounds = latLngToBounds(updatePrimaryLocation.location.latitude, updatePrimaryLocation.location.longitude, 8, 1000, 600)
            // Request new floodzones data
            requestFloodZonesBBOXData(bounds.join(','), configureAPI, updateFloodData, updateFloodDataDispatch, toggleLocationPreference, removeFloodDataDispatch);

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
                            <EventType sx={{fontSize: `17px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.multiple[toggleLanguage.language] + " " + uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language]}</EventType>
                            <EventNumberText sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{object.point_count + " " + uiText.locationPage.floodMap.floodEventTitle[toggleLanguage.language] + " " + uiText.global.tooltips.nearby[toggleLanguage.language]}</EventNumberText>
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
        initialLongitude: (updateFloodCoordinates.latitude !== null) ? updateFloodCoordinates.latitude : additionalLocationFilter.length ? additionalLocationFilter[0]['longitude'] - 0.07 : updatePrimaryLocation.location.longitude - 0.07,
        initialLatitude: (updateFloodCoordinates.longitude !== null) ? updateFloodCoordinates.longitude : additionalLocationFilter.length ? additionalLocationFilter[0]['latitude'] - 0.07: updatePrimaryLocation.location.latitude - 0.07,
        zoom: 8,
        locationObject: additionalLocationFilter.length ? additionalLocationFilter[0] : updatePrimaryLocation.location,
        floodData: useFloodDataSettings.length ? floodZonesData[0].floodData : [],
        citizenFloodZonesEventsData: filterCitizenEventDataByDate(citizenFloodZonesEventsData, 'citizenFloodZonesEvents', toggleDate),
        citizenRiverFloodEventsData: filterCitizenEventDataByDate(citizenRiverFloodEventsData, 'citizenRiverFloodEvents', toggleDate),
    }

    const fillMapping = {
        "Baixa": [247, 119, 111, 200],
        "Média": [218, 65, 103, 200],
        "Alta": [92, 47, 96, 200],
    }

    const geoJsonLayerOfficial = new GeoJsonLayer({
        id: 'official-floodzones-geojson-layer',
        data: locationSettings.floodData,
        visible: (toggleDataType.dataType === "Combined") || (toggleDataType.dataType === "Official"),
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

    // ICON LAYER CONFIGURATION - CITIZEN FLOOD EVENTS

    // Format and join citizen event arrays together - FloodZones - RiverFloods

    const joinedCitizenDataArray = [ ...formatCitizenEventsData(locationSettings.citizenFloodZonesEventsData, 'citizenFloodZonesEvents'), ...formatCitizenEventsData(locationSettings.citizenRiverFloodEventsData, 'citizenRiverFloodEvents')]

    const layerPropsCitizenEvents = {
        data: joinedCitizenDataArray,
        pickable: true,
        visible: (toggleDataType.dataType === "Combined") || (toggleDataType.dataType === "Citizen"),
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


    const [viewState, setViewState] = useState({})

    const onViewStateChange = useCallback(({viewState}) => {

        const viewport = new WebMercatorViewport(viewState);
        setViewState(viewport)

        // Hide Tooltip
        hideTooltip();
    }, []);

    const handleRefresh = () => {

        const nw = viewState.unproject([0, 0]);
        const se = viewState.unproject([viewState.width, viewState.height]);

        // Set Reload Coordinates
        // updateFloodCoordinatesDispatch({latitude: viewState.longitude, longitude: viewState.latitude, zoom: viewState.zoom})

        // Request new floodzones data
        requestFloodZonesBBOXData([...nw, ...se].join(','), configureAPI, updateFloodData, updateFloodDataDispatch, toggleLocationPreference, removeFloodDataDispatch);
    }


    const INITIAL_VIEW_STATE = {
        longitude: locationSettings.initialLongitude,
        latitude: locationSettings.initialLatitude,
        zoom: updateFloodCoordinates.zoom,
        minZoom: 1,
        maxZoom: 50,
        pitch: 25,
        bearing: 0
    };

    const controllerTrue = mapStylePlain ? Boolean(0) : Boolean(1)

    const [mapStyle, setMapStyle ] = useState(mapStyleSatellite);

    const handleMapStyleChange = (e) => {
        setMapStyle(e.target.value)
    }

    return (
        <>
        <FloodMapLegend mapBoxToken={mapBoxToken} mapStyleToggle={
            <MapStyleButtonGroup exclusive value={mapStyle} onChange={handleMapStyleChange}>
                <MapStyleButton value={mapStyleMono}>{uiText.locationPage.floodMap.monochrome[toggleLanguage.language]}</MapStyleButton>
                <MapStyleButton value={mapStyleSatellite}>{uiText.locationPage.floodMap.satellite[toggleLanguage.language]}</MapStyleButton>
            </MapStyleButtonGroup>
        } refreshButtonComponent={<ReloadButton variant={'outlined'} onClick={handleRefresh} endIcon={promiseInProgress ? <CircularProgress size={20} color={'primary'}/> : <RefreshIcon />}>Refresh Risk Zones</ReloadButton>}/>
        <DeckGL
            ref={deckRef}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
            layers={[geoJsonLayerOfficial, citizenEventsLayer]}
            controller={controllerTrue}
            preventStyleDiffing={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'}
            width={'100%'}
            onViewStateChange={onViewStateChange}
            onHover={expandTooltip}
            onClick={expandTooltip}
        >

            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    ref={mapRef}
                    gl={glContext}
                    mapStyle={mapStyle}
                    mapboxAccessToken={mapBoxToken}
                    onLoad={onMapLoad}
                />
            )}

            {renderTooltip(hoverInfo)}
        </DeckGL>
        </>
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
    zIndex: 10000000000000000000000000,
    [theme.breakpoints.down('md')]: {
        maxWidth: `300px`,
    },
}))

const ReloadButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,
    color: `#181818`,
    width: `100%`,
    marginTop: theme.spacing(2),
    zIndex: 100000,
    border: `1.5px solid #181818`,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
        border: `1.5px solid #2196F3`,
    },
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`,
        width: `max-content`
    },

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

const EventNumberText = styled(Typography)(({theme}) => ({
    fontSize: `14px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `10px`,
    },
}))

const EventType = styled(Typography)(({theme}) => ({
    fontSize: `16px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))


// CSS Styled Components
const MapStyleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    zIndex: 600,
    backgroundColor: theme.palette.primary.light,

}))

const MapStyleButton = styled(ToggleButton)(({theme}) => ({
    padding: `2.5px 5px 2.5px 5px`,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: `11px`,
    color: theme.palette.primary.black,
    backgroundColor: theme.palette.primary.light,
    margin: `0px 1px 0px 0px`,
    border: `1.5px solid #2196F3`,
    '&:last-of-type': {
        margin: `0px 0px 0px 0px`,
    },
    '&.Mui-selected': {
        border: `1.5px solid rgba(21, 101, 192, 0.5)`,
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
        '&:hover, &.Mui-focusVisible': {
            backgroundColor: theme.palette.primary.darkBlue,
            color: theme.palette.primary.light,
        },
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `10px`,
    },
}))


const mapDispatchToProps = (dispatch) => {
    return {
        updateFloodCoordinatesDispatch: bindActionCreators(updateFloodCoordinates, dispatch),
        updateFloodDataDispatch: bindActionCreators(updateFloodZonesData, dispatch),
        removeFloodDataDispatch: bindActionCreators(removeFloodZonesData, dispatch)
    }
}


export default connect((state) => state, mapDispatchToProps)(FloodMap)