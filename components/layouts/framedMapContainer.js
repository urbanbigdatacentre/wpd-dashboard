// Layout Component Used to Structure & Contain Framed Maps

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Typography} from "@mui/material";

// Local Imports
import NationalOverviewMap from "../elements/nationalOverviewMap";
import DateFilter from "../elements/dateFilter";
import OverviewMapLegendComponent from "../elements/overviewMapLegend";
import RainfallMap from "../elements/rainfallMap";
import DataTypeFilter from "../elements/dataTypeFilter";
import LocationButtonGroup from "../elements/locationButtonGroup";

// Framed Map Container Component
const FramedMapContainer = ({ mapBoxToken, mapType }) => {

    const maps = {
        NationalOverview: <NationalOverviewMap mapBoxToken={mapBoxToken}/>,
        RainfallMap: <RainfallMap mapBoxToken={mapBoxToken}/>
    }

    return (
        <MapOuterWrapper>
            {/*INSERT OVERLAPPING COMPONENTS LIKE CHART LEGENDS AND FILTERS HERE */}
            { mapType === "NationalOverview" ? <DateFilter positionAbsolute={true}/> : null}
            { mapType === "NationalOverview" ? <OverviewMapLegendComponent/> : null}
            { mapType === "NationalOverview" ? null: <LocationButtonGroup/>}
            { mapType === "RainfallMap" ? <DataTypeFilter/>: null}
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