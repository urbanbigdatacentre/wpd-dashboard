
const EARTH_CIR_METERS = 40075016.686;
const degreesPerMeter = 360 / EARTH_CIR_METERS;

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function latLngToBounds(lat, lng, zoom, width, height){
    const metersPerPixelEW = EARTH_CIR_METERS / Math.pow(2, zoom + 8);
    const metersPerPixelNS = EARTH_CIR_METERS / Math.pow(2, zoom + 8) * Math.cos(toRadians(lat));

    const shiftMetersEW = width/2 * metersPerPixelEW;
    const shiftMetersNS = height/2 * metersPerPixelNS;

    const shiftDegreesEW = shiftMetersEW * degreesPerMeter;
    const shiftDegreesNS = shiftMetersNS * degreesPerMeter;

    // [[south, west], [north, east]]
    return [lng+shiftDegreesNS, lat-shiftDegreesNS, lng-shiftDegreesNS, lat+shiftDegreesEW];
}

export default latLngToBounds;