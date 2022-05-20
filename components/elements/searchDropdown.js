// Dropdown List to Render on Search Input

// Package Imports
import {connect} from "react-redux";
import {List, ListItem, Divider, ListItemText, ListItemButton, styled} from "@mui/material";
import {bindActionCreators} from "redux";
import Link from 'next/link';
import axios from "axios";
import {trackPromise} from "react-promise-tracker";

// Local Imports
import LocationBox from "./locationBox";
import {updatePrimaryLocation, updateAdditionalLocation, changeLocationPreference, updatePluviometerData} from "../../store/actions";
import locationPaths from "../../data/locationPaths";
import uiText from "../../data/ui-text";
import config from "../../api/config";

// Search Dropdown Component

const SearchDropdown = ({ loading, configureAPI, toggleDate, toggleLanguage, searchText, results, updatePrimaryLocation, updateAdditionalLocation, updateAdditionalLocationDispatch, addingLocation, clickHandler, changeLocationPreference, updatePluviometerData, updatePluviometerDataDispatch }) => {


    const handleClick = (item) => {

        // Make Simple Geometry Request
        const requestURL = `${config[configureAPI.node_env['NODE_ENV']]}/dashboard/simplegeometry?id=${item['placeid']}`

        // Make this use promise tracker - This also is causing memory leaks in the application
        // Request for simple Geometry
        axios.get(requestURL)
            .then(res => {
                addingLocation ? updateAdditionalLocationDispatch(res.data.responseData.array_to_json[0]) : updatePrimaryLocation(res.data.responseData.array_to_json[0]);
                !addingLocation ? changeLocationPreference(res.data.responseData.array_to_json[0]['placename'], res.data.responseData.array_to_json[0]['placeid']) : null;
                clickHandler(item);
            })
            .catch(err => {
                console.log("An error occurred", err)
            })

        // Make requests for Additional Location Data - If addingLocation
        // PLUVIOMETERS
        const API_URL = `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/pluviometers?id=${item['placeid']}&startDate=${toggleDate.startDate}&endDate=${toggleDate.endDate}`

        // Check if Pluviometer Data already exists for this location and if existing timestamp is sufficient
        const filteredPluviometerData = updatePluviometerData.locations.length ? updatePluviometerData.locations.filter(function(location){

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
            ,"pluviometer-data") : null
    }

    const displayMode = Boolean(searchText) ? `block`: `none`;

        return (
            <MyList sx={{display: displayMode}} disablePadding >

                {results?.data?.responseData?.array_to_json ? results['data']['responseData']['array_to_json'].map((searchResult, index) => {

                    return (

                        <div  key={index}>
                            <Divider/>
                            <Link href="/location" scroll={false}>
                                <ListItemButton onClick={() => handleClick(searchResult)}>
                                    <MyListItem disablePadding>
                                        <LocationName primary={searchResult['placename']} />
                                        <LocationBox locationName={locationPaths[searchResult['placetype']].text} />
                                    </MyListItem>
                                </ListItemButton>
                            </Link>
                        </div>

                    )

                }): (
                    <div>
                        <Divider/>
                        <ListItemButton >
                            <MyListItem disablePadding>
                                <em>{loading ? uiText.global.labels.loadingResults[toggleLanguage.language] : uiText.global.labels.noDataFound[toggleLanguage.language]}</em>
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

}))

const MyListItem = styled(ListItem)(({theme}) => ({
    display: `flex`
}))

const LocationName = styled(ListItemText)(({theme}) => ({
    color: `#686363`
}))


const mapDispatchToProps = (dispatch) => {
    return {
        updatePrimaryLocation: bindActionCreators(updatePrimaryLocation, dispatch),
        updateAdditionalLocationDispatch: bindActionCreators(updateAdditionalLocation, dispatch),
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
        updatePluviometerDataDispatch: bindActionCreators(updatePluviometerData, dispatch),
    }
}



export default connect((state) => state, mapDispatchToProps)(SearchDropdown)