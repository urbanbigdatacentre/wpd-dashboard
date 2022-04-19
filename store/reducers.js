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

