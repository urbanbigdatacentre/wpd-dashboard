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
const mapStyleBrazilOnly = 'mapbox://styles/andyclarke/cl32tkwur000p14qjkf29169z';
const mapStyleCarto = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const DATA_URL = 'https://gist.githubusercontent.com/andyclarkemedia/a4a7865e33ea133e1a9a73d79f314cf5/raw/1c51e5225dc2b4159c50b5ba272be628bf401660/wpd-overview-dummy-data.csv'

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
    longitude: -47.2,
    latitude: -13.3,
    zoom: 4.0,
    minZoom: 3.5,
    maxZoom: 12,
    pitch: 25,
    bearing: 0
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

    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback(() => {

        if (!mapLoaded) {


            const map = mapRef.current.getMap();
            const deck = deckRef.current.deck;


            // map.addLayer(
            //     new MapboxLayer({ id: "national-overview-map", deck}, 'waterway-label')
            // );

            // MAP BOX CODE
            const layers = map.getStyle().layers;

            // Find the index of the first symbol layer in the map style.
            let firstSymbolId;
            for (const layer of layers) {
                if (layer.type === 'symbol') {
                    firstSymbolId = layer.id;
                    break;
                }
            }

            map.addSource('urban-areas', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_50m_urban_areas.geojson'
            });


            map.addLayer(new MapboxLayer({ id: "dummy-layer", deck }));
            map.addLayer(new MapboxLayer({ id: "national-overview-map", deck }), firstSymbolId);


        }
        setMapLoaded(true);

    }, [deckRef, mapRef]);

    const customLayers = [
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


    useEffect(() => {
        require('d3-request').csv(DATA_URL, (error, response) => {
            if (!error) {
                const payload = response.map(d => [Number(d.lng), Number(d.lat)]);
                setData(payload);
            }
        });
    }, [data.length])



    return (
        <DeckGL
            ref={deckRef}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
            getTooltip={getTooltip}
            layers={customLayers}
            controller={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'}
            width={'100%'}>

            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    reuseMaps
                    ref={mapRef}
                    gl={glContext}
                    mapStyle={mapStyleBrazilOnly}
                    mapboxAccessToken={mapBoxToken}
                    onLoad={onMapLoad}
                />
            )}

        </DeckGL>
    );
}



export default connect((state) => state)(NationalOverviewMap)