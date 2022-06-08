// Cookies Component to Render Cookies Banner
// Complies with Google Analytics - Will Accept Cookies and Set Expiration Date for 1 year from now

// Package Imports
import {Box, Container, styled, Typography, Button} from "@mui/material";
import {useEffect, useState} from "react";

// Cookies Banner Component
const CookiesBanner = ({}) => {

    const [cookieConsent, setCookieConsent] = useState(false)

    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )

    useEffect(() => {

        const documentCookiesConsent = getCookieValue('CookieConsent') ? true : Boolean(0)

        setCookieConsent(documentCookiesConsent)

    }, [cookieConsent])


    const handleClick = () => {
        let expires = "expires=" + new Date(new Date().setDate(new Date().getDate() + 365)).toUTCString();
        document.cookie = `CookieConsent=true;${expires}`
        setCookieConsent(true)
    }

    return (
        !cookieConsent && (
            <CookiesContainer>
                <CookiesTextBox>
                    <CookiesText>This site uses cookies.</CookiesText>
                    <CookiesText>By continuing to browse you are agreeing to the use of cookies detailed in our <span><a href={"https://ubdc.ac.uk/privacy-and-cookies/"} target={"_blank"}>privacy policy</a>.</span></CookiesText>
                </CookiesTextBox>
                <CustomButton onClick={handleClick} variant={'contained'}>Accept & Continue</CustomButton>
            </CookiesContainer>

        )
    );
}

const CookiesContainer = styled(Container)(({theme}) => ({
    maxWidth: `90%`,
    backgroundColor: `#fff`,
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0px 8px 15px 0px rgba(0, 0, 0, 0.10)`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: `fixed`,
    bottom: theme.spacing(2),
    left: 0,
    right: 0,
    marginLeft: `auto`,
    marginRight: `auto`,
    zIndex: `10000000`
}))

const CookiesTextBox = styled(Box)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
}))

const CookiesText = styled(Typography)(({theme}) => ({
    fontSize: `14px`,
    textAlign: `left`,
    fontWeight: theme.typography.fontWeightLight,
    color: `#888888`,
    [theme.breakpoints.down('md')] : {
        fontSize: `10px`
    }
}))


const CustomButton = styled(Button)(({theme}) => ({
    width: `max-content !important`,
    minWidth: `150px`,
    fontSize: `12px`,
    height: `min-content`,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')] : {
        fontSize: `10px`,
        minWidth: `145px`,
    },
    [theme.breakpoints.down('sm')] : {
        fontSize: `8px`,
        minWidth: `125px`,
    }
}))

export default CookiesBanner;
