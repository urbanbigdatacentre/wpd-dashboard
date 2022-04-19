// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Component Imports
import Footer from "../components/modules/footer";
import MyNavbar from "../components/modules/navbar";
import LandingHeroSection from "../components/modules/landing-page/landingHero";
import StatisticsBar from "../components/modules/landing-page/statisticsBar";
import NationalOverview from "../components/modules/landing-page/nationalActivity";

// State MGMT Imports
import { wrapper } from '../store/store';
import {changeLanguage, changeDate} from "../store/actions";

// Style Imports
import styles from '../styles/modules/Home.module.css'
import NationalActivity from "../components/modules/landing-page/nationalActivity";

// Landing Page Component
const Home = (props) => {

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
          <NationalActivity mapBoxToken={props.env.MAPBOX_TOKEN}/>

          {/*<Footer/>*/}

      </main>

    </div>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) => () => {

    return {
        props: {
            env: {
                MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
            }
        }
    }
})


const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: bindActionCreators(changeLanguage, dispatch),
        changeDate: bindActionCreators(changeDate, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Home)
