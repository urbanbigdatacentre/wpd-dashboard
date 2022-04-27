// Search Component to Trigger and Control Location Searches

// Package Imports
import {connect} from "react-redux";
import {InputAdornment, FormControl, TextField, IconButton, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/search';

// Local Imports
import uiText from "../../data/ui-text";
import SearchDropdown from "./searchDropdown";

// Search Component

const Search = ({ toggleLanguage }) => {
    return (
        <MyFormControl variant="standard" >
            <MyTextField InputProps={{
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
           onInput={(e) => {console.log(e.target.value)}}
           label={uiText.global.labels.searchPlaceholder[toggleLanguage.language]}
           placeholder={uiText.global.labels.searchPlaceholder[toggleLanguage.language]}
           size="small"/>

            <SearchDropdown/>

        </MyFormControl>
    );
}

const MyFormControl = styled(FormControl)(({theme}) => ({
    marginTop: theme.spacing(6),
    width: `60%`,
}))

const MyTextField = styled(TextField)(({theme}) => ({
    color: theme.palette.primary.main,
    boxShadow: `0px 0px 15px rgba(33, 150, 243, 0.35)`,
    fontSize: `14px`,
    borderRadius: theme.shape.borderRadius,
    '& label.Mui-focused': {
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, #FFFFFF 10%, #FFFFFF 90%, rgba(255, 255, 255, 0.25) 100%)`,
    },
}))



export default connect((state) => state)(Search)