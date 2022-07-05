// Street Map Component for Citizen Generated Maps

// Package Imports
import {connect} from "react-redux";
import StaticMap, {NavigationControl} from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {IconLayer} from '@deck.gl/layers';
import CITIZEN_EVENTS_ICON_MAPPING from "../../data/citizenRainfallEventsIconMapping";

// Local Imports
import mixedMapIcons from '../../public/images/icons/mixed-location-icon-atlas.png';

import {MapboxLayer} from "@deck.gl/mapbox";

// Map Configuration
const mapStyleMapBoxStreets = "mapbox://styles/andyclarke/cl4ck4ui9000414p23bl0vft5";

// Street Map Component
const StreetMap = ({ toggleLocationPreference, mapBoxToken, updateCarouselCoordinates, updateAdditionalLocation, mapStylePlain, updatePrimaryLocation }) => {

    // DeckGL and mapbox will both draw into this WebGL context
    const [glContext, setGLContext] = useState();
    const [mapLoaded, setMapLoaded] = useState(false);
    const deckRef = useRef(null);
    const mapRef = useRef(null);
    const [viewportControl, updateViewport] = useState({})

    // Get viewport dimensions
    let vw = 0;
    let vh = 0;
    if (typeof window === `object`) {
        vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    }

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
            map.addLayer(new MapboxLayer({ id: "carousel-citizen-report-layer", deck }));


        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);

    const ICON_MAPPING = {
        RIVERFLOOD_FORM: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
        RAIN_FORM: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
        FLOODZONES_FORM: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    };

    const citizenCarouselIconLayer = new IconLayer({
        id: "carousel-citizen-report-layer",
        data: [
            {
                submissionType: updateCarouselCoordinates.submissionType,
                coordinates: [updateCarouselCoordinates.longitude, updateCarouselCoordinates.latitude]
            }
        ],
        pickable: true,
        iconAtlas: mixedMapIcons.src,
        getIcon: (d) => updateCarouselCoordinates.submissionType,
        iconMapping: ICON_MAPPING,
        sizeScale: 10,
        getPosition: (d) => d.coordinates,
        getSize: (d) => 12,

    });

    const locationSettings = {
        initialLongitude: vw > 1140 ? updateCarouselCoordinates.longitude - 0.09 : vw > 550 ? updateCarouselCoordinates.longitude - 0.04 : updateCarouselCoordinates.longitude - 0.03,
        initialLatitude: updateCarouselCoordinates.latitude,
        zoom: 12
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

    return (

        <DeckGL
            ref={deckRef}
            onWebGLInitialized={setGLContext}
            glOptions={{
                stencil: true
            }}
            layers={[citizenCarouselIconLayer]}
            controller={false}
            preventStyleDiffing={true}
            initialViewState={INITIAL_VIEW_STATE}
            height={'100%'} width={'100%'}
        >

            {glContext && (
                /* This is important: Mapbox must be instantiated after the WebGLContext is available */
                <StaticMap
                    { ...viewportControl}
                    ref={mapRef}
                    gl={glContext}
                    onLoad={onMapLoad}
                    mapStyle={mapStyleMapBoxStreets}
                    mapboxAccessToken={mapBoxToken}
                >
                </StaticMap>
            )}

        </DeckGL>
    );

}

export default connect((state) => state)(StreetMap)