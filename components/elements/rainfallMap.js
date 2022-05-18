// Rainfall Map Component - Uses Deck GL Icon Layers to render Component

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import axios from "axios";
import DeckGL from "@deck.gl/react";
import React, {useEffect, useState} from "react";
import {IconLayer} from '@deck.gl/layers';
import IconClusterLayer from "./iconClusterLayer";
import {MapView} from '@deck.gl/core';

// Local Imports
import avatarIcons from '../../public/images/icons/location-icon-atlas.svg';
import citizenPluviometerIcons from '../../public/images/icons/citizen-pluviometer-icon-atlas.png'
import {styled, Box, Typography} from "@mui/material";
import locationPaths from "../../data/locationPaths";
import scaleColorKeys from "../../data/rainfallScaleColorMapping";
import LOCATION_ICON_MAPPING from "../../data/location-icon-mapping";
import uiText from "../../data/ui-text";
import config from "../../api/config";
import LoadingSkeleton from "./loadingSkeleton";


// ==================
// Map Configuration
// ==================
const MAP_VIEW = new MapView({repeat: true});

const mapStyleMono = 'mapbox://styles/andyclarke/cl2svmbha002u15pi3k6bqxjn';

const AVATAR_ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};


// ==================
// End of Map Configuration
// ==================


// Street Map Component
const RainfallMap = ({ toggleLanguage, toggleDate, mapBoxToken, updateAdditionalLocation, updateCarouselCoordinates, mapStylePlain, updatePrimaryLocation, toggleLocationPreference, configureAPI, updatePluviometerData }) => {

    // Tooltip Storage
    const [hoverInfo, setHoverInfo] = useState({});

    // Define Location Object & Settings - Primary vs Additional
    const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference)

    // Find Preferred Location Pluviometer Data
    const pluviometerData = updatePluviometerData.locations.filter(function(el){return el.id === toggleLocationPreference.locationID})

    const locationSettings = {
        initialLongitude: additionalLocationFilter.length ? additionalLocationFilter[0]['longitude'] - 0.07 : updatePrimaryLocation.location.longitude - 0.07,
        initialLatitude: additionalLocationFilter.length ? additionalLocationFilter[0]['latitude'] - 0.07: updatePrimaryLocation.location.latitude - 0.07,
        zoom: additionalLocationFilter.length ?  locationPaths[additionalLocationFilter[0]['placetype']].zoom : locationPaths[updatePrimaryLocation.location['placetype']].zoom,
        locationObject: additionalLocationFilter.length ? additionalLocationFilter[0] : updatePrimaryLocation.location,
        pluviometerData: pluviometerData.length ? pluviometerData[0] : {}
    }

    // Function to render Tooltip
    const renderTooltip = (info) => {
        const {object, x, y} = info;

        const wrapper = document.querySelector('#rainfall-map-wrapper')
        const wrapperWidth = wrapper ? wrapper.getBoundingClientRect().width : 1200;

        let tooltipPositionSX;

        if (x > (wrapperWidth / 2)) {
            tooltipPositionSX= {
                right: wrapperWidth - x - 25,
                width: `max-content`,
                top: y
            }
        } else {
            tooltipPositionSX= {
                left: x,
                top: y,
                width: `max-content`,
            }
        }

        if (info.objects) {
            return (
                <div className="tooltip interactive" style={{left: x, top: y}}>
                    {info.objects.map(({name}) => {
                        return (
                            <div key={name}>
                                <h5>{name}</h5>

                            </div>
                        );
                    })}
                </div>
            );
        }

        if (!object) {
            return null;
        }

        return object.cluster ? (

                <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                    <TooltipFlex>
                        <Box sx={{display: `flex`}}>
                            <TypeOrganisationBox>
                                <Typography sx={{fontSize: `20px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}} >{uiText.global.tooltips.multiple[toggleLanguage.language] + " " + uiText.global.tooltips.citizenPluviometers[toggleLanguage.language]}</Typography>
                                <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{object.point_count + " " + uiText.global.tooltips.citizenPluviometers[toggleLanguage.language] + " " + uiText.global.tooltips.nearby[toggleLanguage.language]}</Typography>
                            </TypeOrganisationBox>
                        </Box>
                    </TooltipFlex>
                </MyTooltipBox>
        ) : (
            <MyTooltipBox className="tooltip" sx={tooltipPositionSX}>
                    <TooltipFlex>
                        <Box sx={{display: `flex`, marginRight: (theme) => (theme.spacing(2))}}>
                            <TypeOrganisationBox>
                                <Typography sx={{fontSize: `20px`}} >{object.citizenType}</Typography>
                                <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{object.info}</Typography>
                            </TypeOrganisationBox>
                        </Box>
                        <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{object.type.toUpperCase()}<span className={"bluePunctuation"}>.</span></Typography>
                    </TooltipFlex>
                    <Typography sx={{fontSize: `20px`, textAlign: `left`, marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} >{"CHART AREA"}</Typography>
                    <TooltipFlex>
                        <Typography sx={{color: `#888888`}} >{"Date Area"}</Typography>
                    </TooltipFlex>
            </MyTooltipBox>
        );
    }

    const hideTooltip = () => {
        setHoverInfo({});
    }

    const expandTooltip = (info) => {
        if (info.picked && citizenPluviometerMapConfig.showCluster) {
            setHoverInfo(info);
        } else {
            setHoverInfo({});
        }
    }

    const formatPluviometerData = (locationObj) => {

        const mapData = [];

        if (locationObj.hasOwnProperty('pluviometerData')) {

            typeof(locationObj['pluviometerData']) !== 'undefined' ? locationObj['pluviometerData'].forEach(function(item) {

                let formattedItem = {
                    coordinates: [item.longitude, item.latitude],
                    type: uiText.global.tooltips.measurement[toggleLanguage.language],
                    citizenType: uiText.global.labels.submissionTypes[item['submissiontype']][toggleLanguage.language],
                    info: item['institutioninfo'],
                    records: item['records'],
                    scaleCategory: 1,
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
        showCluster: true
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
        new IconClusterLayer({...layerProps, id: 'icon-cluster', sizeScale: 40}) :
        new IconLayer({
        ...layerProps,
        id: "citizen-pluviometer-layer" + new Date().getTime(),
        getIcon: d => 'marker',
        sizeScale: 10,
        getSize: (d) => 4,
        getColor: (d) => scaleColorKeys[d['scaleCategory']].color,
    });


    // CITIZEN RAINFALL EVENTS LAYER
    const rainfallEventsLayer = new IconLayer({
        id: "rainfall-events-layer" + new Date().getTime(),
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
        iconAtlas: avatarIcons.src,
        getIcon: (d) => d.citizenType,
        iconMapping: AVATAR_ICON_MAPPING,
        sizeScale: 10,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 12,
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


    const layers = mapStylePlain ? null : [rainfallEventsLayer, citizenPluviometerLayer]

    return (

        <DeckGL
            layers={[layers]}
            controller={!mapStylePlain}
            preventStyleDiffing={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'}
            width={'100%'}
            onViewStateChange={hideTooltip}
            onClick={expandTooltip}
            >
            <LoadingSkeleton area="pluviometer-data"/>
            <StaticMap
                reuseMaps
                views={MAP_VIEW}
                mapStyle={mapStyleMono}
                mapboxAccessToken={mapBoxToken}
            />

            {renderTooltip(hoverInfo)}

        </DeckGL>
    );
}

const MyTooltipBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
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

export default connect((state) => state)(RainfallMap)
