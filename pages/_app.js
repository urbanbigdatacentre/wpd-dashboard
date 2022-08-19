// Top Level Application Wrapper

// Package Imports
import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import Script from "next/script";
import {CookiesBanner} from "@urbanbigdatacentre/data-blocks";

// Local Imports
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { wrapper } from "../store/store";


// CSS Imports
import 'mapbox-gl/dist/mapbox-gl.css';
import uiText from "../data/ui-text";
import {useEffect, useState} from "react";
import styles from '../styles/globals.css'

// ==================
// RUN ACCESSIBILITY TESTS
// ==================
// if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
//     const ReactDOM = require('react-dom');
//     const axe = require('@axe-core/react');
//     axe(React, ReactDOM, 1000);
// }

// Client-side cache shared for the whole session
// of the user in the browser
const clientSideEmotionCache = createEmotionCache();

// ==================
// APP WRAPPER
// ==================

function MyApp(props) {
    const { Component, emotionCache =
        clientSideEmotionCache, pageProps } = props;

    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        let title = window.location.hostname.includes('dados') ? uiText.global.labels.projectTitle['br'] : uiText.global.labels.projectTitle['br'];
        setPageTitle(title)
        document.title = title;
    }, [pageTitle])


    return (
        <CacheProvider value={emotionCache}>

            <Script strategy="lazyOnload" id={'google-tag-manager-tag'} src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

            <Script strategy="lazyOnload" id={'google-analytics-tag'}>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>

            <ThemeProvider theme={theme}>

                <CssBaseline />
                <Component {...pageProps} />
                <CookiesBanner color={'#2196F3'}/>
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

// Wrap App in next-redux-wrapper to provide global state
export default wrapper.withRedux(MyApp);


