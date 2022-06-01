// Component used to render loading screen over chart or visualisation as promise for data is resolved

// Package imports
import {connect} from "react-redux";
import {Skeleton, styled, Typography, Box, LinearProgress} from "@mui/material";
import uiText from "../../data/ui-text";
import {usePromiseTracker} from "react-promise-tracker";
import Image from 'next'

// Local Imports


// Loading Component
const LoadingSkeleton = ({toggleLanguage, area, text}) => {

    const { promiseInProgress } = usePromiseTracker({area: area, delay: 500});

    return (

        promiseInProgress && (
            <LoadingBox>
                <LoadingSubTitle variant={'topBlue'}>{uiText.global.labels.holdOn[toggleLanguage.language]}<span className={'bluePunctuation'}> ...</span></LoadingSubTitle>
                <LoadingText>{text.toUpperCase()}<span className={'bluePunctuation'}> ...</span></LoadingText>
                <MyProgressBar />
                <CustomSkeleton variant={"rectangular"} width={`100%`} height={`100%`}/>
            </LoadingBox>
        )
    );
}

const LoadingBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    top: `0`,
    width: `100%`,
    height: `100%`,
    zIndex: 90000000000,
}))

const LoadingText = styled(Typography)(({theme}) => ({
    position: `absolute`,
    width: `100%`,
    textAlign: `center`,
    top: `40%`,
    left: `0%`,
    right: `0%`,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `45px`,

}))

const MyProgressBar = styled(LinearProgress)(({theme}) => ({
    width: `40%`,
    left: `30%`,
    right: `30%`,
    top: `55%`,
    backgroundColor: `linear-gradient(102.35deg, #1565C0 0%, #2196F3 100%)`
}))

const LoadingSubTitle = styled(Typography)(({theme}) => ({
    position: `absolute`,
    width: `100%`,
    textAlign: `center`,
    top: `32.5%`,
    left: `0%`,
    right: `0%`,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `25px`,
    zIndex: 9000000,

}))



const CustomSkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    zIndex: 8000000,

}))

export default connect((state) => state)(LoadingSkeleton)