// Carousel Component for Citizen Data

// Package Imports
import {connect} from "react-redux";
import {Container, styled, Skeleton, Box, Typography} from "@mui/material";

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
import {updateCarouselCoordinates, updateAllCitizenEvents} from "../../store/actions";
import {useEffect, useState} from "react";
import locationPaths from "../../data/locationPaths";
import {usePromiseTracker} from "react-promise-tracker";
import {filterCitizenEventDataByDate} from "../../api/dataFilteringFunctions";
import uiText from "../../data/ui-text";
import Image from "next/image";
import LocationBox from "./locationBox";
import {locationColorKeys} from "../../data/colorMapping";

// Citizen Carousel Component
const CitizenCarousel = ({toggleLanguage, toggleLocationPreference, updateCarouselCoordinates, updateCitizenEventsRainfallData, toggleDate, updateCitizenEventsFloodZonesData, updateCitizenEventsRiverFloodData, useAPIData, updateAllCitizenEvents, updateAllCitizenEventsDispatch}) => {

    const { RAIN_FORM_promiseInProgress} = usePromiseTracker({area: "RAIN_FORM", delay: 0})
    const { FLOODZONES_FORM_promiseInProgress} = usePromiseTracker({area: "FLOODZONES_FORM", delay: 0})
    const { RIVERFLOOD_FORM_promiseInProgress} = usePromiseTracker({area: "RIVERFLOOD_FORM", delay: 0})

    const [citizenEventsDataArray, setCitizenEvents] = useState([]);

    useEffect(() => {

        const formattedDataArray = [];

        [...updateCitizenEventsFloodZonesData.locations, ...updateCitizenEventsRiverFloodData.locations, ...updateCitizenEventsRainfallData.locations].forEach(function(item) {
            if ((item.hasOwnProperty('citizenFloodZonesEvents')) && (item['id'] === toggleLocationPreference.locationID)) {
                formattedDataArray.push(... filterCitizenEventDataByDate([item], 'citizenFloodZonesEvents', toggleDate)['citizenFloodZonesEvents'])
            }
            else if ((item.hasOwnProperty('citizenRiverFloodEvents')) && (item['id'] === toggleLocationPreference.locationID)) {
                formattedDataArray.push(...filterCitizenEventDataByDate([item], 'citizenRiverFloodEvents', toggleDate)['citizenRiverFloodEvents'])
            }
            else if ((item.hasOwnProperty('citizenRainfallEvents')) && (item['id'] === toggleLocationPreference.locationID)) {
                formattedDataArray.push(...filterCitizenEventDataByDate([item], 'citizenRainfallEvents', toggleDate)['citizenRainfallEvents'])
            }
        })

        setCitizenEvents(formattedDataArray)

        if ((useAPIData !== undefined) && (formattedDataArray.length)) {
            updateCarouselCoordinates({latitude: formattedDataArray[0].latitude, longitude: formattedDataArray[0].longitude, submissionType: formattedDataArray[0]['submissiontype']})
        }
    }, [toggleLocationPreference, updateCitizenEventsFloodZonesData.locations.length, updateCitizenEventsRiverFloodData.locations.length, updateCitizenEventsRainfallData.locations.length, toggleDate])

    const setDataArray = useAPIData !== undefined ? citizenEventsDataArray : dummyData;

    // Handle Toggle Change
    const handleChange = (swiper) => {
        if ((citizenEventsDataArray[swiper.activeIndex] !== undefined) && (useAPIData !== undefined)) {
            updateCarouselCoordinates({latitude: citizenEventsDataArray[swiper.activeIndex].latitude, longitude: citizenEventsDataArray[swiper.activeIndex].longitude, submissionType: citizenEventsDataArray[swiper.activeIndex]['submissiontype']})
        } else if (useAPIData === undefined) {
            updateCarouselCoordinates({latitude: dummyData[swiper.activeIndex].latitude, longitude: dummyData[swiper.activeIndex].longitude, submissionType: dummyData[swiper.activeIndex]['submissiontype']})

        } else {
            console.log("No Carousel Data")
        }
    }

    if ((!RAIN_FORM_promiseInProgress) && (!FLOODZONES_FORM_promiseInProgress) && (!RIVERFLOOD_FORM_promiseInProgress)) {
        return (

            <CitizenCarouselContainer>
                {setDataArray.length ? <Swiper
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
                </Swiper> :

                <SwiperSlide>
                    <CarouselBox>
                        <CarouselFlex>
                            <Box sx={{display: `flex`}}>
                                <ImageWrapperBox>
                                    <Image alt={"citizen avatar"} src={"/images/icons/Citizen-Icon.svg"} width={60} height={60} objectFit={'contain'}/>
                                </ImageWrapperBox>
                                <TypeOrganisationBox>
                                    <CitizenTypeText>{uiText.locationPage.rainfallMap.citizenReport[toggleLanguage.language]}</CitizenTypeText>
                                    <CitizenInfoText >{uiText.locationPage.noData.topBlue[toggleLanguage.language]}</CitizenInfoText>
                                </TypeOrganisationBox>
                            </Box>
                        </CarouselFlex>
                        <MainContentText sx={{fontSize: `20px`, textAlign: `left`, marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} >{uiText.locationPage.noData.description[toggleLanguage.language]}</MainContentText>

                    </CarouselBox>
                </SwiperSlide>}
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
    paddingTop: theme.spacing(9),
    width: `60%`,
    minHeight: `300px`,
    maxHeight: `300px`,
    [theme.breakpoints.down('lg')]: {
        width: `80%`,
    },
    [theme.breakpoints.down('1000')]: {
        width: `90%`,
    },
    [theme.breakpoints.down('600')]: {
        paddingTop: theme.spacing(0),
        width: `100%`,
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },

}))



const CarouselBox = styled(Box)(({theme}) => ({
    display: `flex`,
    width: `75%`,
    flexDirection: `column`,
    height: `fit-content`,
    justifyContent: `space-between`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    boxShadow: `0px 0px 15px #E5E5E5`,
    border: `1.5px solid #E5E5E5`,
    [theme.breakpoints.down('800')]: {
        padding: theme.spacing(1.5),
    },
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
        width: `90%`,
    },
}))

const CarouselFlex = styled(Box)(({theme}) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    maxHeight: `60px`
}))

const ImageWrapperBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        display: `none`
    },
}))

const CitizenTypeText = styled(Typography)(({theme}) => ({
    fontSize: `20px`,
    [theme.breakpoints.down('md')]: {
        fontSize: `16px`
    },
}))

const CitizenInfoText = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        fontSize: `12px`
    },
}))

const TypeOrganisationBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-around`,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0),
    },
}))


const MainContentText = styled(Typography)(({theme}) => ({
    fontSize: `25px`,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('md')]: {
        fontSize: `16px`,
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: `16px`,
    },
}))


const mapDispatchToProps = (dispatch) => {
    return {
        updateCarouselCoordinates: bindActionCreators(updateCarouselCoordinates, dispatch),
        updateAllCitizenEventsDispatch: bindActionCreators(updateAllCitizenEvents, dispatch)
    }
}


export default connect((state) => state, mapDispatchToProps)(CitizenCarousel)
