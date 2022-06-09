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
        FLOODZONES_FORM: uiText.global.tooltips.floodEvent[toggleLanguage.language],
        RAIN_FORM: uiText.global.tooltips.rainEvent[toggleLanguage.language],
        RIVERFLOOD_FORM: uiText.global.tooltips.floodEvent[toggleLanguage.language],
    }

    const colorIndex = updateCitizenEventsRainfallData.locations.findIndex(function(el){return el.id === toggleLocationPreference.locationID})

    const colorCode = colorIndex <= 0 ? '#2196F3' : locationColorKeys[colorIndex - 1].color

    if (data) {
        return (
            <CarouselBox>
                <CarouselFlex>
                    <Box sx={{display: `flex`}}>
                        <ImageWrapperBox>
                            <Image alt={"citizen avatar"} src={"/images/icons/Citizen-Icon.svg"} width={60} height={60} objectFit={'contain'}/>
                        </ImageWrapperBox>
                        <TypeOrganisationBox>
                            <CitizenTypeText>{uiText.locationPage.rainfallMap.citizenReport[toggleLanguage.language]}</CitizenTypeText>
                            <CitizenInfoText >{locationPaths.hasOwnProperty(data['organisationtype']) ? locationPaths[data['organisationtype']].text : ""}</CitizenInfoText>
                        </TypeOrganisationBox>
                    </Box>
                    <EventType>{formTypeMapping[data['submissiontype']].toUpperCase()}<span className={"bluePunctuation"}>.</span></EventType>
                </CarouselFlex>
                <MainContentText sx={{fontSize: `25px`, textAlign: `left`, marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} >{'"' + data.submissiontext + '"'}</MainContentText>
                <CarouselFlex>
                    <DateText >{new Date(data['submissiontimestamp']).toLocaleString().split(',')[0]}</DateText>
                    <LocationBox locationName={data['locationame']} color={colorCode}/>
                </CarouselFlex>
            </CarouselBox>
        )
    }
}

const CarouselBox = styled(Box)(({theme}) => ({
    display: `flex`,
    width: `75%`,
    flexDirection: `column`,
    minHeight: `200px`,
    justifyContent: `space-between`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    boxShadow: `0px 0px 15px #E5E5E5`,
    border: `1.5px solid #E5E5E5`,
    [theme.breakpoints.down('800')]: {
        padding: theme.spacing(1.5),
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
}))

const ImageWrapperBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        display: `none`
    },
}))

const CitizenTypeText = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `16px`
    },
}))

const CitizenInfoText = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`
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
        marginLeft: theme.spacing(0),
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
}))

export default connect((state) => state)(CarouselItem)