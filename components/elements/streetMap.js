// Street Map Component for Citizen Generated Maps

// Package Imports
import {connect} from "react-redux";
import StaticMap from "react-map-gl";
import DeckGL from "@deck.gl/react";
import React, {useCallback, useRef, useState} from "react";
import {IconLayer} from '@deck.gl/layers';


// Local Imports
import mapIcons from '../../public/images/icons/location-icon-atlas.svg';
import {MapboxLayer} from "@deck.gl/mapbox";

// Map Configuration
const mapStyleMapBoxStreets = "mapbox://styles/andyclarke/cl2su9yt2001t15mu6fasl9wp";
const mapStyleSatellite = 'mapbox://styles/andyclarke/cl2svsl4j002f15o39tp0dy2q';

const ICON_MAPPING = {
    Student: { x: 384, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    Teacher: { x: 256, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
    School: { x: 128, y: 512, width: 128, height: 128, mask: false, anchorY: 128 },
};


// Street Map Component
const StreetMap = ({ toggleLocationPreference, mapBoxToken, updateCarouselCoordinates, updateAdditionalLocation, mapStylePlain, updatePrimaryLocation }) => {

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
            map.addLayer(new MapboxLayer({ id: "carousel-citizen-report-layer", deck }));


        }
        setMapLoaded(true);

    }, [deckRef, mapRef, mapLoaded]);


    const citizenCarouselIconLayer = new IconLayer({
        id: "carousel-citizen-report-layer",
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

    const additionalLocationFilter = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference)

    const actualLocation = updateAdditionalLocation.locations.filter(item => item['placename'] === toggleLocationPreference.locationPreference).length ? additionalLocationFilter[0] : updatePrimaryLocation.location

    const locationSettings = {
        initialLongitude: updateCarouselCoordinates.longitude - 0.17,
        initialLatitude: updateCarouselCoordinates.latitude - 0.07,
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
                    ref={mapRef}
                    gl={glContext}
                    onLoad={onMapLoad}
                    mapStyle={mapStylePlain ? mapStyleSatellite : mapStyleMapBoxStreets}
                    mapboxAccessToken={mapBoxToken}
                />
            )}

        </DeckGL>
    );

}

export default connect((state) => state)(StreetMap)