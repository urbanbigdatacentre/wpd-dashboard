// Statistic Card Component

// Package Imports
import {Card, styled, Typography} from "@mui/material";

// Local Imports

// Stat Card Component
export default function StatCard(props) {
    return (
      <MyStatCard>
          <StatCardNumber>{props.number}</StatCardNumber>
          <StatCardText>{props.text}</StatCardText>
      </MyStatCard>
    );
}

const MyStatCard = styled(Card)(({theme}) => ({
    display: `flex`,
    flexDirection: `column`,
    padding: `1rem 1.5rem`,
    border: `1px solid #E5E5E5`,
    boxShadow: `none`,
    margin: `0rem 1rem`
}))

const StatCardNumber = styled(Typography)(({theme}) => ({
    fontSize: `40px`,
    fontWeight: `900`,
    textAlign: `center`
}))

const StatCardText = styled(Typography)(({theme}) => ({
    fontSize: `1.25rem`,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main
}))