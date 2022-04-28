// Dropdown List to Render on Search Input

// Package Imports
import {connect} from "react-redux";
import {List, ListItem, Divider, ListItemText, ListItemButton, styled} from "@mui/material";
import {bindActionCreators} from "redux";
import Link from 'next/link';

// Local Imports
import LocationBox from "./locationBox";
import {updatePrimaryLocation} from "../../store/actions";
import locationPaths from "../../data/locationPaths";

// Search Dropdown Component

const SearchDropdown = ({ searchText, results, updatePrimaryLocation }) => {

    const handleClick = (item) => {
        updatePrimaryLocation(item)
    }

    const displayMode = Boolean(searchText) ? `block`: `none`



        return (
            <MyList sx={{display: displayMode}} disablePadding >

                {results?.data?.responseData?.array_to_json ? results['data']['responseData']['array_to_json'].map((searchResult, index) => {

                    return (

                        <div  key={index}>
                            <Divider/>
                            <Link href="/location">
                                <ListItemButton onClick={() => handleClick(searchResult)}>
                                    <MyListItem disablePadding>
                                        <LocationName primary={searchResult['placename']} />
                                        <LocationBox locationName={locationPaths[searchResult['placetype']].text} />
                                    </MyListItem>
                                </ListItemButton>
                            </Link>
                        </div>

                    )

                }): <span></span>}

                {/*{ results.map((item, index) => {*/}
                {/*    return (*/}
                {/*        <div  key={index}>*/}
                {/*            <Divider/>*/}
                {/*            <Link href="/location">*/}
                {/*                <ListItemButton onClick={() => handleClick(item)}>*/}
                {/*                    <MyListItem disablePadding>*/}
                {/*                        <LocationName primary={item['placename']} />*/}
                {/*                        /!*<LocationBox locationName={item.type} />*!/*/}
                {/*                    </MyListItem>*/}
                {/*                </ListItemButton>*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
            </MyList>
        );
}

const MyList = styled(List)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    maxHeight: `290px`,
    overflow: `scroll`

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
    }
}



export default connect((state) => state, mapDispatchToProps)(SearchDropdown)