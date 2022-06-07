// Dropdown List to Render on Search Input

// Package Imports
import {connect} from "react-redux";
import {List, ListItem, Divider, ListItemButton, styled, Skeleton, Typography, Box} from "@mui/material";
import {bindActionCreators} from "redux";
import Link from 'next/link';
import axios from "axios";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";

// Local Imports
import LocationBox from "./locationBox";
import {
    updatePrimaryLocation,
    updateAdditionalLocation,
    changeLocationPreference,
    updatePluviometerData,
    removePluviometerData,
    removeFloodZonesData,
    updateFloodZonesData,
    updateCitizenRainfallEventsData,
    removeCitizenRainfallEventsData
} from "../../store/actions";
import locationPaths from "../../data/locationPaths";
import config from "../../api/config";
import uiText from "../../data/ui-text";
import requestCitizenEvents from "../../api/requestCitizenEvents";


// Search Dropdown Component

const SearchDropdown = ({ configureAPI, toggleDate, toggleLanguage, searchText, results, updatePrimaryLocation, updateAdditionalLocation, updatePrimaryLocationDispatch, updateAdditionalLocationDispatch, addingLocation, clickHandler, changeLocationPreference, updatePluviometerData, updatePluviometerDataDispatch, removePluviometerDataDispatch, updateFloodData, updateFloodDataDispatch, removeFloodDataDispatch, updateCitizenEventsRainfallData, updateCitizenEventsRainfallDataDispatch, removeCitizenRainfallEventsDataDispatch }) => {

    const { promiseInProgress } = usePromiseTracker({area: "search-result", delay: 0});

    const handleClick = (item) => {

        // Remove Pluviometer Data of Previous Primary Location
        const previousPrimary = updatePrimaryLocation.location;
        if (!addingLocation) {
            previousPrimary !== {} ? removePluviometerDataDispatch(updatePrimaryLocation.location['placeid']) : null
        }
        if (!addingLocation) {
            previousPrimary !== {} ? removeFloodDataDispatch(updatePrimaryLocation.location['placeid']) : null
        }
        if (!addingLocation) {
            previousPrimary !== {} ? removeCitizenRainfallEventsDataDispatch(updatePrimaryLocation.location['placeid']) : null
        }

        // Make Simple Geometry Request
        const requestURL = `${config[configureAPI.node_env['NODE_ENV']]}/dashboard/simplegeometry?id=${item['placeid']}`

        // Make this use promise tracker - This also is causing memory leaks in the application
        // ============
        // Request for simple Geometry
        // ============

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

        // ============
        // PLUVIOMETERS
        // ============

        const API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/pluviometers?id=${item['placeid']}&startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`

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


        // ============
        // FLOODZONES
        // ============

        const FLOODZONES_API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/floodzones?id=${item['placeid']}`

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

        // ============
        // CITIZEN DATA - RAINFALL EVENTS
        // ============

        // Make Request for Citizen Rainfall Events
        // PARAMS - locationID, formType, startDate, endDate, locationName, configureAPI, existingDataArray, dispatchFunction
        requestCitizenEvents(item['placeid'], 9, toggleDate.startDate, toggleDate.endDate, item['placename'], configureAPI, updateCitizenEventsRainfallData, updateCitizenEventsRainfallDataDispatch)

    }


    const displayMode = Boolean(searchText) ? `block`: `none`;

    // Check that search result is not already loaded
    const existingLocationIDs = updatePrimaryLocationDispatch?.location !== {} ? [updatePrimaryLocation.location['placeid']] : [];
    updateAdditionalLocation?.locations?.length ? updateAdditionalLocation.locations.forEach(function(item) {
        existingLocationIDs.push(item['placeid'])
    }) : null

        return (
            <MyList sx={{display: displayMode}} disablePadding >

                {(!promiseInProgress) ? results?.data?.responseData?.array_to_json ? results['data']['responseData']['array_to_json'].map((searchResult, index) => {

                    return (

                        !existingLocationIDs.includes(searchResult['placeid']) ? <div key={index}>
                            <Divider/>
                            <Link href="/location" scroll={false}>
                                <ListItemButton onClick={() => handleClick(searchResult)}>
                                    <MyListItem disablePadding>
                                        <LocationName>{searchResult['placename']}</LocationName>
                                        <DetailsBox>
                                            <HasCitizenDataText>{searchResult['hascitizendata'] ? "": uiText.global.labels.hasNoCitizenData[toggleLanguage.language]}</HasCitizenDataText>
                                            <LocationBox locationName={locationPaths[searchResult['placetype']].text}/>
                                        </DetailsBox>
                                    </MyListItem>
                                </ListItemButton>
                            </Link>
                        </div> : null

                    )

                }): <></> : (
                    <div>
                        <Divider/>
                        <ListItemButton >
                            <MyListItem disablePadding>
                                <SearchTextSkeleton variant={"rectangle"} width={`50%`} height={`20px`}/>
                                <LocationBoxSkeleton variant={"rectangle"} width={`10%`} height={`20px`}/>
                            </MyListItem>
                        </ListItemButton>
                        <Divider/>
                        <ListItemButton >
                            <MyListItem disablePadding>
                                <SearchTextSkeleton variant={"rectangle"} width={`50%`} height={`20px`}/>
                                <LocationBoxSkeleton variant={"rectangle"} width={`10%`} height={`20px`}/>
                            </MyListItem>
                        </ListItemButton>
                        <Divider/>
                        <ListItemButton >
                            <MyListItem disablePadding>
                                <SearchTextSkeleton variant={"rectangle"} width={`50%`} height={`20px`}/>
                                <LocationBoxSkeleton variant={"rectangle"} width={`10%`} height={`20px`}/>
                            </MyListItem>
                        </ListItemButton>
                    </div>
                    )}
            </MyList>
        );
}

const MyList = styled(List)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    maxHeight: `290px`,
    zIndex: `700`,
    width: `100%`,

}))

const MyListItem = styled(ListItem)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    minHeight: `40px`,
    width: `100%`,
}))


const DetailsBox = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`

}))

const LocationName = styled(Typography)(({theme}) => ({
    color: `#686363`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },

}))

const HasCitizenDataText = styled(Typography)(({theme}) => ({
    color: `#686363`,
    fontSize: `12px`,
    marginRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`,
    },

}))

const SearchTextSkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
}))

const LocationBoxSkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
}))


const mapDispatchToProps = (dispatch) => {
    return {
        updatePrimaryLocationDispatch: bindActionCreators(updatePrimaryLocation, dispatch),
        updateAdditionalLocationDispatch: bindActionCreators(updateAdditionalLocation, dispatch),
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
        updatePluviometerDataDispatch: bindActionCreators(updatePluviometerData, dispatch),
        removePluviometerDataDispatch: bindActionCreators(removePluviometerData, dispatch),
        updateFloodDataDispatch: bindActionCreators(updateFloodZonesData, dispatch),
        removeFloodDataDispatch: bindActionCreators(removeFloodZonesData, dispatch),
        updateCitizenEventsRainfallDataDispatch: bindActionCreators(updateCitizenRainfallEventsData, dispatch),
        removeCitizenRainfallEventsDataDispatch: bindActionCreators(removeCitizenRainfallEventsData, dispatch),
    }
}



export default connect((state) => state, mapDispatchToProps)(SearchDropdown)