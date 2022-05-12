// Rainfall Map Component - Uses Deck GL Icon Layers to render Component

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import _MapContext from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React, {useEffect, useState} from "react";
import {IconLayer} from '@deck.gl/layers';

// Local Imports
import avatarIcons from '../../public/images/icons/location-icon-atlas.svg';
import officialPluviometerIcons from '../../public/images/icons/citizen-pluviometer-icon-atlas.svg'
import {styled, Box, Typography} from "@mui/material";
import locationPaths from "../../data/locationPaths";
import scaleColorKeys from "../../data/rainfallScaleColorMapping";


// ==================
// Map Configuration
// ==================

const mapStyleMono = 'mapbox://styles/andyclarke/cl2svmbha002u15pi3k6bqxjn';

const AVATAR_ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};

const OFFICIAL_PLUVIOMETER_ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: true, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: true, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: true, anchorY: 128 },
};

// ==================
// End of Map Configuration
// ==================


// Street Map Component
const RainfallMap = ({ toggleLanguage, mapBoxToken, updateAdditionalLocation, updateCarouselCoordinates, mapStylePlain, updatePrimaryLocation, toggleLocationPreference }) => {

    const [tooltip, setTooltip] = useState({});

    // OFFICIAL PLUVIOMETER RECORDS LAYER
    const officialPluviometerLayer = new IconLayer({
        id: "official-pluviometer-layer",
        data: [
            {
                coordinates: [updateCarouselCoordinates.longitude, updateCarouselCoordinates.latitude],
                timestamp: "2022-04-09T13:32:30.745Z",
                type: "Rain Event",
                citizenType: "Student",
                citizenOrganisation: "School in São Paulo",
                submissionText: "It's a dry day here today!",
                scaleCategory: 3,
            }
        ],
        pickable: true,
        iconAtlas: officialPluviometerIcons.src,
        getPosition: (d) => d.coordinates,
        iconMapping: OFFICIAL_PLUVIOMETER_ICON_MAPPING,
        sizeScale: 10,
        getIcon: (d) => d.citizenType,
        getSize: (d) => 12,
        getColor: (d) => scaleColorKeys[d['scaleCategory']].color,
    })

    // CITIZEN RAINFALL EVENTS LAYER
    const rainfallEventsLayer = new IconLayer({
        id: "rainfall-events-layer",
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
        onHover: d => setTooltip(d)
    });

    const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference)

    const locationSettings = {
        initialLongitude: additionalLocationFilter.length ? additionalLocationFilter[0]['longitude'] - 0.07 : updatePrimaryLocation.location.longitude - 0.07,
        initialLatitude: additionalLocationFilter.length ? additionalLocationFilter[0]['latitude'] - 0.07: updatePrimaryLocation.location.latitude - 0.07,
        zoom: additionalLocationFilter.length ?  locationPaths[additionalLocationFilter[0]['placetype']].zoom : locationPaths[updatePrimaryLocation.location['placetype']].zoom
    }

    const INITIAL_VIEW_STATE = {
        longitude: locationSettings.initialLongitude,
        latitude: locationSettings.initialLatitude,
        zoom: locationSettings.zoom,
        minZoom: 1,
        maxZoom: 50,
        pitch: 0,
        bearing: 0
    };


    const layers = mapStylePlain ? null : [rainfallEventsLayer, officialPluviometerLayer]

    return (
        <DeckGL layers={[layers]} controller={!mapStylePlain} preventStyleDiffing={true} initialViewState={INITIAL_VIEW_STATE} height={'100%'} width={'100%'} ContextProvider={_MapContext.Provider} >
            <StaticMap
                reuseMaps
                mapStyle={mapStyleMono}
                mapboxAccessToken={mapBoxToken}
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

export default connect((state) => state)(RainfallMap)