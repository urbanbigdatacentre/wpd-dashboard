// Dropdown List to Render on Search Input

// Package Imports
import {connect} from "react-redux";
import {List, ListItem, Divider, ListItemText, ListItemButton, styled} from "@mui/material";
import {bindActionCreators} from "redux";
import Link from 'next/link';

// Local Imports
import LocationBox from "./locationBox";
import {updatePrimaryLocation, updateAdditionalLocation, changeLocationPreference} from "../../store/actions";
import locationPaths from "../../data/locationPaths";
import uiText from "../../data/ui-text";
import {useEffect} from "react";

// Search Dropdown Component

const SearchDropdown = ({ toggleLanguage, searchText, results, updatePrimaryLocation, updateAdditionalLocation, addingLocation, clickHandler, changeLocationPreference }) => {

    const handleClick = (item) => {

        addingLocation ? updateAdditionalLocation(item) : updatePrimaryLocation(item);
        !addingLocation ? changeLocationPreference(item['placename']) : null;
        clickHandler(item);
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
                                <em>{uiText.global.labels.noDataFound[toggleLanguage.language]}</em>
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
        updateAdditionalLocation: bindActionCreators(updateAdditionalLocation, dispatch),
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
    }
}



export default connect((state) => state, mapDispatchToProps)(SearchDropdown)