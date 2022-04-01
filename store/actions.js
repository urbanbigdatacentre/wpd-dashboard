// REDUX ACTION TYPES

import * as types from './types';

// Change Language

export const changeLanguage = (languageSelected) => (dispatch) => {
    return dispatch({
        type: types.SWITCHLANGUAGE,
        language: languageSelected
    })
}

// Clock

export const serverRenderClock = (isServer) => (dispatch) => {
    return dispatch({
        type: types.TICK,
        light: !isServer,
        ts: Date.now(),
    })
}

export const startClock = () => (dispatch) => {
    return setInterval(
        () => dispatch({ type: types.TICK, light: true, ts: Date.now() }),
        1000
    )
}
