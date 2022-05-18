// Top Level Application Wrapper

// Package Imports
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

// Local Imports
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { wrapper } from "../store/store";

// CSS Imports
import styles from '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';

// Client-side cache shared for the whole session
// of the user in the browser

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const { Component, emotionCache =
        clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>

                <CssBaseline />
                <Component {...pageProps} />
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


