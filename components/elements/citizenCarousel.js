// Carousel Component for Citizen Data

// Package Imports
import {connect} from "react-redux";
import {Container, styled, Skeleton, Box} from "@mui/material";

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
import CarouselItem from "./carouselItem";
import {bindActionCreators} from "redux";
import {updateCarouselCoordinates} from "../../store/actions";
import {useEffect, useState} from "react";
import locationPaths from "../../data/locationPaths";
import {usePromiseTracker} from "react-promise-tracker";

// Citizen Carousel Component
const CitizenCarousel = ({toggleLanguage, updateCarouselCoordinates, updateCitizenEventsRainfallData, updateCitizenEventsFloodZonesData, updateCitizenEventsRiverFloodData, useAPIData}) => {

    const { RAIN_FORM_promiseInProgress} = usePromiseTracker({area: "RAIN_FORM", delay: 0})
    const { FLOODZONES_FORM_promiseInProgress} = usePromiseTracker({area: "FLOODZONES_FORM", delay: 0})
    const { RIVERFLOOD_FORM_promiseInProgress} = usePromiseTracker({area: "RIVERFLOOD_FORM", delay: 0})

    const [citizenEventsDataArray, setCitizenEvents] = useState([]);

    useEffect(() => {

        const formattedDataArray = [];

        [...updateCitizenEventsFloodZonesData.locations, ...updateCitizenEventsRiverFloodData.locations, ...updateCitizenEventsRainfallData.locations].forEach(function(item) {
            if (item.hasOwnProperty('citizenFloodZonesEvents')) {
                formattedDataArray.push(...item['citizenFloodZonesEvents'])
            }
            else if (item.hasOwnProperty('citizenRiverFloodEvents')) {
                formattedDataArray.push(...item['citizenRiverFloodEvents'])
            }
            else if (item.hasOwnProperty('citizenRainfallEvents')) {
                formattedDataArray.push(...item['citizenRainfallEvents'])
            }
        })

        setCitizenEvents(formattedDataArray)
        if ((useAPIData !== undefined) && (formattedDataArray.length)) {
            updateCarouselCoordinates({latitude: formattedDataArray[0].latitude, longitude: formattedDataArray[0].longitude})
        }

    }, [updateCitizenEventsFloodZonesData.locations.length, updateCitizenEventsRiverFloodData.locations.length, updateCitizenEventsRainfallData.locations.length])


    const setDataArray = useAPIData !== undefined ? citizenEventsDataArray : dummyData;

    // Handle Toggle Change
    const handleChange = (swiper) => {
        if ((citizenEventsDataArray[swiper.activeIndex] !== undefined) && (useAPIData !== undefined)) {
            updateCarouselCoordinates({latitude: citizenEventsDataArray[swiper.activeIndex].latitude, longitude: citizenEventsDataArray[swiper.activeIndex].longitude})
        } else if (useAPIData === undefined) {
            updateCarouselCoordinates({latitude: dummyData[swiper.activeIndex].latitude, longitude: dummyData[swiper.activeIndex].longitude})

        } else {
            console.log("No Carousel Data")
        }
    }

    if ((!RAIN_FORM_promiseInProgress) && (!FLOODZONES_FORM_promiseInProgress) && (!RIVERFLOOD_FORM_promiseInProgress)) {
        return (

            <CitizenCarouselContainer>
                <Swiper
                    spaceBetween={0}
                    modules={[Navigation, Virtual]}
                    slidesPerView={1}
                    navigation
                    lazy={true}
                    loop={false}
                    className="mySwiper"
                    onSlideChange={(swiper) => handleChange(swiper)}
                    virtual={true}
                    onSwiper={(swiper) => handleChange(swiper)}
                >
                    {
                        setDataArray.map((item, index) => {

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
    } else {
        return (
            <Box sx={{width: `60%`}}>
                <CarouselSkeleton/>
            </Box>
        )
    }
}

const CarouselSkeleton = styled(Skeleton)(({theme}) => ({
    width: `75%`,
    minHeight: `320px`,
    justifyContent: `space-between`,
    borderRadius: theme.shape.borderRadius,
}))

const CitizenCarouselContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    margin: `0`,
    paddingTop: theme.spacing(6),
    width: `60%`,
    minHeight: `300px`,
    [theme.breakpoints.down('lg')]: {
        width: `80%`,
    },
    [theme.breakpoints.down('1000')]: {
        paddingTop: theme.spacing(0),
        width: `90%`,
    },
    [theme.breakpoints.down('600')]: {
        paddingTop: theme.spacing(0),
        width: `100%`,
    },

}))


const mapDispatchToProps = (dispatch) => {
    return {
        updateCarouselCoordinates: bindActionCreators(updateCarouselCoordinates, dispatch),
    }
}


export default connect((state) => state, mapDispatchToProps)(CitizenCarousel)
