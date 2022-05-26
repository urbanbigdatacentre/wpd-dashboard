// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {useEffect} from "react";
import _MapContext from "react-map-gl";

// Component Imports
import Footer from "../components/modules/footer";
import MyNavbar from "../components/modules/navbar";
import LanguageToggle from "../components/elements/languageToggle";
import LandingHero from "../components/modules/landing-page/landingHero";
import CitizenSection from "../components/modules/landing-page/citizenSection";
import ControlPanel from "../components/modules/location-page/controlPanel";
import RainfallMapSection from "../components/modules/location-page/rainfallMapSection";
import RainfallChartSection from "../components/modules/location-page/rainfallChartSection";
import FloodMapSection from "../components/modules/location-page/floodMapSection";
import NoLocationSet from "../components/modules/location-page/noLocationSet";
import {NoSsr} from "@mui/material";

// State MGMT Imports
import { wrapper } from '../store/store';
import {changeLanguage, changeDate, setAPIConfig} from "../store/actions";

// Style Imports
import styles from '../styles/modules/Home.module.css'
import LocationHero from "../components/modules/location-page/hero";


// Landing Page Component
const Location = (props) => {

    const ctx = _MapContext.Provider

    useEffect(() => {
        props.setAPIConfig(props.env)
        console.log(ctx)
    }, [props.env])

    return (

        // DASHBOARD LAYOUT


            <div className={styles.container}>
                <Head>
                    <title>Waterproofing Data</title>
                    <meta name="description" content="Connecting Brazilian Flood Data From Communities & Official Sources"/>
                </Head>

                <main className={styles.main}>
                    <MyNavbar />
                    <LanguageToggle language={props.language}/>

                    {
                        /*CHECK IF PRIMARY LOCATION IS SET - TO RETURN DASHBOARD OR NO LOCATION LAYOUT*/
                        props.updatePrimaryLocation.location.hasOwnProperty("placename") ? (
                            <>
                                <LocationHero mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true}/>
                                <ControlPanel weatherAPIToken={props.env.WEATHER_API_TOKEN}/>
                                <RainfallChartSection/>
                                <RainfallMapSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true} ctx={ctx}/>
                                <CitizenSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={false} dashboardRender={true}/>
                                <FloodMapSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true}/>
                            </>
                        ) : (
                            <>
                                <NoLocationSet/>
                            </>
                        )
                    }

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

const mapStateToProps = (state) => {
    return {
        language: state.toggleLanguage.language,
        updatePrimaryLocation: state.updatePrimaryLocation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAPIConfig: bindActionCreators(setAPIConfig, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Location)
