// WPD Landing Page - Project Partners Component

// Package Imports
import {connect} from "react-redux";
import {Box, Container, Typography} from '@mui/material';
import Image from 'next/image'

// Local Imports
import uiText from "../../../data/ui-text";
import styles from '../../../styles/modules/landing-page/ProjectPartners.module.css';
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
        <Container className={styles.projectPartnersSectionContainer}>
            <Typography variant={"description"}>{uiText.landingPage.partners.title[toggleLanguage.language]}</Typography>
            <Box className={styles.projectPartnersLogoContainer}>
                {Object.keys(images).map(function(src, key) {

                    return (
                        <div key={key} className={styles.projectPartnersLogoWrapper}>
                            <Image src={images[key]} alt={images[key]} width={115} height={125} objectFit={'contain'}/>
                        </div>
                    )
                })}
            </Box>
        </Container>
    );
}

export default connect((state) => state)(ProjectPartners)