// WPD Landing Citizen Section Component

// Package Imports
import {connect} from "react-redux";

// Local Imports
import InlineMapContainer from "../../layouts/inlineMapContainer";

// Citizen Section


const CitizenSection = ({ toggleLanguage, mapBoxToken, mapStylePlain }) => {

    return (
        <>
            <InlineMapContainer mapBoxToken={mapBoxToken} mapStylePlain={mapStylePlain} />
        </>
    );
}



export default connect((state) => state)(CitizenSection)