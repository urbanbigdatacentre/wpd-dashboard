// Rainfall Map Component - Uses Deck GL Icon Layers to render Component

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import {useCallback, useRef} from "react";
import DeckGL from "@deck.gl/react";
import React, {useEffect, useState} from "react";
import {IconLayer} from '@deck.gl/layers';
import IconClusterLayer from "./iconClusterLayer";
import {MapView} from '@deck.gl/core';
import * as d3 from "d3";
import {MapboxLayer} from "@deck.gl/mapbox";

// Local Imports
import avatarIcons from '../../public/images/icons/location-icon-atlas.svg';
import citizenPluviometerIcons from '../../public/images/icons/citizen-pluviometer-icon-atlas.png'
import {styled, Box, Typography} from "@mui/material";
import locationPaths from "../../data/locationPaths";
import scaleColorKeys from "../../data/rainfallScaleColorMapping";
import LOCATION_ICON_MAPPING from "../../data/location-icon-mapping";
import CITIZEN_EVENTS_ICON_MAPPING from "../../data/citizenRainfallEventsIconMapping";
import uiText from "../../data/ui-text";
import LoadingSkeleton from "./loadingSkeleton";
import TooltipChart from "./tooltipChart";
import LocationBox from "./locationBox";
import {locationColorKeys} from "../../data/colorMapping";
import formatCitizenEventsData from "../../api/formatCitizenEventsData";
import {filterCitizenEventDataByDate, filterPluviometerData} from "../../api/dataFilteringFunctions";


// ==================
// Map Configuration
// ==================
const MAP_VIEW = new MapView({repeat: true});

const mapStyleMono = 'mapbox://styles/andyclarke/cl4cjxdbg000615pf5n0s2wtv';

// ==================
// End of Map Configuration
// ==================


// Street Map Component
const RainfallMap = ({ toggleLanguage, toggleDate, toggleDataType, mapBoxToken, updateAdditionalLocation, updateCarouselCoordinates, mapStylePlain, updatePrimaryLocation, toggleLocationPreference, toggleClusterStatus, updatePluviometerData, updateCitizenEventsRainfallData }) => {

    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback(() => {

        if (!mapLoaded) {

            const map = mapRef.current.getMap();
            const deck = deckRef.current.deck;

            // console.log(map.getStyle().layers)

            map.addLayer(new MapboxLayer({ id: "dummy-layer", deck }));
            map.addLayer(new MapboxLayer({ id: "citizen-rainfall-events-layer", deck }, "country-label"));
            map.addLayer(new MapboxLayer({ id: "citizen-rainfall-events-icon-cluster", deck }, "country-label"));
            map.addLayer(new MapboxLayer({ id: "pluviometer-icon-cluster", deck }));
            map.addLayer(new MapboxLayer({ id: "citizen-pluviometer-layer", deck }, "country-label"));

        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);


    // Tooltip Storage
    const [hoverInfo, setHoverInfo] = useState({});

    // Define Location Object & Settings - Primary vs Additional
    const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference)

    // Find Preferred Location Pluviometer Data
    const pluviometerData = updatePluviometerData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    // Find Preferred Location Citizen Rainfall Events Data
    const citizenRainfallEventsData = updateCitizenEventsRainfallData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})


    const locationSettings = {
        initialLongitude: additionalLocationFilter.length ? additionalLocationFilter[0]['longitude'] - 0.07 : updatePrimaryLocation.location.longitude - 0.07,
        initialLatitude: additionalLocationFilter.length ? additionalLocationFilter[0]['latitude'] - 0.07: updatePrimaryLocation.location.latitude - 0.07,
        zoom: additionalLocationFilter.length ?  locationPaths[additionalLocationFilter[0]['placetype']].zoom : locationPaths[updatePrimaryLocation.location['placetype']].zoom,
        locationObject: additionalLocationFilter.length ? additionalLocationFilter[0] : updatePrimaryLocation.location,
        pluviometerData: filterPluviometerData(pluviometerData, toggleDate),
        citizenEventsData: filterCitizenEventDataByDate(citizenRainfallEventsData, 'citizenRainfallEvents', toggleDate)
    }



    // SET MAX VALUE
    let binArray = []

    // Set Max Value and Filter Out Data Outside of Date Range
    locationSettings.pluviometerData.hasOwnProperty('pluviometerData') ? locationSettings.pluviometerData['pluviometerData'].forEach(function(item) {
        // Set Avg Value
        let avgValue = item['records'].map(e => e.value).reduce((acc,v,i,a)=>(acc+v/a.length),0);
        // Push Value to Bins Array
        binArray.push(avgValue)
    })
        : null;

    // Set Scale Category - how much rainfall in area considering max value

    const linearScale = d3.scaleLinear()
        .domain([Math.min(... binArray), Math.max( ... binArray)])
        .range([0,4])

    const colorArray = scaleColorKeys.map(a => a.color);

    // Function to render Tooltip
    const renderTooltip = (info) => {
        const {object, x, y} = info;

        const wrapper = document.querySelector('#rainfall-map-wrapper')
        const wrapperWidth = wrapper ? wrapper.getBoundingClientRect().width : 1200;
        const wrapperHeight = wrapper ? wrapper.getBoundingClientRect().height : 600;

        let tooltipPositionSX = {
            top: y,
            width: `max-content`,
            zIndex: 1000000000,
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
                    info.layer.id.includes('pluviometer') ? tooltipPositionSX['top'] = y - 350 : tooltipPositionSX['top'] = y - 150
                }
                else {tooltipPositionSX['top'] = y}
            }
        }

        if (!object) {
            return null;
        }

        const colorIndex = updateCitizenEventsRainfallData.locations.findIndex(function(el){return el.id === toggleLocationPreference.locationID})

        const colorCode = colorIndex <= 0 ? '#2196F3' : locationColorKeys[colorIndex - 1].color

        return object.cluster ? (

                <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                    <TooltipFlex>
                        <Box sx={{display: `flex`}}>
                            <TypeOrganisationBox>
                                {"citizen-rainfall-events-icon-cluster" !== info.layer.id ?<Typography sx={{fontSize: `20px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.multiple[toggleLanguage.language] + " " + uiText.global.tooltips.citizenPluviometers[toggleLanguage.language]}</Typography> : <Typography sx={{fontSize: `18px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.multiple[toggleLanguage.language] + " " + uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language]}</Typography>}
                                {"citizen-rainfall-events-icon-cluster" !== info.layer.id ? <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{object.point_count + " " + uiText.global.tooltips.citizenPluviometers[toggleLanguage.language] + " " + uiText.global.tooltips.nearby[toggleLanguage.language]}</Typography> : <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{object.point_count + " " + uiText.locationPage.rainfallMap.citizenSubmittedRainEvent[toggleLanguage.language] + " " + uiText.global.tooltips.nearby[toggleLanguage.language]}</Typography>}
                            </TypeOrganisationBox>
                        </Box>
                    </TooltipFlex>
                </MyTooltipBox>
        ) : info.layer.id.includes('pluviometer') ?
        (
            <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                    <TooltipFlex>
                        <Box sx={{display: `flex`, marginRight: (theme) => (theme.spacing(2))}}>
                            <TypeOrganisationBox>
                                <Typography sx={{fontSize: `14px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}} >{object.citizenType.toUpperCase() + " " + object.type.toUpperCase()}<span className={"bluePunctuation"}>.</span></Typography>
                                <Typography sx={{fontSize: `11px`, color: (theme) => (theme.palette.primary.main)}}>{object.info}</Typography>
                            </TypeOrganisationBox>
                        </Box>
                    </TooltipFlex>
                    <TooltipChart data={object}/>
                    <TooltipFlex>
                        <Typography sx={{marginTop: (theme) => (theme.spacing(2)), color: `#888888`, fontSize: `12px`, fontWeight: (theme) => (theme.typography.fontWeightLight)}} >{new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)).toLocaleString().split(',')[0] + " - " + new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)).toLocaleString().split(',')[0]}</Typography>
                    </TooltipFlex>
            </MyTooltipBox>
        ) : (
            <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                <TooltipFlex>
                    <Box sx={{width: `100%`, justifyContent: `space-between`, alignItems: `center`, display: `flex`}}>
                        <TypeOrganisationBox>
                            <Typography sx={{fontWeight: `400`}} >{uiText.locationPage.rainfallMap.citizenReport[toggleLanguage.language].toUpperCase() + " "}</Typography>
                            <Typography sx={{fontSize: `11px`, color: (theme) => (theme.palette.primary.main)}}>{object.citizenType !== undefined ? object.citizenType.text : ""}</Typography>
                        </TypeOrganisationBox>
                        <Typography sx={{marginLeft: (theme) => (theme.spacing(4)), fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.rainEvent[toggleLanguage.language].toUpperCase()}<span className={"bluePunctuation"}>.</span></Typography>
                    </Box>
                </TooltipFlex>
                <Typography sx={{fontSize: `20px`, fontWeight: (theme) => (theme.typography.fontWeightLight), marginTop: (theme) => (theme.spacing(2))}}>{"'" + object.submissionText + "'"}</Typography>
                <TooltipFlex sx={{marginTop: (theme) => (theme.spacing(2))}}>
                    <Typography sx={{ color: `#888888`, fontSize: `14px`, fontWeight: (theme) => (theme.typography.fontWeightLight)}} >{object?.timestamp ? new Date(object.timestamp).toLocaleString().split(',')[0] : null}</Typography>
                    <LocationBox locationName={toggleLocationPreference.locationPreference} color={colorCode}/>
                </TooltipFlex>
            </MyTooltipBox>
            );
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

    // DETERMINE AVG VALUE FOR EACH TIME
    const formatPluviometerData = (locationObj) => {

        const mapData = [];

        if (locationObj.hasOwnProperty('pluviometerData')) {

            typeof(locationObj['pluviometerData']) !== 'undefined' ? locationObj['pluviometerData'].forEach(function(item) {

                let avgValue = item['records'].map(e => e.value).reduce((acc,v,i,a)=>(acc+v/a.length),0);

                let formattedItem = {
                    coordinates: [item.longitude, item.latitude],
                    type: uiText.global.tooltips.measurement[toggleLanguage.language],
                    citizenType: uiText.global.labels.submissionTypes[item['submissiontype']][toggleLanguage.language],
                    info: item['institutioninfo'],
                    // Need to filter records by date here **
                    records: item['records'],
                    // Need to calculate scale category here **
                    color: colorArray[Math.round(linearScale(avgValue))],
                }
                mapData.push(formattedItem)

            }) : null;
        }

        return mapData;
    }

    // CITIZEN PLUVIOMETER RECORDS LAYER
    const citizenPluviometerMapConfig = {
        data: formatPluviometerData(locationSettings.pluviometerData),
        iconMapping: LOCATION_ICON_MAPPING,
        iconAtlas: citizenPluviometerIcons.src,
        showCluster: toggleClusterStatus.cluster
    }

    const layerProps = {
        data: citizenPluviometerMapConfig.data,
        pickable: true,
        getPosition: (d) => d.coordinates,
        iconAtlas: citizenPluviometerMapConfig.iconAtlas,
        iconMapping: citizenPluviometerMapConfig.iconMapping,
        onHover: !hoverInfo.objects && setHoverInfo
    };

    const citizenPluviometerLayer = citizenPluviometerMapConfig.showCluster ?
        new IconClusterLayer({...layerProps, id: 'pluviometer-icon-cluster', sizeScale: 45}) :
        new IconLayer({
        ...layerProps,
        id: "citizen-pluviometer-layer",
        getIcon: d => 'marker',
        sizeScale: 30,
        getColor: d => d.color,
        getSize: (d) => 1,
    });

    // CITIZEN RAINFALL EVENTS LAYER

    const layerPropsCitizenRainfallEvents = {
        data: formatCitizenEventsData(locationSettings.citizenEventsData, 'citizenRainfallEvents'),
        pickable: true,
        getPosition: (d) => d.coordinates,
        iconAtlas: avatarIcons.src,
        iconMapping: CITIZEN_EVENTS_ICON_MAPPING,
        onHover: !hoverInfo.objects && setHoverInfo
    };

    const rainfallEventsLayer = citizenPluviometerMapConfig.showCluster ?
        new IconClusterLayer({...layerPropsCitizenRainfallEvents, id: 'citizen-rainfall-events-icon-cluster', sizeScale: 50}) :
        new IconLayer({
            ...layerPropsCitizenRainfallEvents,
            id: "citizen-rainfall-events-layer",
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
        pitch: 0,
        bearing: 0
    };

    let layerMapping = {
        "Combined": [rainfallEventsLayer, citizenPluviometerLayer],
        "Official": [],
        "Citizen": [rainfallEventsLayer, citizenPluviometerLayer]
    }

    return (

        <DeckGL
            ref={deckRef}
            layers={layerMapping[toggleDataType.dataType]}
            controller={!mapStylePlain}
            preventStyleDiffing={true}
            initialViewState={INITIAL_VIEW_STATE}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
            height={'100%'}
            width={'100%'}
            onViewStateChange={hideTooltip}
            onHover={expandTooltip}
            onClick={expandTooltip}
            >
            <LoadingSkeleton area="pluviometer-data" text={uiText.global.labels.rainfallMapLoadingText[toggleLanguage.language]}/>
            <LoadingSkeleton area="RAIN_FORM" text={uiText.global.labels.rainfallMapLoadingText[toggleLanguage.language]}/>
            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    ref={mapRef}
                    gl={glContext}
                    views={MAP_VIEW}
                    mapStyle={mapStyleMono}
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
    zIndex: 4001,

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

export default connect((state) => state)(RainfallMap)
