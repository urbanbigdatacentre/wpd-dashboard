// REDUX STORE INITIALIZATION

import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import thunkMiddleware from 'redux-thunk'
import {
    configureAPI,
    toggleLanguage,
    toggleDate,
    changeRadiusWithSlider,
    updateCarouselCoordinates,
    updatePrimaryLocation,
    updateAdditionalLocation,
    toggleDataType,
    toggleLocationPreference,
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
    toggleDate,
    changeRadiusWithSlider,
    updateCarouselCoordinates,
    updatePrimaryLocation,
    updateAdditionalLocation,
    toggleDataType,
    toggleLocationPreference
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
        if (state.toggleLocationPreference.locationPreference) nextState.toggleLocationPreference.locationPreference = state.toggleLocationPreference.locationPreference;
        if (state.toggleDataType.dataType) nextState.toggleDataType.dataType = state.toggleDataType.dataType;
        if (state.updateAdditionalLocation) nextState.updateAdditionalLocation = state.updateAdditionalLocation;
        if (state.updatePrimaryLocation) nextState.updatePrimaryLocation = state.updatePrimaryLocation;
        if (state.updateCarouselCoordinates) nextState.updateCarouselCoordinates = state.updateCarouselCoordinates;
        if (state.toggleDate.date) nextState.toggleDate.date = state.toggleDate.date;
        if (state.toggleLanguage.language) nextState.toggleLanguage.language = state.toggleLanguage.language;
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