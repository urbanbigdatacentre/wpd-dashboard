// REDUX ACTION TYPES

import * as types from './types';

// CHANGE LANGUAGE
export const changeLanguage = (languageSelected) => (dispatch) => {
    return dispatch({
        type: types.SWITCHLANGUAGE,
        language: languageSelected
    })
}

// CHANGE DATE
export const changeDate = (dateSelected) => (dispatch) => {
    return dispatch({
        type: types.SWITCHDATE,
        startDate: dateSelected.startDate,
        endDate: dateSelected.endDate
    })
}

// SLIDE RADIUS
export const changeRadius = (newRadius) => (dispatch) => {

    return dispatch({
        type: types.SLIDERADIUS,
        hexRadius: newRadius
    })
}

// SET CAROUSEL COORDINATES
export const updateCarouselCoordinates = (newCoordinates) => (dispatch) => {

    return dispatch({
        type: types.SETCAROUSELCOORDINATES,
        latitude: parseFloat(newCoordinates.latitude),
        longitude: parseFloat(newCoordinates.longitude),
        citizenType: newCoordinates.citizenType,
    })
}

