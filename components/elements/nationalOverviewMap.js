// Component to Render National Overview Map using Deck.GL

// Package Imports
import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import {connect} from "react-redux";
import React, {useRef, useEffect, useState, useCallback} from "react";

// Map Config Imports
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {MapboxLayer} from '@deck.gl/mapbox';



// Local Imports


// Map Config

const mapStyleMapBox1 = 'mapbox://styles/mapbox/streets-v11';
const mapStyleMapBox2 = 'mapbox://styles/andyclarke/cl1z4iue1002w14qdnfkb3gjj'
const mapStyleCarto = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const DATA_URL = 'https://gist.githubusercontent.com/andyclarkemedia/9f39ef2390f358967d5ee74db56733dc/raw/82828b5355a6d7aca27d7b02eb6c75ed2c6d3272/random-brazil-coordinates.csv'

const upperPercentile = 100;
const coverage = 0.7;

export const colorRange = [
    [21, 101, 192],
    [33, 150, 243],
    [0, 209, 225],
    [255, 186, 8],
    [255, 140, 66],
    [218, 65, 103]
];

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1,
});

const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: .3,
    position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: .9,
    position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const material = {
    ambient: 1,
    diffuse: 0.1,
    shininess: 20,
    specularColor: [13, 51, 343]
};

const INITIAL_VIEW_STATE = {
    longitude: -53.2,
    latitude: -10.3,
    zoom: 4.0,
    minZoom: 2,
    maxZoom: 10,
    pitch: 40.5,
    bearing: -27
};

function getTooltip({object}) {
    if (!object) {
        return null;
    }
    const lat = object.position[1];
    const lng = object.position[0];
    const count = object.points.length;

    return `\
    Latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
    Longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
    ${count} Flood Reports`;
}


const NationalOverviewMap = ({ mapBoxToken, changeRadiusWithSlider }) => {

    const [data, setData] = useState([]);


    useEffect(() => {
        require('d3-request').csv(DATA_URL, (error, response) => {
            if (!error) {
                const payload = response.map(d => [Number(d.lng), Number(d.lat)]);
                setData(payload);
            }
        });
    }, [data.length])


    const layers = [
        new HexagonLayer({
            id: 'national-overview-map',
            colorRange,
            coverage,
            data: data,
            elevationRange: [0, 2000],
            elevationScale: data && data.length ? 50 : 0,
            extruded: true,
            getPosition: d => d,
            radius: changeRadiusWithSlider.hexRadius,
            upperPercentile,
            material,
        })
    ];

    return (
        <DeckGL getTooltip={getTooltip} layers={layers} controller={true} initialViewState={INITIAL_VIEW_STATE} height={'100%'} width={'100%'}>

            <StaticMap
                reuseMaps
                mapStyle={mapStyleMapBox2}
                mapboxAccessToken={mapBoxToken}
            />

        </DeckGL>
    );
}


export default connect((state) => state)(NationalOverviewMap)