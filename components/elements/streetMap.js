// Street Map Component for Citizen Generated Maps

// Package Imports

// Local Imports

import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React from "react";


// Map Configuration
const mapStyleMapBox1 = 'mapbox://styles/mapbox/streets-v11';
const mapStyleMapBox2 = 'mapbox://styles/andyclarke/cl1z4iue1002w14qdnfkb3gjj'
const mapStyleCarto = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const INITIAL_VIEW_STATE = {
    longitude: -46.6827524,
    latitude: -23.5588321,
    zoom: 12.0,
    minZoom: 2,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

// Street Map Component
const StreetMap = ({ toggleLanguage, mapBoxToken }) => {
    return (
        <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE} height={'100%'} width={'100%'}>

            <StaticMap
                reuseMaps
                mapStyle={mapStyleMapBox1}
                mapboxAccessToken={mapBoxToken}
            />

        </DeckGL>
    );
}

export default connect((state) => state)(StreetMap)