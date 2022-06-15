// Package imports
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import {wrapper} from "../store/store";

// Local Imports
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <link rel="icon" href="favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#2196F3"/>
                    <meta property="og:title" content="Waterproofing Data"/>
                    <meta property="og:image" content="OGIMAGE.png"/>
                    <meta name="description"
                          content="Connecting Brazilian Flood Data From Communities & Official Sources"/>
                    <meta property="og:type" content="dashboard flooding brazil data"/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    {/* Inject MUI styles first to match with the prepend: true configuration. */}
                    {this.props.emotionStyleTags}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {

    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between
    // all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    // This is important. It prevents emotion to render invalid HTML.
    // See
// https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}

            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};

export default MyDocument;