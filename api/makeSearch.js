// ======================================
// Function to prevent unneccessary requests ---> used within liveSearch method (Search Component)
// ======================================


// ===========
// IMPORTS
// ===========

// General Imports
import axios from 'axios';
import {trackPromise} from "react-promise-tracker";

const resources = {};

const makeRequestCreator = () => {
    let cancel;

    return async query => {
        if (cancel) {
            // Cancel the previous request before making a new request
            cancel.cancel();
        }
        // Create a new CancelToken
        cancel = axios.CancelToken.source();
        try {
            if (resources[query]) {
                // Return result if it exists
                return resources[query];
            }

            const res = await trackPromise(axios(query, { cancelToken: cancel.token }), "search-result");
            const result = res;
            // Store response
            resources[query] = result;

            return result;
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log('Request canceled', error.message);
            } else {
                // Handle usual errors
                console.log('Something went wrong: ', error.message);
            }
        }
    };
};

export const makeSearch = makeRequestCreator();