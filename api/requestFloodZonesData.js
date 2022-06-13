// File used to request floodzones data for location selected by user

import config from "./config";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";

const requestFloodZonesData = (item, configureAPI, updateFloodData, updateFloodDataDispatch) => {

    const FLOODZONES_API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/floodzones?id=${item['placeid']}`

    console.log("Requesting /floodzones")

    // Check if Floodzones data already exists for this location **
    const filteredFloodData = updateFloodData.locations.length ? updateFloodData.locations.filter(function (location) {
        // Return the item only if the ids are equal
        return (location['id'] === item['placeid']);
    }) : [];

    !filteredFloodData.length ? trackPromise(
        axios.get(FLOODZONES_API_URL)
            .then(res => {
                const payload = res.data?.responseData?.json_build_object?.features?.array_to_json
                updateFloodDataDispatch(payload === undefined ? [] : payload, item['placeid'], item['placename'])
            })
        , "floodzones-data") : null
}

export default requestFloodZonesData;