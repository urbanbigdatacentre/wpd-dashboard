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
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import axios from "axios";
import config from "../../api/config";



// Local Imports


// Map Config
const mapStyleBrazilOnly = 'mapbox://styles/andyclarke/cl32tkwur000p14qjkf29169z';
const DATA_URL = 'https://gist.githubusercontent.com/andyclarkemedia/a4a7865e33ea133e1a9a73d79f314cf5/raw/1c51e5225dc2b4159c50b5ba272be628bf401660/wpd-overview-dummy-data.csv'

export const colorRange = [
    [247, 153, 111],
    [235, 90, 86],
    [218, 65, 103],
    [153, 60, 122],
    [92, 47, 96]
];

const material = {
    ambient: 1,
    diffuse: .2,
    shininess: 50,
    specularColor: [218, 65, 103]
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


const NationalOverviewMap = ({ configureAPI, mapBoxToken, changeRadiusWithSlider, toggleDate, changeOverviewMapView }) => {

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
            elevationRange: [0, 25000],
            elevationScale: 25,
            extruded: true,
            getPosition: d => d,
            radius: changeRadiusWithSlider.hexRadius,
            upperPercentile: 98,
            material,
        })
    ];


    const OVERVIEW_URL_PATHS = {
        "Citizen Reports": `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/citizenreportsoverview?startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`,
        // NEED TO UPDATE TWEETS - currently uses
        "Tweets": "",
        "Avg Daily Rainfall": `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/avgrainfalloverview?startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`,
    }

    useEffect(() => {

        trackPromise(
            axios.get(OVERVIEW_URL_PATHS[changeOverviewMapView.mapView])
                .then(res => {
                    const payload = res.data['responseData']['array_to_json'] === undefined ? [] : res.data['responseData']['array_to_json']
                    if ((payload.length) && (changeOverviewMapView.mapView !== "Avg Daily Rainfall")) {
                        setData(payload.map(d => [Number(d.longitude), Number(d.latitude)]))
                    } else if ((payload.length) && (changeOverviewMapView.mapView === "Avg Daily Rainfall")) {
                        setData(payload.map(d => [...Array(Math.round(d['avgrainreport']))].map((_, i) => [Number(d.longitude), Number(d.latitude)])).flat())
                    } else {
                        setData(payload)
                    }
                })
        , "national-overview-map")

    }, [configureAPI['node_env'].NODE_ENV, data.length, changeOverviewMapView.mapView, toggleDate.startDate, toggleDate.endDate])



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