// Component used to render loading screen over chart or visualisation as promise for data is resolved

// Package imports
import {connect} from "react-redux";
import {Skeleton, styled, Typography, Box} from "@mui/material";
import uiText from "../../data/ui-text";
import {usePromiseTracker} from "react-promise-tracker";

// Local Imports


// Loading Component
const LoadingSkeleton = ({toggleLanguage, area}) => {

    const { promiseInProgress } = usePromiseTracker({area: area, delay: 500});

    return (

        promiseInProgress && (
            <LoadingBox>
                <LoadingText>{uiText.global.labels.loadingData[toggleLanguage.language].toUpperCase()}<span className={'bluePunctuation'}> ...</span></LoadingText>
                <CustomSkeleton variant={"rectangular"} width={`100%`} height={`100%`}/>
            </LoadingBox>
        )
    );
}

const LoadingBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    top: `0`,
    width: `100%`,
    height: `100%`
}))

const LoadingText = styled(Typography)(({theme}) => ({
    position: `absolute`,
    width: `100%`,
    textAlign: `center`,
    top: `40%`,
    left: `0%`,
    right: `0%`,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `35px`

}))

const CustomSkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,

}))

export default connect((state) => state)(LoadingSkeleton)