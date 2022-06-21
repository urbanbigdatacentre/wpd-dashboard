// Component to Render National Overview Map using Deck.GL

// Package Imports
import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import {connect} from "react-redux";
import React, {useRef, useEffect, useState, useCallback} from "react";

// Map Config Imports
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {MapboxLayer} from '@deck.gl/mapbox';
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import config from "../../api/config";
import OverviewMapLegend from "./overviewMapLegend";
import {Slider} from "@mui/material";



// Local Imports


// Map Config
const mapStyleBrazilOnly = 'mapbox://styles/andyclarke/cl32tkwur000p14qjkf29169z';

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
    shininess: 100,
    specularColor: [218, 65, 103]
};

const INITIAL_VIEW_STATE = {
    longitude: -47.2,
    latitude: -13.3,
    zoom: 4.0,
    minZoom: 3.5,
    maxZoom: 12,
    pitch: 10,
    bearing: 0
};


const NationalOverviewMap = ({ configureAPI, mapBoxToken, changeRadiusWithSlider, toggleDate, changeOverviewMapView }) => {

    const [data, setData] = useState([]);

    // SLIDER CHANGE
    const [sliderValue, setSliderValue] = useState(30000);


    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const deckRef = useRef(null);
    const mapRef = useRef(null);

    const onMapLoad = useCallback(() => {

        if (!mapLoaded) {

            const map = mapRef.current.getMap();
            const deck = deckRef.current.deck;

            map.addLayer(new MapboxLayer({ id: "dummy-layer", deck }));
            map.addLayer(new MapboxLayer({ id: "national-overview-map", deck }), 'settlement-subdivision-label');

            }
            setMapLoaded(true);

        }, [deckRef, mapRef, mapLoaded]);

    const customLayers = [
        new HexagonLayer({
            id: 'national-overview-map',
            colorRange,
            coverage: .95,
            data: data,
            elevationRange: [0, 25000],
            elevationScale: 25,
            extruded: false,
            getPosition: d => d,
            radius: sliderValue,
            upperPercentile: 100,
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
        if (configureAPI?.node_env?.NODE_ENV) {
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
        }

    }, [configureAPI['node_env'].NODE_ENV, data.length, changeOverviewMapView.mapView, toggleDate.startDate, toggleDate.endDate])


    // Handle data Change
    const handleSliderChange = (e) => {

        if (e.target.value !== null && Number.isInteger(e.target.value) && !Number.isNaN(e.target.value)) {
            // Change Redux Hex Radius value
            setSliderValue(Number(e.target.value));
        }
    }

    return (
        <>
        <OverviewMapLegend sliderComponent={<Slider min={10000} max={90000} value={sliderValue} onChange={handleSliderChange}/>}/>
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
            </>
    );
}



export default connect((state) => state)(NationalOverviewMap)