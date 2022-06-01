// WPD Landing Page - Project Partners Component

// Package Imports
import {connect} from "react-redux";
import {Box, Container, styled, Typography} from '@mui/material';
import Image from 'next/image'

// Local Imports
import uiText from "../../../data/ui-text";
import {useEffect, useState} from "react";

// Project Partners Component



const ProjectPartners = ({ toggleLanguage }) => {

    const [images, setImages] = useState({});

    useEffect(() => {
        let imageLoader = [];
        require.context('../../../public/images/logos', false, /\.(png|jpe?g|svg)$/).keys().forEach((item, index) => { imageLoader.push("/images/logos" +item.replace('./', '/').toString())});
        setImages(imageLoader);
    }, [])

    return (
        <ProjectPartnersSectionContainer >
            <Typography variant={"description"}>{uiText.landingPage.partners.title[toggleLanguage.language]}</Typography>
            <ProjectPartnersLogoBox >
                {Object.keys(images).map(function(src, key) {

                    return (
                        <ProjectPartnersLogoWrapper key={key} >
                            <Image src={images[key]} alt={images[key]} width={115} height={125} objectFit={'contain'}/>
                        </ProjectPartnersLogoWrapper>
                    )
                })}
            </ProjectPartnersLogoBox>
        </ProjectPartnersSectionContainer>
    );
}

const ProjectPartnersSectionContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(15),
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    [theme.breakpoints.down('1100')]: {
        marginTop: theme.spacing(50),
    },
    [theme.breakpoints.down('750')]: {
        marginTop: theme.spacing(10),
    },
}))

const ProjectPartnersLogoBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `center`,
    alignItems: `center`,
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(3),
    },
}))

const ProjectPartnersLogoWrapper = styled(Box)(({theme}) => ({
    marginLeft: `20px`,
    marginRight: `20px`,
    [theme.breakpoints.down('md')]: {
        width: `15%`,
        marginLeft: `15px`,
        marginRight: `15px`,
    },
    [theme.breakpoints.down('sm')]: {
        width: `20%`,
        marginLeft: `7.5px`,
        marginRight: `7.5px`,
    },
}))

export default connect((state) => state)(ProjectPartners)