// ALL REDUX REDUCERS

// Local Imports
import * as actionTypes from './types';


// Reducer Functions

// - Toggle Language
const languageInitialState = {
    language: 'English',
}
export const toggleLanguage = (state = languageInitialState, action) => {
    switch (action.type) {
        case actionTypes.SWITCHLANGUAGE:
            return Object.assign({}, state, {
                language: action.payload
            });
    }
}

