// WPD Landing Citizen Section Component

// Package Imports
import {connect} from "react-redux";

// Local Imports
import InlineMapContainer from "../../layouts/inlineMapContainer";

// Citizen Section


const CitizenSection = ({ toggleLanguage, mapBoxToken, mapStylePlain, dashboardRender }) => {

    return (
        <>
            <InlineMapContainer mapBoxToken={mapBoxToken} mapStylePlain={mapStylePlain} dashboardRender={dashboardRender}/>
        </>
    );
}



export default connect((state) => state)(CitizenSection)