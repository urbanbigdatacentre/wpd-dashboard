// Carousel Component for Citizen Data

// Package Imports
import {connect} from "react-redux";
import {Container, styled} from "@mui/material";

// Swiper Imports & config
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import { Virtual } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/virtual';

// Local Imports
import dummyData from '../../data/dummyCitizenData';
import {CarouselItem} from './carouselItem';
import {bindActionCreators} from "redux";
import {updateCarouselCoordinates} from "../../store/actions";

// Citizen Carousel Component
const CitizenCarousel = ({toggleLanguage, updateCarouselCoordinates}) => {

    // Handle Toggle Change
    const handleChange = (swiper) => {
        updateCarouselCoordinates({latitude: dummyData.data[swiper.activeIndex].latitude, longitude: dummyData.data[swiper.activeIndex].longitude, citizenType: dummyData.data[swiper.activeIndex].citizenType})
    }

    return (
        <CitizenCarouselContainer>
            <Swiper
                spaceBetween={0}
                modules={[Navigation, Virtual]}
                slidesPerView={1}
                navigation
                lazy={true}
                loop={true}
                className="mySwiper"
                onSlideChange={(swiper) => handleChange(swiper)}
                virtual={true}
                onSwiper={(swiper) => handleChange(swiper)}
            >
                {
                    dummyData.data.map((item, index) => {

                        return (
                            <SwiperSlide key={index} virtualIndex={index}>
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
    paddingTop: theme.spacing(6),
    width: `60%`,
    minHeight: `300px`

}))


const mapDispatchToProps = (dispatch) => {
    return {
        updateCarouselCoordinates: bindActionCreators(updateCarouselCoordinates, dispatch),
    }
}


export default connect((state) => state, mapDispatchToProps)(CitizenCarousel)
