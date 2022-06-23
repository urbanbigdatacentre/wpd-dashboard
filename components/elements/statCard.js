// Statistic Card Component

// Package Imports
import {Card, styled, Typography, Skeleton} from "@mui/material";
import {usePromiseTracker} from "react-promise-tracker";

// Local Imports

// Stat Card Component
export default function StatCard(props) {

    const { promiseInProgress } = usePromiseTracker({area: "place-summary", delay: 0})
    const promiseInProgressTwo = usePromiseTracker({area: "summary", delay: 0});

    const marginMode = props.firstInSequence ? `0rem 1rem 0rem 0rem` : `0rem 1rem`;

    return (
      <MyStatCard sx={{margin: marginMode}}>
          {((!promiseInProgress) && (!promiseInProgressTwo.promiseInProgress)) ? <StatCardNumber>{props.number}</StatCardNumber> : <MyNumberSkeleton/>}
          <StatCardText>{props.text}</StatCardText>
      </MyStatCard>
    );
}

const MyNumberSkeleton = styled(Skeleton)(({theme}) => ({
    height: `3.8rem`,
    width: `80%`,
    [theme.breakpoints.down('md')]: {
        height: `2.8rem`,
        width: `70%`,
    },
}))

const MyStatCard = styled(Card)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: `1rem 1rem`,
    border: `1px solid #E5E5E5`,
    boxShadow: `none`,
    textAlign: `center`,
    width: `max-content`,
    [theme.breakpoints.down('md')]: {
        padding: `.5rem .5rem`,
    },
    [theme.breakpoints.down('550')]: {
        margin: `0 !important`
    },
}))

const StatCardNumber = styled(Typography)(({theme}) => ({
    fontSize: `2.5rem`,
    fontWeight: `900`,
    textAlign: `center`,
    [theme.breakpoints.down('md')]: {
        fontSize: `30px`,
    },
}))

const StatCardText = styled(Typography)(({theme}) => ({
    fontSize: `1rem`,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        fontSize: `15px`,
    },
}))