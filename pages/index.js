// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import {styled, Box} from "@mui/material";
import { bindActionCreators } from 'redux';

// Component Imports
import Footer from "../components/modules/footer";
import MyNavbar from "../components/modules/navbar";
import LandingHeroSection from "../components/modules/landing-page/landingHero";
import SelectedLocations from "../components/modules/landing-page/selectedLocations";
import PopularLocations from "../components/elements/popularLocations";
import StatisticsBar from "../components/modules/landing-page/statisticsBar";
import NationalActivity from "../components/modules/landing-page/nationalActivity";
import About from '../components/modules/landing-page/about';
import ProjectPartners from "../components/modules/landing-page/projectPartners";
import CitizenSection from "../components/modules/landing-page/citizenSection";

// State MGMT Imports
import { wrapper } from '../store/store';
import {
    changeLanguage,
    setAPIConfig
} from "../store/actions";

// Style Imports
import styles from '../styles/modules/Home.module.css'
import {useEffect, useState} from "react";
import uiText from "../data/ui-text";
import {useRouter} from "next/router";


// Landing Page Component
const Home = (props) => {

    useEffect(() => {
        props.setAPIConfig(props.env)
    }, [props.env])

    const [pageTitle, setPageTitle] = useState("");
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {

        if (!pageLoaded) {// Adapt Language of Page
            let title = window.location.hostname.includes('dados') ? uiText.global.labels.projectTitle['br'] : uiText.global.labels.projectTitle['en'];
            setPageTitle(title)
            document.title = title;
            props.changeLanguage(window.location.hostname.includes('dados') ? 'br' : 'en')
            setPageLoaded(true)
        }
    }, [pageTitle, pageLoaded])

    return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Connecting Brazilian Flood Data From Communities & Official Sources"/>
      </Head>

      <main className={styles.main}>
          <MyNavbar />
          <LandingHeroSection/>
          <LayoutMargin/>
          {props.updatePrimaryLocation.location.hasOwnProperty('placename') ? <SelectedLocations/> : <PopularLocations/>}
          <StatisticsBar/>
          <span id="national-activity" > </span>
          <NationalActivity mapBoxToken={props.env.MAPBOX_TOKEN}/>
          <About/>
          <ProjectPartners/>
          <CitizenSection mapBoxToken={props.env.MAPBOX_TOKEN}/>
          <Footer/>
      </main>

    </div>
    )
}

const LayoutMargin = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('1400')]: {
        marginTop: theme.spacing(9)
    },
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(11)
    },
    [theme.breakpoints.down('1000')]: {
        marginTop: theme.spacing(15)
    },
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(20),
        width: `90%`,
    },
    [theme.breakpoints.down('700')]: {
        marginTop: theme.spacing(23)
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(18)
    },
    [theme.breakpoints.down('450')]: {
        marginTop: theme.spacing(22)
    },
    [theme.breakpoints.down('385')]: {
        marginTop: theme.spacing(30)
    },
}))

export const getStaticProps = wrapper.getStaticProps((store) => () => {

    return {
        props: {
            env: {
                MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
                NODE_ENV: process.env.NODE_ENV,

            }
        }
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        setAPIConfig: bindActionCreators(setAPIConfig, dispatch),
        changeLanguage: bindActionCreators(changeLanguage,dispatch)
    }
}



export default connect((state) => state, mapDispatchToProps)(Home)
