// REDUX ACTION TYPES

import * as types from './types';

// Change Language
export const changeLanguage = (languageSelected) => (dispatch) => dispatch({
    type: types.SWITCHLANGUAGE, payload: languageSelected
})