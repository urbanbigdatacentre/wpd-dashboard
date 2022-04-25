// Individual Item to be used inside Citizen Carousel Component


// Package Imports
import {Box, Container, styled, Typography} from "@mui/material";
import Image from 'next/image';

// Local Imports
import avatarPaths from '../../data/avatarPaths';
import {useEffect} from "react";


// Carousel Item Component
export const CarouselItem = ({ languageToggle, data }) => {

    useEffect(() => {
    })

    if (data) {
        return (
            <CarouselBox>
                <CarouselFlex>
                    <Box sx={{display: `flex`}}>
                        <Image src={avatarPaths[data.citizenType]} width={60} height={60} objectFit={'contain'}/>
                        <TypeOrganisationBox>
                            <Typography sx={{fontSize: `20px`}} >{data.citizenType}</Typography>
                            <Typography sx={{fontSize: `14px`, color: (theme) => (theme.palette.primary.main)}}>{data.citizenOrganisation}</Typography>
                        </TypeOrganisationBox>
                    </Box>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{data.type.toUpperCase()}<span className={"bluePunctuation"}>.</span></Typography>
                </CarouselFlex>
                <Typography sx={{fontSize: `25px`, textAlign: `left`}} >{'"' + data.submissionText + '"'}</Typography>
                <CarouselFlex>
                    <Typography sx={{color: `#888888`}} >{new Date(data.timestamp).toLocaleString().split(',')[0]}</Typography>
                    <LocationBox>
                        <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}} >{data.locationName}</Typography>
                    </LocationBox>
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
}))

const CarouselFlex = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxHeight: `60px`
}))

const TypeOrganisationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-around`,
    marginLeft: theme.spacing(2),
}))

const LocationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.light,
}))
