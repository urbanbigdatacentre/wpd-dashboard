// REDUX STORE INITIALIZATION

import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import thunkMiddleware from 'redux-thunk'
import {
    configureAPI,
    toggleLanguage,
    setSearchTerm,
    toggleDate,
    changeRadiusWithSlider,
    updateCarouselCoordinates,
    updatePrimaryLocation,
    updateAdditionalLocation,
    toggleDataType,
    toggleLocationPreference,
    updatePluviometerData,
    toggleClusterStatus,
    changeOverviewMapView,
    updateFloodData,
    updateFloodCoordinates,
    updateCitizenEventsRainfallData,
    updateCitizenEventsFloodZonesData,
    updateCitizenEventsRiverFloodData,
    toggleGreatestDateRange, updateAllCitizenEvents,
} from "./reducers";


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

// Combine Reducers Together
const combinedReducer = combineReducers({
    configureAPI,
    toggleLanguage,
    setSearchTerm,
    toggleDate,
    changeRadiusWithSlider,
    updateCarouselCoordinates,
    updatePrimaryLocation,
    updateAdditionalLocation,
    toggleDataType,
    toggleLocationPreference,
    updatePluviometerData,
    toggleClusterStatus,
    changeOverviewMapView,
    updateFloodData,
    updateFloodCoordinates,
    updateCitizenEventsRainfallData,
    updateCitizenEventsFloodZonesData,
    updateCitizenEventsRiverFloodData,
    toggleGreatestDateRange,
    updateAllCitizenEvents
})

// Create Root Reducer
const reducer = (state, action) => {

    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }

        // Return the new payload
        // ** NB ** Possibility of Preserving State Values on Client Side here
        if (state.updateCitizenEventsRiverFloodData) nextState.updateCitizenEventsRiverFloodData = state.updateCitizenEventsRiverFloodData;
        if (state.updateCitizenEventsFloodZonesData) nextState.updateCitizenEventsFloodZonesData = state.updateCitizenEventsFloodZonesData;
        if (state.updateCitizenEventsRainfallData) nextState.updateCitizenEventsRainfallData = state.updateCitizenEventsRainfallData;
        if (state.changeOverviewMapView) nextState.changeOverviewMapView = state.changeOverviewMapView;
        if (state.toggleClusterStatus) nextState.toggleClusterStatus = state.toggleClusterStatus;
        if (state.updateFloodData) nextState.updateFloodData = state.updateFloodData;
        if (state.updatePluviometerData) nextState.updatePluviometerData = state.updatePluviometerData;
        if (state.toggleLocationPreference) nextState.toggleLocationPreference = state.toggleLocationPreference;
        if (state.toggleDataType.dataType) nextState.toggleDataType.dataType = state.toggleDataType.dataType;
        if (state.updateAdditionalLocation) nextState.updateAdditionalLocation = state.updateAdditionalLocation;
        if (state.updatePrimaryLocation) nextState.updatePrimaryLocation = state.updatePrimaryLocation;
        if (state.updateFloodCoordinates) nextState.updateFloodCoordinates = state.updateFloodCoordinates;
        if (state.updateCitizenEventsRiverFloodData) nextState.updateCitizenEventsRiverFloodData = state.updateCitizenEventsRiverFloodData;
        if (state.updateAllCitizenEvents) nextState.updateAllCitizenEvents = state.updateAllCitizenEvents;
        if (state.updateCarouselCoordinates) nextState.updateCarouselCoordinates = state.updateCarouselCoordinates;
        if (state.toggleGreatestDateRange) nextState.toggleGreatestDateRange = state.toggleGreatestDateRange;
        if (state.toggleDate) nextState.toggleDate = state.toggleDate;
        if (state.setSearchTerm) nextState.setSearchTerm = state.setSearchTerm;
        if (state.toggleLanguage) nextState.toggleLanguage = state.toggleLanguage;
        if (state.configureAPI.node_env) nextState.configureAPI.node_env = state.configureAPI.node_env;
        return nextState;
    } else {
        return combinedReducer(state, action)
    }
}

// Initialize the store with a createStore instance
const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
}

export const wrapper = createWrapper(initStore, {debug:true});