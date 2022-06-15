// Dropdown List to Render on Search Input

// Package Imports
import {connect} from "react-redux";
import {List, ListItem, Divider, ListItemButton, styled, Skeleton, Typography, Box} from "@mui/material";
import {bindActionCreators} from "redux";
import Link from 'next/link';
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import { useRouter } from "next/router";

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
    removeCitizenRainfallEventsData,
    updateCitizenFloodZonesEventsData,
    removeCitizenFloodZonesEventsData,
    updateCitizenRiverFloodEventsData,
    removeCitizenRiverFloodEventsData
} from "../../store/actions";
import locationPaths from "../../data/locationPaths";
import config from "../../api/config";
import uiText from "../../data/ui-text";
import requestCitizenEvents from "../../api/requestCitizenEvents";
import requestSimpleGeometry from "../../api/requestSimpleGeometry";
import requestPluviometerData from "../../api/requestPluviometerData";
import requestFloodZonesData from "../../api/requestFloodZonesData";


// Search Dropdown Component

const SearchDropdown = ({ configureAPI, toggleDate, toggleLanguage, searchText, results, updatePrimaryLocation, updateAdditionalLocation, updatePrimaryLocationDispatch, updateAdditionalLocationDispatch, addingLocation, clickHandler, changeLocationPreference, updatePluviometerData, updatePluviometerDataDispatch, removePluviometerDataDispatch, updateFloodData, updateFloodDataDispatch, removeFloodDataDispatch, updateCitizenEventsRainfallData, updateCitizenEventsRainfallDataDispatch, removeCitizenRainfallEventsDataDispatch, updateCitizenEventsFloodZonesData, updateCitizenFloodZonesEventsDataDispatch, removeCitizenFloodZonesEventsDataDispatch, updateCitizenEventsRiverFloodData, updateCitizenRiverFloodEventsDataDispatch, removeCitizenRiverFloodEventsDataDispatch }) => {

    const { promiseInProgress } = usePromiseTracker({area: "search-result", delay: 0});

    const router = useRouter();

    const handleClick = (item) => {

        // Remove Data of Previous Primary Location
        const previousPrimary = updatePrimaryLocation.location;

        if (!addingLocation) {
            previousPrimary !== {} ? removePluviometerDataDispatch(updatePrimaryLocation.location['placeid']) : null
            previousPrimary !== {} ? removeFloodDataDispatch(updatePrimaryLocation.location['placeid']) : null
            previousPrimary !== {} ? removeCitizenRainfallEventsDataDispatch(updatePrimaryLocation.location['placeid']) : null
            previousPrimary !== {} ? removeCitizenFloodZonesEventsDataDispatch(updatePrimaryLocation.location['placeid']) : null
            previousPrimary !== {} ? removeCitizenRiverFloodEventsDataDispatch(updatePrimaryLocation.location['placeid']) : null
        }

        // =========
        // ROUTER
        // =========

        if (!addingLocation) {
            router.push(`/location?name=${item['placename']}&id=${item['placeid']}`)
        }

        // =========
        // IF ADDING LOCATION - HANDLE API REQUESTS IN DROPDOWN CLICK
        // =========
        else {

            console.log("Requests made in Search Dropdown")

            // Make Request for Simple Geometry
            requestSimpleGeometry(item, configureAPI, addingLocation, clickHandler, changeLocationPreference, updatePrimaryLocationDispatch, updateAdditionalLocationDispatch);

            // Make Request for Pluviometer Data
            requestPluviometerData(item, toggleDate, configureAPI, updatePluviometerData, updatePluviometerDataDispatch)

            // Make Request for FloodZones Data
            requestFloodZonesData(item, configureAPI, updateFloodData, updateFloodDataDispatch)

            // Make Request for Citizen Rainfall Events
            requestCitizenEvents(item['placeid'], 9, toggleDate.startDate, toggleDate.endDate, item['placename'], configureAPI, updateCitizenEventsRainfallData, updateCitizenEventsRainfallDataDispatch)

            // Make Request for Citizen FloodZones Events
            requestCitizenEvents(item['placeid'], 10, toggleDate.startDate, toggleDate.endDate, item['placename'], configureAPI, updateCitizenEventsFloodZonesData, updateCitizenFloodZonesEventsDataDispatch)

            // Make Request for Citizen RiverFlood Events
            requestCitizenEvents(item['placeid'], 11, toggleDate.startDate, toggleDate.endDate, item['placename'], configureAPI, updateCitizenEventsRiverFloodData, updateCitizenRiverFloodEventsDataDispatch)
        }
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
                                <ListItemButton onClick={() => handleClick(searchResult)}>
                                    <MyListItem disablePadding>
                                        <LocationName>{searchResult['placename']}</LocationName>
                                        <DetailsBox>
                                            <HasCitizenDataText>{searchResult['hascitizendata'] ? "": uiText.global.labels.hasNoCitizenData[toggleLanguage.language]}</HasCitizenDataText>
                                            <LocationBox locationName={locationPaths[searchResult['placetype']].text}/>
                                        </DetailsBox>
                                    </MyListItem>
                                </ListItemButton>
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
    textAlign: `right`,
    marginRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`,
    },
    [theme.breakpoints.down('sm')]: {
        display: `none`
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
        updateCitizenFloodZonesEventsDataDispatch: bindActionCreators(updateCitizenFloodZonesEventsData, dispatch),
        removeCitizenFloodZonesEventsDataDispatch: bindActionCreators(removeCitizenFloodZonesEventsData, dispatch),
        updateCitizenRiverFloodEventsDataDispatch: bindActionCreators(updateCitizenRiverFloodEventsData, dispatch),
        removeCitizenRiverFloodEventsDataDispatch: bindActionCreators(removeCitizenRiverFloodEventsData, dispatch)
    }
}

export default connect((state) => state, mapDispatchToProps)(SearchDropdown)