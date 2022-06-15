// Search Component to Trigger and Control Location Searches

// Package Imports
import {connect} from "react-redux";
import React from "react";
import {InputAdornment, FormControl, TextField, IconButton, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {trackPromise} from "react-promise-tracker";

// Local Imports
import uiText from "../../data/ui-text";
import SearchDropdown from "./searchDropdown";
import { makeSearch } from "../../api/makeSearch";
import config from "../../api/config";
import {bindActionCreators} from "redux";
import {changeSearchTerm} from "../../store/actions";

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
        this._handleSearchResultWindowOpen = this._handleSearchResultWindowOpen.bind(this);
    }

    _handleSearchResultWindowOpen(e) {

        if ((this.state.searchTerm !== "") && (this.state.searchTerm !== undefined)) {
            this.props.iconClickHandler();
            this.props.searchTermDispatch(this.state.searchTerm);
            // Update the state with an empty search term
            this.setState({searchTerm: ""})
        } else {
            this.setState({placeholder: uiText.global.labels.enterALocation[this.props.language]})
        }
    }

    _handleKeyDown(e) {

        // Trigger Search on Enter
        if (e.key === "Enter") {
            this._handleSearchResultWindowOpen(e);
        }
    }

    _handleChange = async searchTerm => {

        // Update the state with the search term
        this.setState({searchTerm: searchTerm})

        this.setState({
            loading: true
        });

        if((searchTerm) && (this.state.searchTerm !== searchTerm)) {
            // Trigger a live search with the search term
            this.liveSearch(searchTerm);

        }
    }

    _clickHandler(item) {
        this.setState({searchTerm: "", placeholder: item['placename']})
        document.querySelector('#search-bar').value = ""
    }

    get renderSearchResults() {
        return <SearchDropdown loading={this.state.loading} addingLocation={this.props.addingLocation} searchText={this.state.searchTerm} results={this.state.liveSearchResults} clickHandler={this._clickHandler}/>;
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
            <MyFormControl
                sx={theme => ({
                    width: this.props.popover ? `80%` : `60%`,
                    [theme.breakpoints.down('md')] : {
                        width: this.props.popover ? `80%` : `80%`,
                    },
                    [theme.breakpoints.down('sm')] : {
                        width: this.props.popover ? `100%` : `80%`,
                    }
                })}
                variant="standard" >
                <MyTextField autoComplete="off" InputProps={{

                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit" aria-label="search" onClick={(e) =>this._handleSearchResultWindowOpen(e)}>
                                <SearchIcon style={{ fill: `#2196F3` }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                             id="search-bar"
                             variant={'outlined'}
                             onInput={(e) => this._handleChange(e.target.value)}
                             onKeyDown={(e) => this._handleKeyDown(e)}
                             label={this.props.searchPlaceholder ? this.props.searchPlaceholder : uiText.global.labels.searchPlaceholder[this.props.language]}
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

const mapDispatchToProps = (dispatch) => {
    return {
        searchTermDispatch: bindActionCreators(changeSearchTerm, dispatch),
    }
}


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



export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)