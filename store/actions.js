// REDUX ACTION TYPES

import * as types from './types';

// Set API Config
export const setAPIConfig = (node_env) => (dispatch) => {
    return dispatch({
        type: types.SETAPICONFIG,
        node_env: node_env
    })
}
// CHANGE LANGUAGE
export const changeLanguage = (languageSelected) => (dispatch) => {
    return dispatch({
        type: types.SWITCHLANGUAGE,
        language: languageSelected
    })
}

// SET SEARCH TERM
export const changeSearchTerm = (searchTerm) => (dispatch) => {
    return dispatch({
        type: types.SETSEARCHTERM,
        searchTerm: searchTerm
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


// SET GREATEST DATE RANGE
export const updateGreatestDateRange = (dateSelected) => (dispatch) => {
    return dispatch({
        type: types.SETGREATESTDATERANGE,
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
        submissionType: newCoordinates.submissionType,
    })
}

// SET ALL CITIZEN EVENTS
export const updateAllCitizenEvents = (newCitizenEventsArray) => (dispatch) => {

    return dispatch({
        type: types.SETALLCITIZENEVENTS,
        citizenEvents: newCitizenEventsArray,
    })
}

// SET FLOOD COORDINATES
export const updateFloodCoordinates = (newCoordinates) => (dispatch) => {

    return dispatch({
        type: types.SETFLOODCOORDINATES,
        latitude: parseFloat(newCoordinates.latitude),
        longitude: parseFloat(newCoordinates.longitude),
        zoom: parseFloat(newCoordinates.zoom)
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
export const changeLocationPreference = (newLocationPreference, newLocationID) => (dispatch) => {

    return dispatch({
        type: types.SETLOCATIONPREFERENCE,
        locationPreference: newLocationPreference,
        locationID: newLocationID,
    })
}


// SET PLUVIOMETER DATA
export const updatePluviometerData = (pluviometerDataArray, locationID, startDate, endDate, locationName, locationType) => (dispatch) => {

    return dispatch({
        type: types.SETPLUVIOMETERDATA,
        pluviometerData: pluviometerDataArray,
        locationID: locationID,
        startDate: startDate,
        endDate: endDate,
        locationName: locationName,
        locationType: locationType
    })
}

// REMOVE PLUVIOMETER DATA
export const removePluviometerData = (locationID) => (dispatch) => {

    return dispatch({
        type: types.REMOVEPLUVIOMETERDATA,
        locationID: locationID
    })
}

// SET FLOODZONES DATA
export const updateFloodZonesData = (floodDataArray, locationID, locationName) => (dispatch) => {

    return dispatch({
        type: types.SETFLOODDATA,
        floodData: floodDataArray,
        locationID: locationID,
        locationName: locationName,
    })
}

// REMOVE FLOODZONES DATA
export const removeFloodZonesData = (locationID) => (dispatch) => {

    return dispatch({
        type: types.REMOVEFLOODDATA,
        locationID: locationID
    })
}

// CLUSTER RAINFALL MAP
export const setClusterStatus = (clusterStatus) => (dispatch) => {

    return dispatch({
        type: types.CLUSTERRAINFALLMAP,
        cluster: clusterStatus,
    })
}


// SET OVERVIEW MAP VIEW
export const setOverviewMapView = (mapView) => (dispatch) => {

    return dispatch({
        type: types.SETOVERVIEWMAPVIEW,
        mapView: mapView,
    })
}


// SET CITIZEN RAINFALL EVENTS DATA
export const updateCitizenRainfallEventsData = (citizenRainfallEventsArray, locationID, locationName) => (dispatch) => {

    return dispatch({
        type: types.SETCITIZENRAINFALLEVENTS,
        citizenRainfallEvents: citizenRainfallEventsArray,
        locationID: locationID,
        locationName: locationName,
    })
}

// REMOVE CITIZEN RAINFALL EVENTS DATA
export const removeCitizenRainfallEventsData = (locationID) => (dispatch) => {

    return dispatch({
        type: types.REMOVECITIZENRAINFALLEVENTS,
        locationID: locationID
    })
}

// SET CITIZEN FLOODZONES EVENTS DATA
export const updateCitizenFloodZonesEventsData = (citizenFloodZonesEventsArray, locationID, locationName) => (dispatch) => {

    return dispatch({
        type: types.SETCITIZENFLOODZONESEVENTS,
        citizenFloodZonesEvents: citizenFloodZonesEventsArray,
        locationID: locationID,
        locationName: locationName,
    })
}

// REMOVE CITIZEN FLOODZONES EVENTS DATA
export const removeCitizenFloodZonesEventsData = (locationID) => (dispatch) => {

    return dispatch({
        type: types.REMOVECITIZENFLOODZONESEVENTS,
        locationID: locationID
    })
}

// SET CITIZEN RIVERFLOOD EVENTS DATA
export const updateCitizenRiverFloodEventsData = (citizenRiverFloodEventsArray, locationID, locationName) => (dispatch) => {

    return dispatch({
        type: types.SETCITIZENRIVERFLOODEVENTS,
        citizenRiverFloodEvents: citizenRiverFloodEventsArray,
        locationID: locationID,
        locationName: locationName,
    })
}

// REMOVE CITIZEN RIVERFLOOD EVENTS DATA
export const removeCitizenRiverFloodEventsData = (locationID) => (dispatch) => {

    return dispatch({
        type: types.REMOVECITIZENRIVERFLOODEVENTS,
        locationID: locationID
    })
}
