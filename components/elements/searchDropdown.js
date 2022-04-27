// Dropdown List to Render on Search Input

// Package Imports
import {connect} from "react-redux";
import {List, ListItem, Divider, ListItemText, styled} from "@mui/material";

// Local Imports

// Search Dropdown Component

const SearchDropdown = ({ toggleLanguage }) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={"Hello World"} />
            </ListItem>
            <Divider/>
        </List>
    );
}





export default connect((state) => state)(SearchDropdown)