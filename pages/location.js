// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Component Imports
import Footer from "../components/modules/footer";
import MyNavbar from "../components/modules/navbar";
import LanguageToggle from "../components/elements/languageToggle";
import CitizenSection from "../components/modules/landing-page/citizenSection";

// State MGMT Imports
import { wrapper } from '../store/store';
import {changeLanguage, changeDate} from "../store/actions";

// Style Imports
import styles from '../styles/modules/Home.module.css'
import {useEffect} from "react";


// Landing Page Component
const Location = (props) => {

    useEffect(() => {
        console.log(props)
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Waterproofing Data</title>
                <meta name="description" content="Connecting Brazilian Flood Data From Communities & Official Sources"/>
            </Head>

            <main className={styles.main}>
                <MyNavbar />
                <LanguageToggle language={props.language}/>
                <CitizenSection mapBoxToken={props.env.MAPBOX_TOKEN} mapStylePlain={true}/>
                <Footer/>

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

const mapStateToProps = (state) => {
    return {
        language: state.toggleLanguage.language
    }
}


export default connect(mapStateToProps)(Location)
