// File used to request floodzones data using current viewport bounding box

import config from "./config";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {makeFloodZonesBBOXRequest} from "./floodzonesCancelToken";

const requestFloodZonesBBOXData = async (viewportArray, configureAPI, updateFloodData, updateFloodDataDispatch, toggleLocationPreference, removeFloodDataDispatch) => {

    const FLOODZONES_BBOX_API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/floodzonesbybbox?bbox=${viewportArray}`

    console.log("Requesting /floodzonesbybbox")

    console.log(FLOODZONES_BBOX_API_URL)

    const liveResult = await makeFloodZonesBBOXRequest(
        FLOODZONES_BBOX_API_URL
    )

    const floodZones = await liveResult;

    const payload = await floodZones?.data?.responseData?.json_build_object?.features?.array_to_json

    await removeFloodDataDispatch(toggleLocationPreference['locationID'])
    await updateFloodDataDispatch(payload === undefined ? [] : [...new Set(payload)], toggleLocationPreference['locationID'], toggleLocationPreference['locationPreference'])
}

export default requestFloodZonesBBOXData;