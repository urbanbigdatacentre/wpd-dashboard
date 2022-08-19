// File used to request pluviometer data for location chosen by user

import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import config from "./config";

const requestPluviometerData = (item, toggleDate, configureAPI, updatePluviometerData, updatePluviometerDataDispatch) => {

    const API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/pluviometers?id=${item['placeid']}&startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`

    console.log("Requesting /pluviometers")
    console.log(API_URL)

    // Check if Pluviometer Data already exists for this location and if existing timestamp is sufficient
    const filteredPluviometerData = updatePluviometerData.locations.length ? updatePluviometerData.locations.filter(function (location) {

        // Return the item only if the ids are equal and the existing date is newer than the current date choice
        return (location['id'] === item['placeid'] && (location['startDate'] < toggleDate.startDate));
    }) : [];

    // Make request and track promise if data doesn't already exist
    !filteredPluviometerData.length ?
        trackPromise(
            axios.get(API_URL)
                .then(res => {
                    updatePluviometerDataDispatch(typeof (res.data['responseData']['array_to_json']) === 'undefined' ? [] : res.data['responseData']['array_to_json'], item['placeid'], toggleDate.startDate.toString(), toggleDate.endDate.toString(), item['placename'], item['placetype'])
                })
            , "pluviometer-data") : null
}

export default requestPluviometerData;