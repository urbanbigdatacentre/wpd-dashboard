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

// Map Configuration
const mapStyleMapBox1 = 'mapbox://styles/mapbox/streets-v11';
const mapStyleMapBox2 = 'mapbox://styles/andyclarke/cl1z4iue1002w14qdnfkb3gjj'
const mapStyleCarto = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};


// Street Map Component
const StreetMap = ({ toggleLanguage, mapBoxToken, updateCarouselCoordinates, mapStylePlain }) => {

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

    const INITIAL_VIEW_STATE = {
        longitude: updateCarouselCoordinates.longitude - 0.07,
        latitude: updateCarouselCoordinates.latitude,
        zoom: 12.0,
        minZoom: 2,
        maxZoom: 16,
        pitch: 0,
        bearing: 0
    };

    const layers = mapStylePlain ? null : [iconLayer]

    return (
        <DeckGL layers={[layers]} controller={true} preventStyleDiffing={true} initialViewState={INITIAL_VIEW_STATE} height={'100%'} width={'100%'} ContextProvider={_MapContext.Provider} >
            <StaticMap
                reuseMaps
                mapStyle={mapStyleMapBox1}
                mapboxAccessToken={mapBoxToken}
            />
        </DeckGL>
    );

}

export default connect((state) => state)(StreetMap)