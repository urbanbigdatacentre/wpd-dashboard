// REDUX STORE INITIALIZATION

import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from 'redux-thunk'
import {toggleLanguage} from "./reducers";
import {create} from "@mui/material/styles/createTransitions";


// Function to bind middleware
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

// Combine Reducers Together
const combinedReducer = combineReducers({
    toggleLanguage,
})

// Create Root Reducer
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        // What does this mean?
        const nextState = {
            ...state,
            ...action.payload,
        }
        // Return the new payload
        // ** NB ** Possibility of Preserving State Values on Client Side here 👇
        return nextState;
    } else {
        // Return the current
        return combinedReducer(state, action)
    }
}

// Initialize the store with a createStore instace
const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
}

export const wrapper = createWrapper(initStore);