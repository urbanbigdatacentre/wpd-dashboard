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
const mapStyleBrazilOnly = 'mapbox://styles/andyclarke/cl32tkwur000p14qjkf29169z';
const DATA_URL = 'https://gist.githubusercontent.com/andyclarkemedia/a4a7865e33ea133e1a9a73d79f314cf5/raw/1c51e5225dc2b4159c50b5ba272be628bf401660/wpd-overview-dummy-data.csv'

export const colorRange = [
    [21, 101, 192],
    [33, 150, 243],
    [0, 209, 225],
    [255, 186, 8],
    [255, 140, 66],
    [218, 65, 103]
];

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

            map.addLayer(new MapboxLayer({ id: "dummy-layer", deck }));
            map.addLayer(new MapboxLayer({ id: "national-overview-map", deck }), firstSymbolId);


        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);

    const customLayers = [
        new HexagonLayer({
            id: 'national-overview-map',
            colorRange,
            coverage: 0.75,
            data: data,
            elevationRange: [0, 75000],
            elevationScale: data && data.length ? 50 : 0,
            extruded: true,
            getPosition: d => d,
            radius: changeRadiusWithSlider.hexRadius,
            upperPercentile: 98,
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
            layers={customLayers}
            controller={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'}
            width={'100%'}>

            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
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