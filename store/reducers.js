// ALL REDUX REDUCERS

// Local Imports
import * as actionTypes from './types';
import dates from '../data/dates';

// - SET API CONFIG
const apiConfig = {
    node_env: "",
}

export const configureAPI = (state = apiConfig, action) => {
    switch (action.type) {
        case actionTypes.SETAPICONFIG:
            return Object.assign({}, state, {
                node_env: action.node_env,
            });
        default:
            return state
    }
}

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

// - SET SEARCH TERM
const searchTermInitialState = {
    searchTerm: "",
}

export const setSearchTerm = (state = searchTermInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETSEARCHTERM:
            return Object.assign({}, state, {
                searchTerm: action.searchTerm,
            });
        default:
            return state
    }
}

// - TOGGLE DATE

const dateInitialState = {
    startDate: dates['90Days'],
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

const greatestDateInitialState = {
    startDate: dates['90Days'],
    endDate: dates.now
}

export const toggleGreatestDateRange = (state= greatestDateInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETGREATESTDATERANGE:
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
    hexRadius: 30000
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
    submissionType: "RAIN_FORM",
}

export const updateCarouselCoordinates = (state= carouselCoordinatesInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETCAROUSELCOORDINATES:
            return Object.assign({}, state, {
                latitude: action.latitude,
                longitude: action.longitude,
                submissionType: action.submissionType,
            })
        default:
            return state
    }
}

const allCitizenEventsInitialState = {
    citizenEvents: [],
}

export const updateAllCitizenEvents = (state= allCitizenEventsInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETALLCITIZENEVENTS:
            return Object.assign({}, state, {
                citizenEvents: action.citizenEvents,
            })
        default:
            return state
    }
}

// - SETCAROUSELCOORDINATES - CITIZEN CAROUSEL MAP

const floodCoordinatesInitialState = {
    latitude: null,
    longitude: null,
    zoom: 8,
}

export const updateFloodCoordinates = (state= floodCoordinatesInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETFLOODCOORDINATES:
            return Object.assign({}, state, {
                latitude: action.latitude,
                longitude: action.longitude,
                zoom: action.zoom
            })
        default:
            return state
    }
}



// - SETPRIMARYLOCATION

const primaryLocationInitialState = {
    location: {},
}

export const updatePrimaryLocation = (state= primaryLocationInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETPRIMARYLOCATION:
            return Object.assign({}, state, {
                location: action.location,
            })
        default:
            return state
    }
}


// - SETADDITIONALLOCATION

const additionalLocationInitialState = {
    locations: [],
}

export const updateAdditionalLocation = (state= additionalLocationInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETADDITIONALLOCATION:
            return Object.assign({}, state, {
                locations: [...state.locations, action.location],
            })
        case actionTypes.REMOVEADDITIONALLOCATION:
            return Object.assign({}, state, {
                locations: [...state.locations.filter((element, index) => element['placeid'] !== action.location['placeid'])],
            })
        default:
            return state
    }
}

// - CHANGE DATA TYPE
const dataTypeInitialState = {
    dataType: "Combined",
}

export const toggleDataType = (state = dataTypeInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETDATATYPE:
            return Object.assign({}, state, {
                dataType: action.dataType,
            });
        default:
            return state
    }
}

// - CHANGE LOCATION PREFERENCE
const locationPreferenceInitialState = {
    locationPreference: "",
    locationID: ""
}

export const toggleLocationPreference = (state = locationPreferenceInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETLOCATIONPREFERENCE:
            return Object.assign({}, state, {
                locationPreference: action.locationPreference,
                locationID: action.locationID,
            });
        default:
            return state
    }
}


// - UPDATE PLUVIOMETER DATA
const pluviometerDataInitialState = {
    locations: [],
}

export const updatePluviometerData = (state = pluviometerDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETPLUVIOMETERDATA:

            return Object.assign({}, state, {
                locations:
                    [
                        ...state.locations,
                        {
                            id: action.locationID,
                            pluviometerData: action.pluviometerData,
                            startDate: action.startDate,
                            endDate: action.endDate,
                            locationName: action.locationName,
                            locationType: action.locationType
                        }

                    ]
            });
        case actionTypes.REMOVEPLUVIOMETERDATA:
            return Object.assign({}, state, {
                locations: [...state.locations.filter((element, index) => element['id'] !== action.locationID)],
            })
        default:
            return state
    }
}

// - UPDATE FLOODZONES DATA
const floodDataInitialState = {
    locations: [],
}

export const updateFloodData = (state = floodDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETFLOODDATA:

            return Object.assign({}, state, {
                locations:
                    [
                        ...state.locations,
                        {
                            id: action.locationID,
                            locationName: action.locationName,
                            floodData: action.floodData,
                        }

                    ]
            });
        case actionTypes.REMOVEFLOODDATA:
            return Object.assign({}, state, {
                locations: [...state.locations.filter((element, index) => element['id'] !== action.locationID)],
            })
        default:
            return state
    }
}


// - SETCLUSTERSTATUS
const clusterStatusInitialState = {
    cluster: true,
}

export const toggleClusterStatus = (state = clusterStatusInitialState, action) => {
    switch (action.type) {
        case actionTypes.CLUSTERRAINFALLMAP:
            return Object.assign({}, state, {
                cluster: action.cluster,
            });
        default:
            return state
    }
}


// - SET OVERVIEW MAP VIEW
const overviewMapViewIntialState = {
    mapView: "Citizen Reports",
}

export const changeOverviewMapView = (state = overviewMapViewIntialState, action) => {
    switch (action.type) {
        case actionTypes.SETOVERVIEWMAPVIEW:
            return Object.assign({}, state, {
                mapView: action.mapView,
            });
        default:
            return state
    }
}

// - UPDATE CITIZEN RAINFALL EVENTS DATA
const citizenRainfallEventsDataInitialState = {
    locations: [],
}

export const updateCitizenEventsRainfallData = (state = citizenRainfallEventsDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETCITIZENRAINFALLEVENTS:

            return Object.assign({}, state, {
                locations:
                    [
                        ...state.locations,
                        {
                            id: action.locationID,
                            locationName: action.locationName,
                            citizenRainfallEvents: action.citizenRainfallEvents,
                        }

                    ]
            });
        case actionTypes.REMOVECITIZENRAINFALLEVENTS:
            return Object.assign({}, state, {
                locations: [...state.locations.filter((element, index) => element['id'] !== action.locationID)],
            })
        default:
            return state
    }
}

// - UPDATE CITIZEN FLOODZONES EVENTS DATA
const citizenFloodZonesEventsDataInitialState = {
    locations: [],
}

export const updateCitizenEventsFloodZonesData = (state = citizenFloodZonesEventsDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETCITIZENFLOODZONESEVENTS:

            return Object.assign({}, state, {
                locations:
                    [
                        ...state.locations,
                        {
                            id: action.locationID,
                            locationName: action.locationName,
                            citizenFloodZonesEvents: action.citizenFloodZonesEvents,
                        }

                    ]
            });
        case actionTypes.REMOVECITIZENFLOODZONESEVENTS:
            return Object.assign({}, state, {
                locations: [...state.locations.filter((element, index) => element['id'] !== action.locationID)],
            })
        default:
            return state
    }
}

// - UPDATE CITIZEN RIVERFLOOD EVENTS DATA
const citizenRiverFloodEventsDataInitialState = {
    locations: [],
}

export const updateCitizenEventsRiverFloodData = (state = citizenRiverFloodEventsDataInitialState, action) => {
    switch (action.type) {
        case actionTypes.SETCITIZENRIVERFLOODEVENTS:

            return Object.assign({}, state, {
                locations:
                    [
                        ...state.locations,
                        {
                            id: action.locationID,
                            locationName: action.locationName,
                            citizenRiverFloodEvents: action.citizenRiverFloodEvents,
                        }

                    ]
            });
        case actionTypes.REMOVECITIZENRIVERFLOODEVENTS:
            return Object.assign({}, state, {
                locations: [...state.locations.filter((element, index) => element['id'] !== action.locationID)],
            })
        default:
            return state
    }
}