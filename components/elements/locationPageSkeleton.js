// Skeleton Page to Render whilst initial Location is loading

// Package Imports
import {connect} from "react-redux";
import {Skeleton, styled, Container, Box} from "@mui/material";
import React from "react";

// Local Imports

// Location Skeleton Component

const LocationPageSkeleton = ({}) => {
    return (
        <LocationPageSkeletonContainer>
            <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
            <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
            <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
            <MySkeleton variant={'rectangular'} height={`15px`} width={`45%`}/>
            <MySkeleton variant={'rectangular'} height={`15px`} width={`32%`}/>
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
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`150px`} width={`250px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`150px`} width={`250px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`150px`} width={`250px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2)), marginLeft: (theme) => (theme.spacing(6))}} variant={'rectangular'} height={`150px`} width={`300px`}/>
                <MySkeleton sx={{marginRight: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`150px`} width={`300px`}/>
            </ControlPanelDashboardBox>
            <MapBox>
                <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
                <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`600px`} width={`100%`}/>
            </MapBox>
            <MapBox>
                <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
                <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`600px`} width={`100%`}/>
            </MapBox>
            <MapBox>
                <MySkeleton variant={'rectangular'} height={`10px`} width={`5%`}/>
                <MySkeleton variant={'rectangular'} height={`60px`} width={`40%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`10px`} width={`30%`}/>
                <MySkeleton sx={{marginTop: (theme) => (theme.spacing(2)), marginBottom: (theme) => (theme.spacing(2))}} variant={'rectangular'} height={`600px`} width={`100%`}/>
            </MapBox>

        </LocationPageSkeletonContainer>
    )
}

const LocationPageSkeletonContainer = styled(Container)(({theme}) => ({
    marginTop: theme.spacing(20)
}))

const ControlPanelNavBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(20),
    width: `100%`,
}))

const ControlPanelButtonBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    display: `flex`,
    width: `100%`,
    justifyContent: `space-between`
}))

const ControlPanelDashboardBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    display: `flex`,
    width: `100%`,
    justifyContent: `space-between`,
    alignItems: `center`
}))

const MapBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(12),
    width: `100%`,
    justifyContent: `space-between`,
    alignItems: `center`
}))

const ControlPanelWeatherBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(10),
    display: `flex`,
    width: `50%`,
    justifyContent: `space-between`
}))

const MySkeleton = styled(Skeleton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba(22, 22, 22, 0.3)`,
    marginTop: `10px`,
}))

export default connect((state)=>state)(LocationPageSkeleton)