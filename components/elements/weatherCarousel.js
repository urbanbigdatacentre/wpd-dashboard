// Carousel Component for Weather in Control Dashboard

// Package Imports
import {connect} from "react-redux";
import {Container, styled} from "@mui/material";
import dummyWeatherData from "../../data/dummyWeatherData";
import WeatherItem from "./weatherItem";

// Swiper Imports & config
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import { Virtual } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/virtual';



const WeatherCarousel = ({ toggleLanguage }) => {

    // Handle Toggle Change
    const handleChange = (swiper) => {
        console.log(swiper.activeIndex)
    }

    return (
        <WeatherCarouselContainer>
            <Swiper
                spaceBetween={0}
                modules={[Navigation, Virtual]}
                slidesPerView={2}
                navigation
                lazy={true}
                loop={true}
                className="mySwiper"
                onSlideChange={(swiper) => handleChange(swiper)}
                virtual={true}
                onSwiper={(swiper) => handleChange(swiper)}
            >
                {
                    dummyWeatherData.map((item, index) => {

                        return (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <WeatherItem data={item}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </WeatherCarouselContainer>
    );
}

const WeatherCarouselContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    margin: `0`,
    width: `55%`,
}))

export default connect((state) => state)(WeatherCarousel);