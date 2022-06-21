// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import {usePromiseTracker} from "react-promise-tracker";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Container, styled} from "@mui/material";

// Component Imports
import Footer from "../components/modules/footer";
import MyNavbar from "../components/modules/navbar";
import LanguageToggle from "../components/elements/languageToggle";
import CitizenSection from "../components/modules/landing-page/citizenSection";
import ControlPanel from "../components/modules/location-page/controlPanel";
import RainfallMapSection from "../components/modules/location-page/rainfallMapSection";
import RainfallChartSection from "../components/modules/location-page/rainfallChartSection";
import FloodMapSection from "../components/modules/location-page/floodMapSection";
import NoLocationSet from "../components/modules/location-page/noLocationSet";
import LocationPageSkeleton from "../components/elements/locationPageSkeleton";

// Search Temp
import SearchBar from "../components/elements/searchBar";

// State MGMT Imports
import { wrapper } from '../store/store';
import {
    changeLanguage,
    changeLocationPreference, removeCitizenFloodZonesEventsData,
    removeCitizenRainfallEventsData, removeCitizenRiverFloodEventsData,
    setAPIConfig,
    updateAdditionalLocation,
    updateCitizenFloodZonesEventsData,
    updateCitizenRainfallEventsData, updateCitizenRiverFloodEventsData,
    updateFloodZonesData,
    updatePluviometerData,
    updatePrimaryLocation
} from "../store/actions";

// Style Imports
import styles from '../styles/modules/Home.module.css'
import LocationHero from "../components/modules/location-page/hero";
import {Box} from "@mui/material";
import uiText from "../data/ui-text";
import SearchDropdown from "../components/elements/searchDropdown";
import requestSimpleGeometry from "../api/requestSimpleGeometry";
import requestPluviometerData from "../api/requestPluviometerData";
import requestFloodZonesData from "../api/requestFloodZonesData";
import requestCitizenEvents from "../api/requestCitizenEvents";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Link from "next/link";


// Landing Page Component
const Location = (props) => {

    // ==========
    // SET NECCESSARY CONDITIONS FOR PAGE TO LOAD
    // ==========
    const {promiseInProgress} = usePromiseTracker({area: "simple-geometry", delay: 0})
    const [attemptedLoad, setLoadAttempt] = useState(false);
    const [pageTitle, setPageTitle] = useState("");
    const [timeoutComponent, setTimeoutComponent] = useState(<LocationPageSkeleton/>)
    let timeout = false;
    setTimeout(function() {setTimeoutComponent(<NoLocationSet/>)}, 1000);
    // ==========
    // GET QUERY PARAMS - INDICATING LOCATION ID & NAME (if any and correct)
    // ==========

    const router = useRouter();

    useEffect(() => {
        // Check if ID & NAME params exist - AND if content has already loaded
        if ((router.query['name']) && (router.query['id']) && (!attemptedLoad)) {

            console.log("Requests made in Location Page")

            // MAKE API REQUESTS AFTER CHECKING IF DATA ALREADY EXISTS OR NOT

            // Make request for simple geometry
            if (router.query['name'] !== props.updatePrimaryLocation.location['placename']) {
                requestSimpleGeometry({"placename": router.query['name'], "placeid": router.query['id']}, props.configureAPI, false, function() {document.querySelector('#search-bar').value = ""}, props.changeLocationPreference, props.updatePrimaryLocationDispatch, props.updateAdditionalLocationDispatch);
            }

            // Check for existing Pluviometer Data
            if (props.updatePluviometerData.locations.length) {
                const resultPluviometer = props.updatePluviometerData.locations.find(item => item['id'] === router.query['id'])
                if (!resultPluviometer) {
                    // Make Request for Pluviometer Data
                    requestPluviometerData({"placename": router.query['name'], "placeid": router.query['id']}, props.toggleDate, props.configureAPI, props.updatePluviometerData, props.updatePluviometerDataDispatch)
                }
            } else {
                // Make Request for Pluviometer Data
                requestPluviometerData({"placename": router.query['name'], "placeid": router.query['id']}, props.toggleDate, props.configureAPI, props.updatePluviometerData, props.updatePluviometerDataDispatch)
            }

            // Make Request for Citizen Rainfall Events
            requestCitizenEvents(router.query['id'], 9, props.toggleDate.startDate, props.toggleDate.endDate, router.query['name'], props.configureAPI, props.updateCitizenEventsRainfallData, props.updateCitizenEventsRainfallDataDispatch)

            // Make Request for Citizen FloodZones Events
            requestCitizenEvents(router.query['id'], 10, props.toggleDate.startDate, props.toggleDate.endDate, router.query['name'], props.configureAPI, props.updateCitizenEventsFloodZonesData, props.updateCitizenFloodZonesEventsDataDispatch)

            // Make Request for Citizen RiverFlood Events
            requestCitizenEvents(router.query['id'], 11, props.toggleDate.startDate, props.toggleDate.endDate, router.query['name'], props.configureAPI, props.updateCitizenEventsRiverFloodData, props.updateCitizenRiverFloodEventsDataDispatch)

            setLoadAttempt(true);
        }

    }, [router.query, promiseInProgress, attemptedLoad, timeout])

    // ============
    // SET PAGE LANGUAGE & TITLE DEPENDING ON BR vs EN URL
    // ============

    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {

        if (!pageLoaded) {
            // Adapt Language of Page
            let title = window.location.hostname.includes('dados') ? uiText.global.labels.projectTitle['br'] : uiText.global.labels.projectTitle['en'];
            setPageTitle(title)
            document.title = title;
            props.changeLanguage(window.location.hostname.includes('dados') ? 'br' : 'en')
            setPageLoaded(true)

        }
    }, [pageTitle, pageLoaded])


    // ==========
    // SET API CONFIG
    // ==========

    useEffect(() => {
        props.setAPIConfig(props.env)
    }, [props.env])

    // =========
    // FUNCTION TO CONFIGURE PAGE LAYOUT - Loading - Dashboard - No Location Set
    // =========

    const renderDashboardLayout = () => {

        if (promiseInProgress) {
            return <LocationPageSkeleton/>
        }

        if (props.updatePrimaryLocation.location.hasOwnProperty('placename')) {
            return (
                <>
                    <LocationHero mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true}/>
                    <ControlPanel weatherAPIToken={props.env.WEATHER_API_TOKEN}/>
                    <RainfallChartSection/>
                    <RainfallMapSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true} />
                    <CitizenSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={false} dashboardRender={true}/>
                    <FloodMapSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true}/>
                </>
            )
        }
        else {
            // Set timeout 5000ms to wait for redux to hydrate
            return timeoutComponent;
        }
    }

    return (

        // DASHBOARD LAYOUT
            <div className={styles.container}>
                <Head>
                    <title>{pageTitle}</title>
                    <meta name="description" content="Connecting Brazilian Flood Data From Communities & Official Sources"/>
                </Head>

                <main className={styles.main}>
                    <MyNavbar />
                    <LanguageToggle language={props.toggleLanguage.language}/>

                    {renderDashboardLayout()}

                    {/*MEMORY LEAK IS CAUSED BECAUSE SEARCH BAR IS NOT MOUNTED WHEN MAKING API CALLS*/}

                    <Box sx={{opacity: `0`}}>
                        <SearchBar />
                        <SearchDropdown/>
                    </Box>

                    <Footer/>

                </main>

            </div>
    )
}


export const getStaticProps = wrapper.getStaticProps((store) => () => {

    return {
        props: {
            env: {
                MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
                NODE_ENV: process.env.NODE_ENV,
                WEATHER_API_TOKEN: process.env.WEATHER_API_TOKEN
            }
        }
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        setAPIConfig: bindActionCreators(setAPIConfig, dispatch),
        changeLanguage: bindActionCreators(changeLanguage, dispatch),
        changeLocationPreference: bindActionCreators(changeLocationPreference, dispatch),
        updatePrimaryLocationDispatch: bindActionCreators(updatePrimaryLocation, dispatch),
        updateAdditionalLocationDispatch: bindActionCreators(updateAdditionalLocation, dispatch),
        updatePluviometerDataDispatch: bindActionCreators(updatePluviometerData, dispatch),
        updateFloodDataDispatch: bindActionCreators(updateFloodZonesData, dispatch),
        updateCitizenEventsRainfallDataDispatch: bindActionCreators(updateCitizenRainfallEventsData, dispatch),
        removeCitizenRainfallEventsDataDispatch: bindActionCreators(removeCitizenRainfallEventsData, dispatch),
        updateCitizenFloodZonesEventsDataDispatch: bindActionCreators(updateCitizenFloodZonesEventsData, dispatch),
        removeCitizenFloodZonesEventsDataDispatch: bindActionCreators(removeCitizenFloodZonesEventsData, dispatch),
        updateCitizenRiverFloodEventsDataDispatch: bindActionCreators(updateCitizenRiverFloodEventsData, dispatch),
        removeCitizenRiverFloodEventsDataDispatch: bindActionCreators(removeCitizenRiverFloodEventsData, dispatch)
    }
}


export default connect((state)  => state, mapDispatchToProps)(Location)
