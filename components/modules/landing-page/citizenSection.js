// WPD Landing Citizen Section Component

// Package Imports
import {connect} from "react-redux";

// Local Imports
import InlineMapContainer from "../../layouts/inlineMapContainer";

// Citizen Section


const CitizenSection = ({ toggleLanguage, mapBoxToken }) => {
    return (
        <>
            <InlineMapContainer mapBoxToken={mapBoxToken}/>
        </>
    );
}


export default connect((state) => state)(CitizenSection)