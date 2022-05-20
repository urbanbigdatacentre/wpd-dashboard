// Street Map Component for Citizen Generated Maps

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import _MapContext from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React, {useEffect} from "react";
import {IconLayer} from '@deck.gl/layers';


// Local Imports
import mapIcons from '../../public/images/icons/location-icon-atlas.svg';
import locationPaths from "../../data/locationPaths";
import {toggleLocationPreference} from "../../store/reducers";

// Map Configuration
const mapStyleMapBoxStreets = "mapbox://styles/andyclarke/cl2su9yt2001t15mu6fasl9wp";
const mapStyleSatellite = 'mapbox://styles/andyclarke/cl2svsl4j002f15o39tp0dy2q';

const ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};


// Street Map Component
const StreetMap = ({ toggleLanguage, toggleLocationPreference, mapBoxToken, updateCarouselCoordinates, updateAdditionalLocation, mapStylePlain, updatePrimaryLocation }) => {

    const iconLayer = new IconLayer({
        id: "icon-layer",
        data: [
            {
                coordinates: [updateCarouselCoordinates.longitude, updateCarouselCoordinates.latitude]
            }
        ],
        pickable: true,
        iconAtlas: mapIcons.src,
        getIcon: (d) => updateCarouselCoordinates.citizenType,
        iconMapping: ICON_MAPPING,
        sizeScale: 10,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 12,

    });

    const additionalLocationFilter = mapStylePlain ? updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference): [];

    const actualLocation = additionalLocationFilter.length ? additionalLocationFilter[0] : updatePrimaryLocation.location

    const locationSettings = {
        initialLongitude: mapStylePlain ? updatePrimaryLocation.location.longitude - 0.17 : updateCarouselCoordinates.longitude - 0.17,
        initialLatitude: mapStylePlain ? updatePrimaryLocation.location.latitude - 0.07 : updateCarouselCoordinates.latitude - 0.07,
        // zoom: 12 mapStylePlain ?  locationPaths[additionalLocationFilter['placetype']].zoom : locationPaths[actualLocation.location['placetype']].zoom
        zoom: 10
    }

    const INITIAL_VIEW_STATE = {
        longitude: locationSettings.initialLongitude,
        latitude: locationSettings.initialLatitude,
        zoom: locationSettings.zoom,
        minZoom: 2,
        maxZoom: 16,
        pitch: 0,
        bearing: 0
    };

    const layers = mapStylePlain ? null : [iconLayer]
    const controllerTrue = mapStylePlain ? Boolean(0) : Boolean(1)

    return (
        <DeckGL layers={[layers]} controller={controllerTrue} preventStyleDiffing={true} initialViewState={INITIAL_VIEW_STATE} height={'100%'} width={'100%'} ContextProvider={_MapContext.Provider} >
            <StaticMap
                reuseMaps
                mapStyle={mapStylePlain ? mapStyleSatellite : mapStyleMapBoxStreets}
                mapboxAccessToken={mapBoxToken}
            />
        </DeckGL>
    );

}

export default connect((state) => state)(StreetMap)