// Statistic Card Component

// Package Imports
import {Card, styled, Typography} from "@mui/material";

// Local Imports

// Stat Card Component
export default function StatCard(props) {

    const marginMode = props.firstInSequence ? `0rem 1rem 0rem 0rem` : `0rem 1rem`;

    return (
      <MyStatCard sx={{margin: marginMode}}>
          <StatCardNumber>{props.number}</StatCardNumber>
          <StatCardText>{props.text}</StatCardText>
      </MyStatCard>
    );
}

const MyStatCard = styled(Card)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    padding: `1rem 1rem`,
    border: `1px solid #E5E5E5`,
    boxShadow: `none`,
    textAlign: `center`,
    width: `max-content`,
    [theme.breakpoints.down('md')]: {
        padding: `.5rem .5rem`,
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