// File used for function to correctly format citizenEventsData for use in Maps and Carousel Components

import locationPaths from "../data/locationPaths";

const formatCitizenEventsData = (locationObj, arrayPath) => {

    const mapData = [];

    typeof(locationObj[arrayPath]) !== 'undefined' ? locationObj[arrayPath].forEach(function(item) {
        let formattedItem = {
            coordinates: [item.longitude, item.latitude],
            citizenType: locationPaths[item['organisationtype']],
            locationName: item['locationame'],
            submissionID: item['submissionid'],
            submissionText: item['submissiontext'],
            timestamp: item['submissiontimestamp']

        }
        mapData.push(formattedItem)

    }) : null;

    return mapData;
}

export default formatCitizenEventsData;