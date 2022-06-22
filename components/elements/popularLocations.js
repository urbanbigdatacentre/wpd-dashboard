// Component used to provide a shortcut for popular location pages
// Package Imports

import {Box, Button, Container, Divider, styled, Typography} from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import {connect} from "react-redux";
import React from "react";
import Link from "next/link";


// Local Imports
import uiText from "../../data/ui-text";


// Selected Locations Component
const PopularLocations = (props) => {
    return (
        <Container sx={{display: `flex`, justifyContent: `center`}}>
            <SelectedLocationsBox>
                <TitleLinkBox sx={{display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, width: `100%`, alignItems: `center`}}>
                    <PopularLocationsTitle sx={{paddingBottom: `10px`, fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.labels.popularLocation[props.toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}>.</span></PopularLocationsTitle>
                </TitleLinkBox>
                <Divider sx={{width: `100%`}}/>
                <LocationControlBox>
                    <LocationButtonLayoutBox>
                        <Link passHref href={`/location?name=Acre&id=12`}><LocationButton variant={'outlined'}>{"Acre"}</LocationButton></Link>
                        <Link passHref href={`/location?name=Santa%20Catarina&id=42`}><LocationButton variant={'outlined'}>{"Santa Catarina"}</LocationButton></Link>
                        <Link passHref href={`/location?name=São%20Paulo&id=35`}><LocationButton variant={'outlined'}>{"São Paulo"}</LocationButton></Link>
                    </LocationButtonLayoutBox>
                </LocationControlBox>
            </SelectedLocationsBox>
        </Container>
    );
}

const PopularLocationsTitle = styled(Typography)(({theme}) => ({
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
        marginTop: theme.spacing(18),
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

const LocationButton = styled(Button)(({theme}) => ({
    marginBottom: theme.spacing(1),
    flexWrap: `wrap`,
    gap: `1em`,
    marginRight: theme.spacing(3),
    minWidth: theme.spacing(10),
    border: `1.5px solid #2196F3`,
    boxShadow: `0px 0px 15px rgba(33, 150, 243, 0.15)`,
    color: `#2196F3`,
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,

    },
    [theme.breakpoints.down('450')]: {
        marginBottom: theme.spacing(2),
    },
    '&:hover': {

        border: `1.5px solid #2196F3`,

    }
}))

const LocationButtonLayoutBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2.5),
}))

export default connect((state) => state)(PopularLocations)