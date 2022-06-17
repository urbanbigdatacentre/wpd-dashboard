// Component used to render a list of search results appearing inside a popover layout


// Package Imports
import {connect} from "react-redux";
import {
    Box,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    styled,
    TextField,
    Typography,
    Button
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import uiText from "../../data/ui-text";
import SearchBar from "./searchBar";
import React, {useEffect, useState} from "react";
import {makeSearch} from "../../api/makeSearch";
import config from "../../api/config";
import SearchDropdown from "./searchDropdown";
import SearchIcon from "@mui/icons-material/Search";
import MyButton from "./button";

// Local Imports


// Search Results Popover

const SearchResultsPopover = ({toggleLanguage, searchResultsPopoverStatusHandler, setSearchTerm, configureAPI, addingLocation}) => {

    const [searchResults, setSearchResults] = useState(null);

    const searchLinkClickHandler = () => {
        document.querySelector('#search-bar').value = ""
    }

    useEffect(() => {
        fetchResults();
    })

    const fetchResults = async () => {
        const searchPromise = await makeSearch(
            `${config[configureAPI['node_env'].NODE_ENV]}/dashboard/search?value=${setSearchTerm.searchTerm}`
        );

        const results = await searchPromise;

        setSearchResults(results)
    }



    return (
      <SearchResultsWindowContainer>
          <SearchResultsWindowOverlay className={"search-results-window-overlay"} />
          <SearchResultsPopoverBox>
              <MyCancelIconButton onClick={searchResultsPopoverStatusHandler}>
                  <CancelIcon color={"primary"}/>
              </MyCancelIconButton>
              <WindowTitle variant={'h5'} sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.searchResults[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></WindowTitle>

              {
                  /*SPACE TO INSERT INPUT FIELD TO SHOW USER SEARCH QUERY*/
                  <Box>

                      <MyFormControl sx={{width: `60%`}} variant="standard" >
                          <MyTextField disabled={true} autoComplete="off"
                                       InputProps={{

                              endAdornment: (
                                  <InputAdornment position="end">
                                      <Button text={uiText.global.labels.backToSearch[toggleLanguage.language]} variant={"text"} type="submit" aria-label="search" onClick={searchResultsPopoverStatusHandler}>
                                          <BackToSearchButtonText sx={{fontWeight: (theme) => (theme.typography.fontWeightBold), fontSize: `14px`}}>{uiText.global.labels.backToSearch[toggleLanguage.language]}</BackToSearchButtonText>
                                      </Button>
                                  </InputAdornment>
                              ),
                          }}
                                       id="search-bar"
                                       variant={'outlined'}
                                       placeholder={setSearchTerm.searchTerm}
                                       size="small"/>

                      </MyFormControl>
                  </Box>
              }

              <LocationItemsBox>
                  <Typography sx={{paddingBottom: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.selectedALocation[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                  <Divider sx={{width: `100%`}}/>
                  {/*INSERT SPACE TO RENDER SEARCH RESULTS LIST*/}

                  {/*MAKE SURE DROPDOWN KNOWS WHETHER ADDING LOCATION IS TRUE*/}

                  {searchResults?.data?.responseData !== "No data" ?<SearchDropdown addingLocation={addingLocation} searchText={setSearchTerm.searchTerm} results={searchResults} clickHandler={searchLinkClickHandler}/> : <Box sx={{marginTop: (theme) => (theme.spacing(4))}}>
                      <NoResultsTitle sx={{textAlign: `left`, fontWeight: (theme) => (theme.typography.fontWeightBold)}} variant={'h5'}>{uiText.global.labels.hM[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>...</span></NoResultsTitle>
                      <NoResultsSorry sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(1)), textAlign: `left`, fontSize: `18px`, fontWeight: (theme) => (theme.typography.fontWeightLight)}} >{uiText.global.labels.noResultsFound[toggleLanguage.language]}<Typography display={"inline"} sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{"'" + setSearchTerm.searchTerm + "'. "}</Typography></NoResultsSorry>
                      <NoResultsCheck sx={{textAlign: `left`, fontSize: `16px`, fontWeight: (theme) => (theme.typography.fontWeightLight)}} >{uiText.global.labels.checkYourSearch[toggleLanguage.language]}</NoResultsCheck>
                  </Box>}

              </LocationItemsBox>
          </SearchResultsPopoverBox>
      </SearchResultsWindowContainer>
    );
}

const NoResultsTitle = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: `18px`,
    },
}))

const NoResultsSorry = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: `16px`,
    },
}))

const NoResultsCheck = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`,
    },
}))

const BackToSearchButtonText = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`,
    },
}))

const SearchResultsWindowContainer = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    width: `100%`,
    height: `100%`,
    maxWidth: `100vw`,
    left: `0`,
    justifyContent: `center`
}))

const SearchResultsWindowOverlay = styled(Box)(({theme}) => ({
    position: `fixed`,
    top: `0`,
    right: `0`,
    opacity: `.5`,
    zIndex: `3000`,
    width: `100%`,
    height: `100%`,
    backgroundColor: `#888888`,
}))

const SearchResultsPopoverBox = styled(Box)(({theme}) => ({
    position: `fixed`,
    marginLeft: `auto`,
    marginRight: `auto`,
    top: `20%`,
    left: 0,
    right: 0,
    textAlign: `center`,
    opacity: `1`,
    zIndex: `3001`,
    width: `55%`,
    height: `auto`,
    maxWidth: `1000px`,
    minWidth: `700px`,
    minHeight: `600px`,
    borderRadius: theme.shape.borderRadius,
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.35))`,
    border: `1.5px solid #2196F3`,
    padding: theme.spacing(6),
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down('md')]: {
        maxWidth: `600px`,
        minWidth: `550px`,
        padding: theme.spacing(4),
        top: `10%`,
        bottom: `50%`,
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: `600px`,
        minWidth: `450px`,
        minHeight: `570px`,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(6),
        top: `10%`,
    },
    [theme.breakpoints.down('480')]: {
        maxWidth: `300px`,
        minWidth: `350px`,
    },

}))


const MyCancelIconButton = styled(IconButton)(({theme}) => ({
    position: `absolute`,
    zIndex: 1000,
    opacity: 1,
    top: -10,
    left: -10,
    height: `auto`,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0.25)
}))

const WindowTitle = styled(Typography)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: `20px`,
    },
}))

const LocationItemsBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    zIndex: `500`,
    top: 250,
    right: theme.spacing(6),
    left: theme.spacing(6),
    width: `auto`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    [theme.breakpoints.down('md')]: {
        right: theme.spacing(4),
        left: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
        right: theme.spacing(2),
        top: 220,
        left: theme.spacing(2),
    },
}))


const MyFormControl = styled(FormControl)(({theme}) => ({
    marginTop: theme.spacing(6),
    boxShadow: `0px 0px 15px rgba(33, 150, 243, 0.35)`,
    border: `1px solid #E5E5E5`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down('lg')]: {
        width: `85%`,
    },
    [theme.breakpoints.down('sm')]: {
        width: `100%`,
    },

}))

const MyTextField = styled(TextField)(({theme}) => ({
    color: theme.palette.primary.main,
    fontSize: `14px`,


    '& label.Mui-focused': {
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, #FFFFFF 10%, #FFFFFF 90%, rgba(255, 255, 255, 0.25) 100%)`,
    },
    '& fieldset': {
        border: `none`
    },
    '&::placeholder': {
        color: `#161616`
    },

}))

export default connect((state) => state)(SearchResultsPopover);