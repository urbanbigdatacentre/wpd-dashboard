// Carousel rendered inside flood map legend to allow users to brose through different locations of flood risk zones
// - will update map coordinates

// Package Imports
import {Container, styled, Box} from "@mui/material";
import {connect} from "react-redux";

// Local Imports


// Swiper Imports & config
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import { Virtual } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/virtual';
import dummyData from "../../data/dummyCitizenData";
import {CarouselItem} from "./carouselItem";


const FloodMapZonesCarousel = ({toggleLanguage, data}) => {

    const handleChange = (e) => {
        console.log("Changed")
    }

    return (
        <FloodMapZonesCarouselContainer>
            <Swiper
                spaceBetween={0}
                modules={[Navigation, Virtual]}
                slidesPerView={1}
                navigation
                lazy={true}
                loop={true}
                className="myFloodCarouselSwiper"
                onSlideChange={(swiper) => handleChange(swiper)}
                virtual={true}
                onSwiper={(swiper) => handleChange(swiper)}
            >
                {
                    data.map((item, index) => {

                        console.log(item)

                        return (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <Box>

                                </Box>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </FloodMapZonesCarouselContainer>
    );
}

const FloodMapZonesCarouselContainer = styled(Container)(({theme}) => ({
    display: `flex`,
}))

export default connect((state)=>state)(FloodMapZonesCarousel)