// General Legend Component

// Package Imports
import {connect} from "react-redux";
import {Box, Divider, IconButton, styled, Typography} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import * as d3 from "d3";

// Local Imports
import uiText from "../../data/ui-text";
import {locationColorKeys} from "../../data/colorMapping";
import {useState} from "react";

// General Legend Component
const GeneralLegend = ({locationData, toggleLanguage, toggleDate}) => {

    const [menuOpen, setMenuOpenStatus] = useState(false);

    const handleClose = () => {
        setMenuOpenStatus(false)
    }

    const handleOpen = () => {
        setMenuOpenStatus(true)
    }

    const calculateMeasurements = (dataItem) => {
        let totalMeasurements = 0

        dataItem['pluviometerData'].forEach(function(singlePluviometer) {
            totalMeasurements += singlePluviometer.hasOwnProperty('records') ?  singlePluviometer.records.length : 0
        })

        return totalMeasurements;
    }

    return (

        <LegendWrapperBox>
            <Box id={"open-menu"} sx={{display: menuOpen ? `block` : `none`}}>
                {/*SECTION DISPLAYED ON MENU OPEN*/}
                <MyIconButton onClick={handleClose} color={"primary"}>
                    <DoubleArrowRoundedIcon fontSize={"small"}/>
                </MyIconButton>
                <LegendMetaInfoBox>
                    <Typography sx={{fontWeight: (theme) => (theme.typography.fontWeightBold)}}>{uiText.global.tooltips.dataOverview[toggleLanguage.language].toUpperCase()}</Typography>
                    <DateRangeText>{new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)).toDateString() + " - " + new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)).toDateString()}</DateRangeText>
                </LegendMetaInfoBox>
                {
                    locationData.length ? locationData.map((item, index) => {

                        const colorCode = index === 0 ? '#2196F3' : locationColorKeys[index - 1]

                        return (
                            <LegendItemBox key={index}>
                                <LegendLocationName sx={{color: colorCode}}>{item['locationName'].toUpperCase()}</LegendLocationName>
                                <Divider sx={{width: `100%`, margin: `4px 0 2px 0`}}/>
                                <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{item['pluviometerData'].length + " " + uiText.global.tooltips.pluviometers[toggleLanguage.language].toUpperCase()}</LegendDataText>
                                <LegendDataText sx={{fontWeight: (theme) => (theme.typography.fontWeightLight),}}>{calculateMeasurements(item) + " " + uiText.global.tooltips.meausurements[toggleLanguage.language].toUpperCase()}</LegendDataText>
                            </LegendItemBox>
                        )
                    }) : null
                }
            </Box>
            <Box id={'closed-menu'} sx={{display: menuOpen ? `none` : `flex`}}>
                {/*SECTION DISPLAYED ON MENU CLOSED*/}
                <MyIconButton onClick={handleOpen} color={"primary"}>
                    <DoubleArrowRoundedIcon fontSize={"small"} sx={{transform: `rotate(180deg)`}}/>
                </MyIconButton>
            </Box>

        </LegendWrapperBox>
    );
}

const LegendWrapperBox = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    zIndex: 600,
    height: `100%`,
    maxWidth: theme.spacing(35),
    right: `1px`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    paddingRight: theme.spacing(3.5),
    filter: `drop-shadow(-4px 0px 8px rgba(33, 150, 243, 0.1))`
}))

const LegendMetaInfoBox = styled(Box)(({theme}) => ({

}))

const LegendItemBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(3),
}))

const LegendDataText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    fontWeight: theme.typography.fontWeightLight,
}))

const LegendLocationName = styled(Typography)(({theme}) => ({
    fontSize: `14px`,
    fontWeight: theme.typography.fontWeightBold
}))

const DateRangeText = styled(Typography)(({theme}) => ({
    fontSize: `12px`,
    fontWeight: theme.typography.fontWeightLight
}))

const MyIconButton = styled(IconButton)(({theme}) => ({
    position: `absolute`,
    top: theme.spacing(1),
    right: theme.spacing(1),
}))

export default connect((state) => state)(GeneralLegend);