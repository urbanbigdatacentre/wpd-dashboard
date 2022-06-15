// Component to Takeover Screen with Adding Location Popover

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Container, Typography, Divider, Alert, AlertTitle, IconButton} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {useEffect, useState} from "react";


// Local Imports
import uiText from "../../data/ui-text";
import SearchBar from "./searchBar";
import {locationColorKeys} from "../../data/colorMapping";
import LocationControlButton from "./locationControlButton";
import SearchResults from "./searchResults";

// Adding Location Window Component
const AddingLocationWindow = ({ toggleLanguage, updateAdditionalLocation, updatePrimaryLocation, addingLocationStatusHandler, changingLocation }) => {

    const threshold = locationColorKeys.length;

    const [thresholdReached, setThresholdReached] = useState(false);

    useEffect(() => {
        updateAdditionalLocation.locations.length >= threshold ? setThresholdReached(true) : setThresholdReached(false)
    }, [updateAdditionalLocation.locations.length, threshold])

    const [searchResultStatus, setSearchResultStatus] = useState();

    const handleSearchClick = (e) => {
        setSearchResultStatus(true);
    }

    const handleSearchClose = (e) => {
        setSearchResultStatus(false);
    }

    useEffect(() => {
        const window = document.querySelector('.search-results-window-overlay')
        if (window) { window.addEventListener('click', function() {setSearchResultStatus(false);})}
        const windowBelow = document.querySelector('.window-overlay')
        if (windowBelow) { windowBelow.addEventListener('click', function() {addingLocationStatusHandler();})}
    })


    const returnPopoverLayout = () => {
        if (thresholdReached) {
            return (
                <>
                    <MyAlert severity={"info"}>
                        <AlertTitle sx={{textAlign: `left`}}>{uiText.global.labels.tooManyLocationsTitle[toggleLanguage.language]}</AlertTitle>
                        <Typography sx={{textAlign: `left`}}>{uiText.global.labels.tooManyLocationsDescription[toggleLanguage.language]}</Typography>
                    </MyAlert>
                </>
            )
        } else {
            return (
                <>
                    <SearchBar iconClickHandler={handleSearchClick} addingLocation={!changingLocation} popover={true}/>
                </>
            )
        }
    }


    return (
        <AddingLocationWindowContainer >
            {searchResultStatus ? <></> : <WindowOverlay className={"window-overlay"}/>}
            {searchResultStatus ? <SearchResults addingLocation={!changingLocation} searchResultsPopoverStatusHandler={handleSearchClose}/> :
            <PopoverBox>
                <MyCancelIconButton onClick={addingLocationStatusHandler}>
                    <CancelIcon color={"primary"}/>
                </MyCancelIconButton>
                <Typography variant={'h5'} sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{changingLocation ? uiText.global.labels.changeLocation[toggleLanguage.language].toUpperCase() : uiText.global.labels.addNewLocation[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                {returnPopoverLayout()}
                <SelectedLocationsBox>
                    <Typography sx={{paddingBottom: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.selectedLocations[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                    <Divider sx={{width: `100%`}}/>
                    <LocationControlBox>
                        <LocationButtonLayoutBox>
                            <LocationControlButton primary={true} data={updatePrimaryLocation.location} contained={false} color={'#2196F3'}/>
                        </LocationButtonLayoutBox>
                        {updateAdditionalLocation.locations.length > 0 ? updateAdditionalLocation.locations.map((item, index) => {

                            return (
                                <LocationButtonLayoutBox key={index}>
                                    <LocationControlButton primary={false} data={item} contained={false} color={locationColorKeys[index].color}/>
                                </LocationButtonLayoutBox>
                            )
                        }) : null}
                    </LocationControlBox>
                </SelectedLocationsBox>
            </PopoverBox> }
        </AddingLocationWindowContainer>
    );
}

const AddingLocationWindowContainer = styled(Container)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    left: `0`,
    width: `100vw`,
    height: `100%`,
    maxWidth: `100vw`,
    justifyContent: `center`,
    overflow: `hidden`
}))

const WindowOverlay = styled(Box)(({theme}) => ({
    position: `fixed`,
    top: `0`,
    right: `0`,
    opacity: `.5`,
    zIndex: `3000`,
    width: `100vw`,
    maxWidth: `100vw`,
    height: `100%`,
    backgroundColor: `#888888`,
}))


const PopoverBox = styled(Box)(({theme}) => ({
    position: `fixed`,
    top: `20%`,
    left: `auto`,
    right: `auto`,
    textAlign: `center`,
    opacity: `1`,
    zIndex: `3001`,
    width: `55%`,
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
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: `600px`,
        minWidth: `450px`,
        padding: theme.spacing(3),
        paddingTop: theme.spacing(6),
    },
    [theme.breakpoints.down('480')]: {
        maxWidth: `300px`,
        minWidth: `350px`,
    },
}))

const SelectedLocationsBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    zIndex: `500`,
    top: 200,
    right: theme.spacing(6),
    left: theme.spacing(6),
    width: `auto`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    paddingTop: theme.spacing(6),
}))

const MyAlert = styled(Alert)(({theme}) => ({
    marginTop: theme.spacing(4)
}))

const LocationControlBox = styled(Box)(({theme}) => ({
    padding: `0px 0 20px 0`,
    display: `flex`,
    flexWrap: `wrap`,
    gap: `5px 20px`,
    width: `100%`,
}))

const LocationButtonLayoutBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2.5),
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

export default connect((state) => state)(AddingLocationWindow)