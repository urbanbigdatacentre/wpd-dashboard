// ALL REDUX REDUCERS

// Local Imports
import * as actionTypes from './types';

// Reducer Functidons

// - Toggle Language
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

const tickInitialState = {
    lastUpdate: 0,
    light: false,
}

export const tickReducer = (state = tickInitialState, action) => {
    switch (action.type) {
        case actionTypes.TICK:
            return Object.assign({}, state, {
                lastUpdate: action.ts,
                light: !!action.light,
            })
        default:
            return state
    }
}


