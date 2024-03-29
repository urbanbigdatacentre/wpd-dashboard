// Component used to help user understand currently selected locations and navigate back to the location dashboard

// Package Imports
import {Box, Button, Container, Divider, styled, Typography} from "@mui/material";
import uiText from "../../../data/ui-text";
import LocationControlButton from "../../elements/locationControlButton";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import {locationColorKeys} from "../../../data/colorMapping";
import {connect} from "react-redux";
import React from "react";
import {useRouter} from "next/router";
import Link from "next/link";
// Local Imports


// Selected Locations Component
const SelectedLocations = (props) => {
    return (
        <Container sx={{display: `flex`, justifyContent: `center`}}>
            <SelectedLocationsBox>
                <TitleLinkBox sx={{display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, width: `100%`, alignItems: `center`}}>
                    <SelectedLocationsTitle sx={{paddingBottom: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.selectedLocations[props.toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></SelectedLocationsTitle>
                    <Link passHref href={`/location?name=${props.updatePrimaryLocation.location['placename']}&id=${props.updatePrimaryLocation.location['placeid']}`}><BackToDashboardButton startIcon={<ArrowBackIosNewRoundedIcon />} variant={'text'}>{uiText.landingPage.hero.backToDashboard[props.toggleLanguage.language]}</BackToDashboardButton></Link>
                </TitleLinkBox>
                <Divider sx={{width: `100%`}}/>
                <LocationControlBox>
                    <LocationButtonLayoutBox>
                        <LocationControlButton primary={true} data={props.updatePrimaryLocation.location} contained={false} color={'#2196F3'}/>
                    </LocationButtonLayoutBox>
                    {props.updateAdditionalLocation.locations.length > 0 ? props.updateAdditionalLocation.locations.map((item, index) => {

                        return (
                            <LocationButtonLayoutBox key={index}>
                                <LocationControlButton primary={false} data={item} contained={false} color={locationColorKeys[index].color}/>
                            </LocationButtonLayoutBox>
                        )
                    }) : null}
                </LocationControlBox>
            </SelectedLocationsBox>
        </Container>
    );
}

const SelectedLocationsTitle = styled(Typography)(({theme}) => ({
    fontSize: `14px`,
    [theme.breakpoints.down('sm')]: {
        fontSize: `14px`,
    },
}))

const TitleLinkBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('450')]: {
        marginTop: theme.spacing(3),
        flexDirection: `column-reverse`,
        alignItems: `flex-start`
    },
}))

const SelectedLocationsBox = styled(Box)(({theme}) => ({
    zIndex: `500`,
    top: 200,
    right: theme.spacing(6),
    left: theme.spacing(6),
    width: `70%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
        width: `100%`,
        marginTop: theme.spacing(26),
        paddingTop: theme.spacing(0),
    },
    [theme.breakpoints.down('450')]: {
        width: `100%`,
        marginTop: theme.spacing(13),
        paddingTop: theme.spacing(0),
    },
}))


const LocationControlBox = styled(Box)(({theme}) => ({
    padding: `0px 0 20px 0`,
    display: `flex`,
    flexWrap: `wrap`,
    gap: `5px 20px`,
    width: `100%`,
}))

const BackToDashboardButton = styled(Button)(({theme}) => ({
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: `11px`,
        padding: `0`
    },
    [theme.breakpoints.down('550')]: {
        fontSize: `11px !important`,
    },
    [theme.breakpoints.down('450')]: {
        width: `100%`,
        textAlign: `right`,
        display: `flex`,
        justifyContent: `flex-end`,
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        fontSize: `11px !important`,
    },
    [theme.breakpoints.down('384')]: {
        marginTop: theme.spacing(0),
    },
}))

const LocationButtonLayoutBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2.5),
}))

export default connect((state) => state)(SelectedLocations)