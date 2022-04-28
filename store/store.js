// REDUX STORE INITIALIZATION

import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import thunkMiddleware from 'redux-thunk'
import {toggleLanguage, toggleDate, changeRadiusWithSlider, updateCarouselCoordinates, updatePrimaryLocation} from "./reducers";


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

// Combine Reducers Together
const combinedReducer = combineReducers({
    toggleLanguage,
    toggleDate,
    changeRadiusWithSlider,
    updateCarouselCoordinates,
    updatePrimaryLocation
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
        if (state.updatePrimaryLocation) nextState.updatePrimaryLocation = state.updatePrimaryLocation;
        if (state.updateCarouselCoordinates) nextState.updateCarouselCoordinates = state.updateCarouselCoordinates;
        if (state.toggleDate.date) nextState.toggleDate.date = state.toggleDate.date;
        if (state.toggleLanguage.language) nextState.toggleLanguage.language = state.toggleLanguage.language;
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