// File used to request different types of citizen generated data using 1 API Endpoint

import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import config from "./config";

const requestCitizenEvents = (locationID, formType, startDate, endDate, locationName, configureAPI, existingDataArray, dispatchFunction, forceUpdate) => {

    const formTypeAPIMapping = {
        9: {
            TYPE: "RAIN_FORM",
        },
        10: {
            TYPE: "FLOODZONES_FORM",
        },
        11: {
            TYPE: "RIVERFLOOD_FORM",
        },
    }

    // Check if citizen data already exists for this location
    const filteredDataArray = existingDataArray.locations.length ? existingDataArray.locations.filter(function(location){
        // Return the item only if the ids are equal
        return (location['id'] === locationID);
    }) : [];


    // Check if Citizen Rainfall Events already exists for this location
    ((!filteredDataArray.length) || forceUpdate) ? trackPromise(
        axios.get(`${config[configureAPI['node_env'].NODE_ENV]}/dashboard/citizenevents?id=${locationID}&type=${formType}&startDate=-${startDate}&endDate=${endDate}`)
            .then(res => {
                const payload = res.data?.responseData?.array_to_json
                dispatchFunction(payload === undefined ? [] : payload, locationID, locationName)
            }),
        formTypeAPIMapping[formType].TYPE) : null;
}

export default requestCitizenEvents;