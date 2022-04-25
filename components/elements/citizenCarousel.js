// Carousel Component for Citizen Data

// Package Imports
import {connect} from "react-redux";
import {Box, Container, styled} from "@mui/material";
import {useEffect, useState} from "react";

// Swiper Imports & config
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Local Imports
import dummyData from '../../data/dummyCitizenData';
import {CarouselItem} from './carouselItem';

// Citizen Carousel Component
const CitizenCarousel = ({toggleLanguage}) => {

    const [data,setData] = useState();

    useEffect(() => {
        // Set Event Listeners for Next + Prev
        const prevButton = document.querySelector('.swiper-button-prev');

    })

    return (
        <CitizenCarouselContainer>
            <Swiper
                spaceBetween={0}
                modules={[Navigation]}
                slidesPerView={1}
                navigation
                lazy={true}
                loop={true}
                className="mySwiper"
                onClick={() => console.log('click')}
            >
                {
                    dummyData.data.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <CarouselItem data={item}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </CitizenCarouselContainer>
    );
}

const CitizenCarouselContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    margin: `0`,
    paddingTop: theme.spacing(5),
    width: `60%`,

}))


export default connect((state) => state)(CitizenCarousel)
