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

// Framed Map Container Component
const FramedMapContainer = ({ mapBoxToken, mapType, ctx }) => {

    const maps = {
        NationalOverview: <NationalOverviewMap mapBoxToken={mapBoxToken}/>,
        RainfallMap: (<Box id={"rainfall-map-wrapper"} sx={{height: `600px`}}><RainfallMap ctx={ctx} mapBoxToken={mapBoxToken}/></Box>),
        FloodMap: <FloodMap ctx={ctx} mapBoxToken={mapBoxToken}/>
    }

    return (
        <MapOuterWrapper>
            {/*INSERT OVERLAPPING COMPONENTS LIKE CHART LEGENDS AND FILTERS HERE */}
            { mapType === "NationalOverview" ? <DateFilter positionAbsolute={true}/> : null}
            { mapType === "NationalOverview" ? <OverviewMapLegendComponent/> : null}
            { mapType === "NationalOverview" ? null: <LocationButtonGroup positionMode={'absolute'}/>}
            { mapType === "RainfallMap" ? <DataTypeFilter positionMode={'absolute'}/>: null}
            { mapType === "FloodMap" ? <DataTypeFilter positionMode={`absolute`}/>: null}
            <MapInnerWrapper>
                {maps[mapType]}
            </MapInnerWrapper>
        </MapOuterWrapper>
    );
}

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
    zIndex: `100`
}))


export default connect((state) => state)(FramedMapContainer)