// Carousel Component for Weather in Control Dashboard

// Package Imports
import {connect} from "react-redux";
import {Container, styled, Skeleton, Box} from "@mui/material";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import WeatherItem from "./weatherItem";
import {useEffect, useState} from "react";
import axios from "axios";

// Swiper Imports & config
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import { Virtual } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/virtual';



const WeatherCarousel = ({ toggleLanguage, weatherAPIToken, locationData }) => {

    const [weatherData, setWeatherData] = useState([]);

    const { promiseInProgress } = usePromiseTracker({delay: 500, area: "weather-request"})

    useEffect(() => {
        if (!weatherData.length) {
            console.log("Making Weather Request")
            const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationData['latitude']}&lon=${locationData['longitude']}&units=metric&exclude=hourly,minutely&appid=${weatherAPIToken}`
            trackPromise(axios.get(URL).then(function (res) {
                setWeatherData(res.data['daily'])
            }), "weather-request")
        }
    }, [weatherData.length, locationData])


    return (
        <WeatherCarouselContainer>
            {promiseInProgress ? <Box sx={{display: `flex`}} >
                <Skeleton sx={{borderRadius: (theme) => (theme.shape.borderRadius), marginRight: (theme) => (theme.spacing(3))}} variant={"rectangular"} width={`250px`} height={`130px`}></Skeleton>
                <Skeleton sx={{borderRadius: (theme) => (theme.shape.borderRadius)}} variant={"rectangular"} width={`250px`} height={`130px`}></Skeleton>
            </Box> : <Swiper
                spaceBetween={-35}
                modules={[Navigation, Virtual]}
                slidesPerView={2}
                navigation
                lazy={true}
                loop={false}
                className="mySwiper"
                // onSlideChange={(swiper) => handleChange(swiper)}
                virtual={true}
                // onSwiper={(swiper) => handleChange(swiper)}
            >
                {
                    weatherData.map((item, index) => {

                        if (index !== 7) {
                            return (
                                <SwiperSlide key={index} virtualIndex={index}>
                                    <WeatherItem weekdayIndex={index} data={item}/>
                                </SwiperSlide>
                            )
                        }
                    })
                }
            </Swiper> }

        </WeatherCarouselContainer>
    );
}

const WeatherCarouselContainer = styled(Container)(({theme}) => ({
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    margin: `0`,
    width: `55%`,
    [theme.breakpoints.down('1250')]: {
        width: `75%`,
        marginTop: theme.spacing(4),
        justifyContent: `space-between`,
    },
    [theme.breakpoints.down('900')]: {
        width: `100%`,
    },
    [theme.breakpoints.down('700')]: {
        padding: `0`
    },
    [theme.breakpoints.down('650')]: {
        display: `none`
    },
}))

export default connect((state) => state)(WeatherCarousel);