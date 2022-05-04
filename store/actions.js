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

// SET PRIMARY LOCATION
export const updatePrimaryLocation = (newLocation) => (dispatch) => {

    return dispatch({
        type: types.SETPRIMARYLOCATION,
        location: newLocation,
    })
}

// SET ADDITIONAL LOCATION
export const updateAdditionalLocation = (newLocation) => (dispatch) => {

    return dispatch({
        type: types.SETADDITIONALLOCATION,
        location: newLocation,
    })
}

// REMOVE ADDITIONAL LOCATION
export const removeAdditionalLocation = (location) => (dispatch) => {

    return dispatch({
        type: types.REMOVEADDITIONALLOCATION,
        location: location,
    })
}

// SET DATA TYPE
export const changeDataType = (newDataType) => (dispatch) => {

    return dispatch({
        type: types.SETDATATYPE,
        dataType: newDataType,
    })
}

// SET LOCATION PREFERENCE
export const changeLocationPreference = (newLocationPreference) => (dispatch) => {

    return dispatch({
        type: types.SETLOCATIONPREFERENCE,
        locationPreference: newLocationPreference,
    })
}


