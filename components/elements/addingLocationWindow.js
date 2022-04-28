// Component to Takeover Screen with Adding Location Popover

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Container, Typography} from "@mui/material";

// Local Imports
import uiText from "../../data/ui-text";
import Search from "./search";

// AddingLocationWindow Component

const AddingLocationWindow = ({ toggleLanguage }) => {
    return (
        <AddingLocationWindowContainer >
            <WindowOverlay className={"window-overlay"}/>
            <PopoverBox>
                <Typography variant={'h5'} sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.addNewLocation[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></Typography>
                <Search />
            </PopoverBox>
        </AddingLocationWindowContainer>
    );
}

const AddingLocationWindowContainer = styled(Container)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    width: `100vw`,
    height: `100vh`,
    justifyContent: `centre`
}))

const WindowOverlay = styled(Box)(({theme}) => ({
    position: `fixed`,
    top: `0`,
    right: `0`,
    opacity: `.5`,
    zIndex: `3000`,
    width: `100vw`,
    height: `100vh`,
    backgroundColor: `#888888`,
}))


const PopoverBox = styled(Box)(({theme}) => ({
    position: `fixed`,
    marginLeft: `auto`,
    marginRight: `auto`,
    top: `25%`,
    left: 0,
    right: 0,
    textAlign: `center`,
    opacity: `1`,
    zIndex: `3001`,
    width: `55%`,
    minHeight: `50%`,
    borderRadius: theme.shape.borderRadius,
    filter: `drop-shadow(0px 0px 15px rgba(33, 150, 243, 0.35))`,
    border: `1.5px solid #2196F3`,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
}))

export default connect((state) => state)(AddingLocationWindow)