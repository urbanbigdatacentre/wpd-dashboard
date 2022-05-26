// Background Map Component - Simple Map to be used at the top of each location page

// Package Imports
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import {connect} from "react-redux";
import React, {useCallback, useRef, useState} from "react";
import {MapboxLayer} from "@deck.gl/mapbox";
import locationPaths from "../../data/locationPaths";
// Local Imports


// Map Configuration
const mapStyleMapBoxSatelliteWContour = "mapbox://styles/andyclarke/cl3jxy8n7000d14npejdet872";

// Background Map Component
const BackgroundMap = ({ mapBoxToken, updatePrimaryLocation }) => {

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

            map.addLayer(new MapboxLayer({ id: "dummy-layer" + Math.random(), deck }));
        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);


    const INITIAL_VIEW_STATE = {
        longitude: updatePrimaryLocation.location.longitude - 0.17,
        latitude: updatePrimaryLocation.location.latitude - 0.07,
        zoom: locationPaths[updatePrimaryLocation.location['placetype']].zoom,
        minZoom: 2,
        maxZoom: 16,
        pitch: 30,
        bearing: 0
    };

    return (
        <DeckGL
            ref={deckRef}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
            controller={false}
            preventStyleDiffing={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'} width={'100%'}
        >

            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    ref={mapRef}
                    gl={glContext}
                    onLoad={onMapLoad}
                    mapStyle={mapStyleMapBoxSatelliteWContour}
                    mapboxAccessToken={mapBoxToken}
                />
            )}

        </DeckGL>
    );

}

export default connect((state) => state)(BackgroundMap)