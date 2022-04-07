// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {useEffect} from "react";

// Component Imports
import Footer from "../components/modules/footer";
import MyNavbar from "../components/modules/navbar";
import LandingHeroSection from "../components/modules/landing-page/landingHero";
import StatisticsBar from "../components/modules/landing-page/statisticsBar";

// State MGMT Imports
import { wrapper } from '../store/store';
import {changeLanguage} from "../store/actions";
import { serverRenderClock, startClock } from "../store/tick/action";

// Style Imports
import styles from '../styles/modules/Home.module.css'

// Landing Page Component
const Home = (props) => {

    useEffect(() => {
        const timer = props.startClock()

        return () => {
            clearInterval(timer)
        }
    }, [props])


    return (
    <div className={styles.container}>
      <Head>
        <title>Waterproofing Data</title>
        <meta name="description" content="Connecting Brazilian Flood Data From Communities & Official Sources"/>
      </Head>

      <main className={styles.main}>
          <MyNavbar />
          <LandingHeroSection />
          <StatisticsBar/>

          {/*<Footer/>*/}

      </main>

    </div>
    )
}

// ** MUST INCLUDE EITHER OF THE BELOW
// Function to retrieve server side props
// Function to retrieve static props

export const getStaticProps = wrapper.getStaticProps((store) => () => {
    store.dispatch(serverRenderClock(true))
})


const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: bindActionCreators(changeLanguage, dispatch),
        startClock: bindActionCreators(startClock, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Home)
