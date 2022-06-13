// File used to request simple information and geometry of location chosen by user

import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import config from "./config";

const requestSimpleGeometry = (item, configureAPI, addingLocation, clickHandler, changeLocationPreference, updatePrimaryLocationDispatch, updateAdditionalLocationDispatch) => {

    // Make Simple Geometry Request
    const requestURL = `${config[configureAPI.node_env['NODE_ENV']]}/dashboard/simplegeometry?id=${item['placeid']}`

    console.log("Requesting /simplegeometry")

    trackPromise(
        axios.get(requestURL)
            .then(res => {
                addingLocation ? updateAdditionalLocationDispatch(res.data.responseData.array_to_json[0]) : updatePrimaryLocationDispatch(res.data.responseData.array_to_json[0]);
                !addingLocation ? changeLocationPreference(res.data.responseData.array_to_json[0]['placename'], res.data.responseData.array_to_json[0]['placeid']) : null;
                clickHandler(item);
            })
            .catch(err => {
                console.log("An error occurred", err)
            }), "simple-geometry")

}

export default requestSimpleGeometry;