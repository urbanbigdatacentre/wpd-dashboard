// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'

// Local Imports
import styles from '../styles/modules/Home.module.css'
import Footer from "../components/modules/footer";
import Navbar from "../components/modules/navbar";
import MyNavbar from "../components/modules/navbar";
import LandingHeroSection from "../components/modules/landing-page/landingHero";

// Style Imports
import {Typography} from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Waterproofing Data</title>
        <meta name="description" content="Connecting Brazillian Flood Data From Communities & Official Sources"/>
      </Head>

      <main className={styles.main}>
          <MyNavbar />
          <LandingHeroSection />

          {/*<Footer/>*/}

      </main>

    </div>
  )
}
