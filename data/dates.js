// File contains all constant dates used across Date Filter components in WPD web application

export default {
    "now": JSON.stringify(new Date(new Date().getTime()).setHours(0, 0, 0, 0)),
    "24Hours": JSON.stringify(new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)),
    "2Days": JSON.stringify(new Date(new Date().getTime() - (48 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)),
    "7Days": JSON.stringify(new Date(new Date().getTime() - (168 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)),
    "30Days": JSON.stringify(new Date(new Date().getTime() - (720 * 60 * 60 * 1000)).setHours(0, 0, 0, 0)),
    "90Days": JSON.stringify(new Date(new Date().getTime() - (2160 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
}