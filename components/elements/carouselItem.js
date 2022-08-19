// Individual Item to be used inside Citizen Carousel Component


// Package Imports
import {Box, Container, styled, Typography} from "@mui/material";
import Image from 'next/image';
import {connect} from "react-redux";
import locationPaths from "../../data/locationPaths";
import {useEffect} from "react";

// Local Imports
import avatarPaths from '../../data/avatarPaths';
import LocationBox from "./locationBox";
import uiText from "../../data/ui-text";
import {locationColorKeys} from "../../data/colorMapping";

// Carousel Item Component
const CarouselItem = ({ toggleLanguage, data, toggleLocationPreference, updateCitizenEventsRainfallData }) => {

    const formTypeMapping = {
        FLOODZONES_FORM: {
            text: uiText.global.tooltips.floodEvent[toggleLanguage.language],
            image: "/images/icons/Flood-Icon-Plain.png",
        },
        RAIN_FORM: {
            text: uiText.global.tooltips.rainEvent[toggleLanguage.language],
            image: "/images/icons/Rain-Icon-Plain.png",
        },
        RIVERFLOOD_FORM:  {
            text: uiText.global.tooltips.floodEvent[toggleLanguage.language],
            image: "/images/icons/Flood-Icon-Plain.png",
        }
    }

    // Get viewport dimensions
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    if (data) {
        return (
            <CarouselBox>
                <CarouselFlex>
                    <Box sx={{display: `flex`, justifyContent: `center`, alignItems: `center`}}>
                        <ImageWrapperBox>
                            <Image alt={"citizen avatar"} src={formTypeMapping[data['submissiontype']].image} width={vw > 600 ? 60 : 40} height={vw > 600 ? 60 : 40} objectFit={'contain'}/>
                        </ImageWrapperBox>
                        <TypeOrganisationBox>
                            <CitizenTypeText>{uiText.locationPage.rainfallMap.citizenReport[toggleLanguage.language]}</CitizenTypeText>
                            {/*<CitizenInfoText >{locationPaths.hasOwnProperty(data['organisationtype']) ? locationPaths[data['organisationtype']].text : ""}</CitizenInfoText>*/}
                        </TypeOrganisationBox>
                    </Box>
                    <EventType>{formTypeMapping[data['submissiontype']].text.toUpperCase()}<span className={"bluePunctuation"}>.</span></EventType>
                </CarouselFlex>
                <MainContentText sx={{fontSize: `25px`, textAlign: `left`, marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} >{'"' + data.submissiontext + '"'}</MainContentText>

                    <LocationBoxWrapper>
                        <DateText >{new Date(data['submissiontimestamp']).toLocaleString().split(',')[0]}</DateText>
                        <DateText >{new Date(data['submissiontimestamp']).toLocaleString().split(',')[1] !== undefined ? new Date(data['submissiontimestamp']).toLocaleString().split(',')[1].slice(0,6) : "-"}</DateText>
                    </LocationBoxWrapper>
            </CarouselBox>
        )
    }
}

const CarouselBox = styled(Box)(({theme}) => ({
    display: `flex`,
    width: `75%`,
    minWidth: `500px`,
    flexDirection: `column`,
    minHeight: `250px`,
    justifyContent: `space-between`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    boxShadow: `0px 0px 10px rgba(21, 101, 192, 0.2)`,

    border: `1.5px solid #E5E5E5`,
    [theme.breakpoints.down('1000')]: {
        minWidth: `400px`,
    },
    [theme.breakpoints.down('800')]: {
        padding: theme.spacing(1.5),
        minHeight: `225px`,
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: `175px`,
    },
    [theme.breakpoints.down('550')]: {
        minWidth: `275px`,
        minHeight: `200px`,
    },
    [theme.breakpoints.down('400')]: {
        minWidth: `225px`,
    },
    [theme.breakpoints.down('350')]: {
        minWidth: `200px`,
        minHeight: `150px`,
    },
}))


const LocationBoxWrapper = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxHeight: `60px`,
    [theme.breakpoints.down('350')]: {
        display: `none`
    },
}))

const CarouselFlex = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxHeight: `60px`
}))

const DateText = styled(Typography)(({theme}) => ({
    color: `#888888`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `12px`,
    },
}))

const ImageWrapperBox = styled(Box)(({theme}) => ({

}))

const CitizenTypeText = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `18px`
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `14px`,
    },
}))

const CitizenInfoText = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `10px`,
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `9px`,
    },
}))

const TypeOrganisationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-around`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {

    },
}))

const EventType = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    textAlign: `right`,
    [theme.breakpoints.down('md')]: {
        fontSize: `14px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

const MainContentText = styled(Typography)(({theme}) => ({
    fontSize: `25px`,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('md')]: {
        fontSize: `20px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `16px`,
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `14px`,
    },
}))

export default connect((state) => state)(CarouselItem)