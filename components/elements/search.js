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

// Search Component

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            loading: false,
            liveSearchResults: null
        };

        this._handleChange = this._handleChange.bind(this);
        this.liveSearch = this.liveSearch.bind(this);
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

    get renderSearchResults() {

        let searchDropdown;

        if (this.state.liveSearchResults?.data?.responseData?.array_to_json) {
            // Set the search dropdown to display results
            searchDropdown = <SearchDropdown searchText={this.state.searchTerm} results={this.state.liveSearchResults}/>
        } else {
            // Set the search dropdown to display an empty span
            searchDropdown = <span></span>;
        }

        return searchDropdown;
    }

    async liveSearch(searchValue) {


        // setResults(dummySearchData.filter(item => item['location'].includes(e.target.value)))
        const searchPromise = await makeSearch(
            `http://0.0.0.0:9090/dashboard/search?value=${searchValue}`
        );

        const liveSearchResults = await searchPromise;

        this.setState({
            liveSearchResults,
            loading: false
        });

    }

    render() {
        return (
            <MyFormControl variant="standard" >
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
                             placeholder={uiText.global.labels.searchPlaceholder[this.props.language]}
                             size="small"/>

                {this.renderSearchResults}

            </MyFormControl>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.toggleLanguage.language
    };
};


// const Search = ({ toggleLanguage }) => {
//
//     const [searchText, setSearch] = useState("");
//     const [results, setResults] = useState([]);
//
//     const handleInput = (e) => {
//         setSearch(e.target.value)
//         if (e.target.value) {
//             liveSearch(e)
//         }
//     }
//
//     async function liveSearch(e) {
//
//         // console.log(e.target.value)
//
//         // setResults(dummySearchData.filter(item => item['location'].includes(e.target.value)))
//         const searchPromise = await makeSearch(
//             `http://0.0.0.0:9090/dashboard/search?value=${e.target.value}`
//         );
//
//         const liveSearchResults = await searchPromise;
//         const responseData = liveSearchResults ? liveSearchResults['data']['responseData'] : false
//
//         if ((responseData) && (liveSearchResults['data']['responseData'] !== 'No Data')) {
//
//             if (liveSearchResults['data']['responseData']['array_to_json']) {
//                 setResults(liveSearchResults['data']['responseData']['array_to_json'])
//                 // console.log(liveSearchResults['data']['responseData']['array_to_json'])
//                 // console.log( "results", results)
//             }
//         } else {
//             setResults(null)
//             console.log("Executing")
//         }
//     }
//
//     return (
//         <MyFormControl variant="standard" >
//             <MyTextField autoComplete="off" InputProps={{
//
//                 endAdornment: (
//                     <InputAdornment position="end">
//                         <IconButton type="submit" aria-label="search">
//                             <SearchIcon style={{ fill: `#2196F3` }} />
//                         </IconButton>
//                     </InputAdornment>
//                 ),
//             }}
//            id="search-bar"
//            variant={'outlined'}
//            onInput={(e) => {handleInput(e)}}
//            label={uiText.global.labels.searchPlaceholder[toggleLanguage.language]}
//            placeholder={uiText.global.labels.searchPlaceholder[toggleLanguage.language]}
//            size="small"/>
//
//             <SearchDropdown searchText={searchText} results={results}/>
//
//         </MyFormControl>
//     );
// }

const MyFormControl = styled(FormControl)(({theme}) => ({
    marginTop: theme.spacing(6),
    width: `60%`,
    boxShadow: `0px 0px 15px rgba(33, 150, 243, 0.35)`,
    border: `1px solid #E5E5E5`,
    borderRadius: theme.shape.borderRadius,
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



export default connect(mapStateToProps)(Search)