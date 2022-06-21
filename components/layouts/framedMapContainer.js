// Layout Component Used to Structure & Contain Framed Maps

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Typography} from "@mui/material";

// Local Imports
import NationalOverviewMap from "../elements/nationalOverviewMap";
import DateFilter from "../elements/dateFilter";
import OverviewMapLegendComponent from "../elements/overviewMapLegend";
import RainfallMap from "../elements/rainfallMap";
import FloodMap from "../elements/floodMap";
import DataTypeFilter from "../elements/dataTypeFilter";
import LocationButtonGroup from "../elements/locationButtonGroup";
import LoadingSkeleton from "../elements/loadingSkeleton";
import RainfallMapLegend from "../elements/rainfallMapLegend";
import GeneralLegend from "../elements/generalLegend";
import uiText from "../../data/ui-text";
import OverviewMapToggleButton from "../elements/overviewMapToggleButton";
import FloodMapLegend from "../elements/floodMapLegend";

// Framed Map Container Component
const FramedMapContainer = ({ mapBoxToken, mapType, ctx, updatePluviometerData, toggleLanguage, updateFloodData }) => {



    const maps = {
        NationalOverview: <NationalOverviewMap mapBoxToken={mapBoxToken}/>,
        RainfallMap: (<Box id={"rainfall-map-wrapper"} sx={{height: `600px`}}><RainfallMap ctx={ctx} mapBoxToken={mapBoxToken}/></Box>),
        FloodMap: <FloodMap ctx={ctx} mapBoxToken={mapBoxToken}/>
    }

    return (
        <MapOuterWrapper>
            {/*INSERT OVERLAPPING COMPONENTS LIKE CHART LEGENDS AND FILTERS HERE */}
            { mapType === "NationalOverview" ? <DataFilterBox><DateFilter positionAbsolute={true}/></DataFilterBox> : null}
            { mapType === "NationalOverview" ? <OverviewMapToggleButton/> : null}
            { mapType === "RainfallMap" || mapType === "FloodMap" ? <LocationButtonGroup positionMode={'absolute'}/> : null}
            { mapType === "RainfallMap" ? <DataTypeBox><DataTypeFilter positionMode={'absolute'}/></DataTypeBox>: null}
            { mapType === "RainfallMap" ? <GeneralLegend locationData={updatePluviometerData.locations}/>: null}
            { mapType === "FloodMap" ? <GeneralLegend floodMap={true} locationData={updateFloodData.locations}/>: null}
            {/*{ mapType === "FloodMap" ? <DataTypeBox><DataTypeFilter positionMode={`absolute`}/></DataTypeBox>: null}*/}

            <MapInnerWrapper>
                { mapType === "NationalOverview" ? <LoadingSkeleton text={uiText.global.labels.overiewMapLoadingText[toggleLanguage.language]} area={'national-overview-map'}/> : null}
                { mapType === "FloodMap" ? <LoadingSkeleton text={uiText.locationPage.floodMap.loadingFloodZones[toggleLanguage.language]} area={'floodzones-data'}/> : null}
                {maps[mapType]}
            </MapInnerWrapper>
        </MapOuterWrapper>
    );
}

const DataTypeBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('1050')]: {
        display: `none`
    },
}))

const DataFilterBox = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('420')]: {
        display: `none`
    },
}))

const MapOuterWrapper = styled(Box)(({theme}) => ({
    position: `relative`,
}))

const MapInnerWrapper = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(5),
    height: `600px`,
    width: `100%`,
    position: `relative`,
    borderRadius: theme.shape.borderRadius,
    outline: `2px solid #E5E5E5`,
    zIndex: `100`,
    [theme.breakpoints.down('md')]: {
        height: `500px`,
    },
}))

const SwitchLocationViewText = styled(Typography)(({theme}) => ({
    position: `absolute`,
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1000,
    fontWeight: theme.typography.fontWeightBold,
}))


export default connect((state) => state)(FramedMapContainer)