// Page Component - Renders landing page

// Package Imports
import Head from 'next/head'
import Link from 'next/link'

// Local Imports
import styles from '../styles/modules/Home.module.css'
import Footer from "../components/modules/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Waterproofing Data</title>
        <meta name="description" content="Connecting " />
      </Head>

      <main className={styles.main}>
            <h1 className={styles.title}>
              Waterproofing Data
                <span className={"bluePunctuation"}>.</span>
            </h1>

          <Footer/>

      </main>

    </div>
  )
}
