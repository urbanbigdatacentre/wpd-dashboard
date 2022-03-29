// File contains footer module
// Used globally across UI

// Package Imports
import React from 'react'
import Image from "next/image";
// Local Imports
import Link from 'next/link';
import styles from "../../styles/modules/Home.module.css";


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>© UBDC, University of Glasgow | 2022</p>
            <span className={styles.logo}>
            {/*<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />*/}
          </span>
        </footer>
    );
}