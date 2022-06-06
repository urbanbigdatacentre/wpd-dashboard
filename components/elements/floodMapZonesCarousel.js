// Carousel rendered inside flood map legend to allow users to brose through different locations of flood risk zones
// - will update map coordinates

// Package Imports
import {Container, styled, Box, Typography} from "@mui/material";
import {connect} from "react-redux";

// Local Imports
import {updateFloodCoordinates} from "../../store/actions";

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
import FloodMapCarouselItem from "./floodMapCarouselItem";
import {bindActionCreators} from "redux";
import {changeRadius} from "../../store/actions";
import uiText from "../../data/ui-text";


const FloodMapZonesCarousel = ({toggleLanguage, data, mapBoxToken, updateFloodCoordinates}) => {

    const handleChange = (swiper) => {
        if (data.length) {
            const latitude = typeof (data[swiper.activeIndex].geometry['coordinates'][0][0][0]) === "number" ? data[swiper.activeIndex].geometry['coordinates'][0][0][0] : data[swiper.activeIndex].geometry['coordinates'][0][0][0][0];
            const longitude = typeof (data[swiper.activeIndex].geometry['coordinates'][0][0][1]) === "number" ? data[swiper.activeIndex].geometry['coordinates'][0][0][1] : data[swiper.activeIndex].geometry['coordinates'][0][0][0][1];
            updateFloodCoordinates({
                latitude: latitude,
                longitude: longitude
            })
        }
    }

    return (
        <FloodMapZonesCarouselContainer>

            {data.length ? <Swiper
                spaceBetween={0}
                modules={[Navigation, Virtual]}
                slidesPerView={1}
                navigation
                lazy={true}
                loop={false}
                className="myFloodCarouselSwiper"
                onSlideChange={(swiper) => handleChange(swiper)}
                virtual={true}
                onSwiper={(swiper) => handleChange(swiper)}
            >
                {
                    data.map((item, index) => {

                        return (
                            <SwiperSlide key={index} virtualIndex={item.id}>
                                <FloodMapCarouselItem index={parseInt(index)} data={item}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper> : null}
        </FloodMapZonesCarouselContainer>
    );
}

const FloodMapZonesCarouselContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    position: `relative`,
    alignItems: `flex-start`,
    padding: `0px !important`,
    justifyContent: `flex-start`
}))

const NoFloodZonesText = styled(Typography)(({theme}) => ({
    fontWeight: `400`
}))


const mapDispatchToProps = (dispatch) => {
    return {
        updateFloodCoordinates: bindActionCreators(updateFloodCoordinates, dispatch),
    }
}



export default connect((state)=>state, mapDispatchToProps)(FloodMapZonesCarousel)