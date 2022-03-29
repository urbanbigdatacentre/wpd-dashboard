// Provides main layout for all pages
// Can be used to hold state

import '../styles/globals.css'
import '../styles/design_tokens.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
