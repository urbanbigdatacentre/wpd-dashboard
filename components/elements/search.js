// Search Component to Trigger and Control Location Searches

// Package Imports
import {connect} from "react-redux";
import React from "react";
import {InputAdornment, FormControl, TextField, IconButton, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/search';
import {useState} from "react";
import axios from "axios";

// Local Imports
import uiText from "../../data/ui-text";
import SearchDropdown from "./searchDropdown";
import { makeSearch } from "../../api/makeSearch";
import config from "../../api/config";

// Search Component

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            loading: false,
            liveSearchResults: null,
            placeholder: uiText.global.labels.searchPlaceholder[this.props.language],
        };

        this._handleChange = this._handleChange.bind(this);
        this.liveSearch = this.liveSearch.bind(this);
        this._clickHandler = this._clickHandler.bind(this);
    }

    _handleKeyDown(e) {
        // Trigger Search on Enter
        if (e.key === "Enter") {
            this._handleClick();
        }
    }

    _handleChange = async searchTerm => {

        if((searchTerm) && (this.state.searchTerm !== searchTerm)) {
            // Trigger a live search with the search term
            this.liveSearch(searchTerm);

        }

        // Update the state with the search term
        this.setState({searchTerm: searchTerm})


    }

    _clickHandler(item) {
        this.setState({searchTerm: "", placeholder: item['placename']})
        document.querySelector('#search-bar').value = ""
    }

    get renderSearchResults() {
        return <SearchDropdown addingLocation={this.props.addingLocation} searchText={this.state.searchTerm} results={this.state.liveSearchResults} clickHandler={this._clickHandler}/>;;
    }

    async liveSearch(searchValue) {

        const searchPromise = await makeSearch(
            `${config[this.props.node_env['NODE_ENV']]}/dashboard/search?value=${searchValue}`
        );

        const liveSearchResults = await searchPromise;

        this.setState({
            liveSearchResults,
            loading: false
        });

    }

    render() {
        return (
            <MyFormControl sx={{width: this.props.popover ? `80%` : `60%`}} variant="standard" >
                <MyTextField autoComplete="off" InputProps={{

                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon style={{ fill: `#2196F3` }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                             id="search-bar"
                             variant={'outlined'}
                             onInput={(e) => this._handleChange(e.target.value)}
                             label={uiText.global.labels.searchPlaceholder[this.props.language]}
                             placeholder={this.state.placeholder}
                             size="small"/>

                {this.renderSearchResults}

            </MyFormControl>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.toggleLanguage.language,
        node_env: state.configureAPI.node_env
    };
};


const MyFormControl = styled(FormControl)(({theme}) => ({
    marginTop: theme.spacing(6),
    boxShadow: `0px 0px 15px rgba(33, 150, 243, 0.35)`,
    border: `1px solid #E5E5E5`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
}))

const MyTextField = styled(TextField)(({theme}) => ({

    color: theme.palette.primary.main,
    fontSize: `14px`,

    '& label.Mui-focused': {
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, #FFFFFF 10%, #FFFFFF 90%, rgba(255, 255, 255, 0.25) 100%)`,
    },
    '& fieldset': {
        border: `none`
    }
}))



export default connect(mapStateToProps)(SearchBar)