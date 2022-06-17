// Skeleton Page to Render whilst initial Location is loading

// Package Imports
import {connect} from "react-redux";
import {Skeleton, styled, Container, Box} from "@mui/material";
import React from "react";

// Local Imports

// Location Skeleton Component

const LocationPageSkeleton = ({}) => {

    // Get viewport dimensions
    let vw = 0;
    let vh = 0;
    if (typeof window === `object`) {
        vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    }

    return (
        <LocationPageSkeletonContainer>
            <MySkeleton variant={'rectangular'} height={`10px`} width={vw > 600 ? `5%`: `20%`}/>
            <MySkeleton variant={'rectangular'} height={`60px`} width={vw > 600 ? `40%`: `70%`}/>
            <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={vw > 600 ? `30%`: `60%`}/>
            <MySkeleton variant={'rectangular'} height={`15px`} width={vw > 600 ? `45%`: `75%`}/>
            <MySkeleton variant={'rectangular'} height={`15px`} width={vw > 600 ? `32%`: `60%`}/>
            <ControlPanelNavBox>
                <MySkeleton variant={'rectangular'} height={`15px`} width={`7%`}/>
                <ControlPanelButtonBox>
                    <Box sx={{display: `flex`}}>
                        <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`30px`} width={`130px`}/>
                        <MySkeleton variant={'rectangular'} height={`30px`} width={`130px`}/>
                    </Box>
                    <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2)), marginLeft: (theme) => (theme.spacing(6))}} variant={'rectangular'} height={`30px`} width={`250px`}/>
                </ControlPanelButtonBox>
            </ControlPanelNavBox>
            <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2)), marginTop: (theme) => (theme.spacing(10))}} variant={'rectangular'} height={`20px`} width={`150px`}/>
            <ControlPanelDashboardBox>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `150px`: `80px`} width={`250px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `150px`: `80px`} width={`250px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `150px`: `80px`} width={`250px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `150px`: `80px`} width={`300px`}/>
            </ControlPanelDashboardBox>
            <MapBox>
                <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
                <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `500px`: `250px`} width={`100%`}/>
            </MapBox>
            <MapBox>
                <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
                <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `500px`: `250px`} width={`100%`}/>
            </MapBox>
            <MapBox>
                <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
                <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={vw > 900 ? `500px`: `250px`} width={`100%`}/>
            </MapBox>

        </LocationPageSkeletonContainer>
    )
}

const LocationPageSkeletonContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(10),
    },
}))

const ControlPanelNavBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(20),
    width: `100%`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(10),
    },
}))

const ControlPanelButtonBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    display: `flex`,
    width: `100%`,
    justifyContent: `space-between`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
    },
}))

const ControlPanelDashboardBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    display: `flex`,
    width: `100%`,
    justifyContent: `space-between`,
    alignItems: `center`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
    },
}))

const MapBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(12),
    width: `100%`,
    justifyContent: `space-between`,
    alignItems: `center`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(6),
    },

}))

const ControlPanelWeatherBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(10),
    display: `flex`,
    width: `50%`,
    justifyContent: `space-between`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(6),
    },
}))

const MySkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba(22, 22, 22, 0.3)`,
    marginTop: `10px`,
    [theme.breakpoints.down('sm')]: {
        width: `10px`
    },
}))

export default connect((state)=>state)(LocationPageSkeleton)