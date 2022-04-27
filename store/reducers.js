// ALL REDUX REDUCERS

// Local Imports
import * as actionTypes from './types';
import dates from '../data/dates';

// - TOGGLE LANGUAGE
const languageInitialState = {
    language: "en",
}

export const toggleLanguage = (state = languageInitialState, action) => {
    switch (action.type) {
        case actionTypes.SWITCHLANGUAGE:
            return Object.assign({}, state, {
                language: action.language,
            });
        default:
            return state
    }
}

// - TOGGLE DATE

const dateInitialState = {
    startDate: dates['24Hours'],
    endDate: dates.now
}

export const toggleDate = (state= dateInitialState, action) => {
    switch (action.type) {
        case actionTypes.SWITCHDATE:
            return Object.assign({}, state, {
                startDate: action.startDate,
                endDate: action.endDate
            })
        default:
            return state
    }
}

// - SLIDE HEX RADIUS - NATIONAL OVERVIEW MAP

const hexRadiusInitialState = {
    hexRadius: 2500
}

export const changeRadiusWithSlider = (state= hexRadiusInitialState, action) => {
    switch (action.type) {
        case actionTypes.SLIDERADIUS:
            return Object.assign({}, state, {
                hexRadius: action.hexRadius
            })
        default:
            return state
    }
}


// - SETCAROUSELCOORDINATES - CITIZEN CAROUSEL MAP

const carouselCoordinatesInitialState = {
    latitude: -23.6821604,
    longitude: -46.8754915,
    citizenType: ""
}

export const updateCarouselCoordinates = (state= carouselCoordinatesInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETCAROUSELCOORDINATES:
            return Object.assign({}, state, {
                latitude: action.latitude,
                longitude: action.longitude,
                citizenType: action.citizenType,
            })
        default:
            return state
    }
}

