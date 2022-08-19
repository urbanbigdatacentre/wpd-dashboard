// Component uses D3 to render a time-series chart of avg daily rainfall for all selected locations

// Package Imports
import {connect} from "react-redux";
import {Box, styled, Typography} from "@mui/material";
import * as d3 from 'd3';
import {usePromiseTracker} from "react-promise-tracker";

// Local Imports
import {useEffect, useState} from "react";
import {locationColorKeys} from "../../data/colorMapping";
import {multiFormat} from "../../data/languageFormatting";

// Style Imports
import styles from '../../styles/modules/location-page/Chart.module.css'
import LoadingSkeleton from "./loadingSkeleton";
import GeneralLegend from "./generalLegend";
import uiText from "../../data/ui-text";
import LocationBox from "./locationBox";

// Rainfall Chart Component
const RainfallChart = ({toggleLanguage, toggleDate, updatePrimaryLocation, updateAdditionalLocation, updatePluviometerData}) => {

    const [legendDataArray, setLegendDataArray] = useState([]);
    const [tooltipData, setTooltipData] = useState({timestamp: "", value: 0, color: '', locationName: ''});

    // Get viewport dimensions
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    useEffect(() => {

        // Select and Clear the Chart
        const svg = d3.select('#rainfall-chart-svg-container')
        svg.selectAll("*").remove();

        // Draw the chart again
        drawChart();

    }, [updatePluviometerData.locations.length, toggleDate.startDate, toggleDate.endDate, toggleLanguage.language])

    // DRAW CHART FUNCTION
    const drawChart = () => {

        // Set Margins
        const chartMargin = {
            left: vw > 900 ? `85` : vw > 600 ? `50` : `35`,
            right: vw > 600 ? `85` : `20`,
            top: vw > 900 ? `75` : vw > 600 ? `50` : `35`,
            bottom: vw > 900 ? `75` : vw > 600 ? `50` : `35`,
        }

        // Determine highest value - 25 used where no value
        let maxValue = 25;

        // Set dynamic height & width according to container
        const height = document.querySelector('#rainfall-chart-svg-container').getBoundingClientRect().height - chartMargin.bottom;
        const width = document.querySelector('#rainfall-chart-svg-container').getBoundingClientRect().width - chartMargin.right;

        // Select SVG
        const svg = d3.select('#rainfall-chart-svg-container');

        // Add Background Color to Chart
        svg.append("rect")
            .attr("width", width - chartMargin.left)
            .attr("height", height - chartMargin.bottom)
            .attr("transform", "translate(" + chartMargin.left + ", " + chartMargin.top + ")")
            .attr("fill", "rgba(229, 229, 229, 0.2)");


        // =========
        // FILTER DATA
        // =========
        const dataArray = updatePluviometerData.locations;
        const completeDataset = [];

        // Ensure that location is one of the primary or additional locations selected by user
        const validateLocation = (fullDataArray) => {

            let temporaryDataArray = [];
            fullDataArray.forEach(function(item) {

                if (item['id'] === updatePrimaryLocation.location['placeid']) {temporaryDataArray.push(item)}
                else {
                    updateAdditionalLocation.locations.filter(location => location['placeid'] === item['id']).length ? temporaryDataArray.push(item) : null}
            })
            return temporaryDataArray;
        }

        // Use the largest possible date range for each location object - and remo
        const filteredDataTwo = validateLocation([... new Set(dataArray)])


        // Draw area - line - circles for every location
        filteredDataTwo.forEach(function(location) {
            // Check for pluviometerData
            if (location.pluviometerData.length) {
                let dataRecords = {}
                // Desired Data Format = {timestamp: x, avgValue: x}
                // Loop through pluviometers
                location.pluviometerData.forEach(function(singlePluviometer, index) {
                    // Loop through individual records
                    const singlePluviometerRecords = {}

                    singlePluviometer.records.forEach(function(record){

                        // Check if {timestamp: x, valueArray: []} exists
                        if (singlePluviometerRecords.hasOwnProperty(new Date(record.timestamp).setHours(0, 0, 0, 0))) {
                            // Filter Out Records not between date ranges
                            if (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)) < new Date(record.timestamp)) {

                                singlePluviometerRecords[new Date(record.timestamp).setHours(0, 0, 0, 0)].push(record.value)
                            }
                        } else {
                            if ((new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)) < new Date(record.timestamp)) && (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)) >= new Date(record.timestamp).setHours(0, 0, 0, 0))) {

                                singlePluviometerRecords[new Date(record.timestamp).setHours(0, 0, 0, 0)] = []
                                singlePluviometerRecords[new Date(record.timestamp).setHours(0, 0, 0, 0)].push(record.value)
                            }
                        }
                    })
                    // Create Daily Totals to Add Single Pluviometer Records Together
                    Object.keys(singlePluviometerRecords).forEach(function(key) {
                        const dailyTotal = singlePluviometerRecords[key].reduce((a, b) => parseInt(a) + parseInt(b), 0)
                        if (dataRecords.hasOwnProperty(key)) {
                            dataRecords[key].push(dailyTotal)
                        } else {
                            dataRecords[key] = []
                            dataRecords[key].push(dailyTotal)
                        }
                    })
                })
                let formattedDataArray = []

                // DETERMINE AVG VALUE FOR EACH DAY
                Object.keys(dataRecords).forEach(function(key) {
                    const singleDataRecord = {timestamp: new Date(d3.timeFormat("%B %d, %Y")(key)), value: dataRecords[key].reduce((acc,v,i,a)=>(acc+v/a.length),0)}
                    singleDataRecord.value > maxValue ? maxValue = singleDataRecord.value : null;
                    formattedDataArray.push(singleDataRecord)
                });

                completeDataset.push({locationID: location.id, locationName: location.locationName, data: formattedDataArray.sort(function (a, b) {return a.timestamp - b.timestamp})})

            }
        })

        setLegendDataArray(filteredDataTwo)


        // ========
        // AXIS AND GRIDLINES
        // ========

        const startDate = new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate))
        const endDate = new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate))

        // Draw X Axis
        const xScale = d3.scaleTime()
            .domain([startDate.setDate(startDate.getDate() - 0.5), endDate.setDate(endDate.getDate() + 1)])
            .range([chartMargin.left, width])
            .nice()


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", styles.chartAxis)
            .call(d3.axisBottom(xScale).ticks(vw > 900 ? 8 : 4).tickPadding(vw > 600 ? 15 : 8).tickFormat((date) => multiFormat(date, toggleLanguage.language)));

        // Draw Y Axis
        const yScale = d3.scaleLinear()
            .domain([0, Math.ceil(maxValue / 10) * 10])
            .range([height, chartMargin.bottom])
            .nice()

        svg.append("g")
            .attr("class", styles.chartAxis)
            .attr("transform", "translate(" + chartMargin.left + ",0)")
            .call(d3.axisLeft(yScale).ticks(vw > 900 ? 8 : 4).tickPadding(vw > 600 ? 15 : 6));

        // Add X Gridlines
        svg.append("g")
            .attr("class", styles.chartGrid)
            .attr("transform", "translate(0," + (height + 10) + ")")
            .call(d3.axisBottom(xScale)
                .ticks(vw > 900 ? 8 : 4)
                .tickSize(-(height - (chartMargin.bottom - 10)))
                .tickFormat("")
            )

        // Add Y Gridlines
        svg.append("g")
            .attr("class", styles.chartGrid)
            .attr("transform", "translate(" + (chartMargin.left - 10) + ",0)")
            .call(d3.axisLeft(yScale)
                .ticks(vw > 900 ? 8 : 4)
                .tickSize(-(width - (chartMargin.left - 10)))
                .tickFormat("")
            )


        // =========
        // CHART RENDERING SECTION
        // ========

        // Render Line - Area - Circles for each location
        completeDataset.forEach(function(singleLocation, index) {
            // Configure Color Keys
            let colorCode;
            let additionalLocationIndex = updateAdditionalLocation.locations.findIndex(function(item) {return item['placeid'] === singleLocation.locationID});

            if (additionalLocationIndex === -1) {
                colorCode = '#2196F3'
            } else {
                colorCode = locationColorKeys[additionalLocationIndex].color;
            }

            // Get number of days in the chart
            const numberOfDays = Math.ceil((xScale.domain()[1] - xScale.domain()[0]) / (1000 * 3600 * 24));
            const barWidth = (xScale.range()[1] - xScale.range()[0]) / (numberOfDays)

            const x1 = d3.scaleBand()
                .domain([2,1,0])
                .rangeRound([0, barWidth])


            // Render Bars
            svg.selectAll('chart-bars')
                .data(singleLocation.data)
                .enter()
                .append('rect')
                .style("cursor", "pointer")
                .attr("fill", colorCode)
                .attr("x", function(d) {

                    return (xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))) - x1(index) + (barWidth / completeDataset.length) - (completeDataset.length > 1 ? barWidth / 6 : 0)

                })
                .attr("y", function(d) {
                    if (d.value === 0) {
                        return yScale(0)
                    } else {
                        return yScale(0)
                    }
                })
                .attr("width", (barWidth / 3))
                .attr("height", function(d) {
                    if (d.value === 0) {
                        return height - yScale(0)
                    } else {
                        return height - yScale(0)
                    }
                })
                .attr("class", "chart-bars")
                .attr("fill-opacity", function (d) {
                    return d.value === 0 ? 0.3 : 1
                })
                .attr("stroke-opacity", function (d) {
                    return d.value === 0 ? 0.3 : 0.5
                })
                .attr("stroke", colorCode)
                .attr("stroke-width", vw > 900 ? `.25` : vw > 600 ? `.75` : `.5`)
                .on("mouseover", function(e, d) {

                    const tooltip = d3.selectAll('#rainfall-chart-box')
                    const mouseLocation = d3.pointer(e)

                    setTooltipData({
                        timestamp: d.timestamp,
                        value: d.value,
                        color: colorCode,
                        locationName: singleLocation.locationName
                    });

                    tooltip
                        .style("display", "block")
                        .style("left", `${mouseLocation[0] + 10}px`)
                        .style("top", `${mouseLocation[1] + 10}px`)
                })
                .on("mouseout", function(d) {
                    const tooltip = d3.selectAll('#rainfall-chart-box')

                    tooltip.transition()
                        .style("display", "none");
                });

            // // Add the area
            // svg.append("path")
            //     .datum(singleLocation.data)
            //     .attr("fill", colorCode)
            //     .attr("class", "area-path")
            //     .attr("fill-opacity", .3)
            //     .attr("stroke", "none")
            //     .attr("d", d3.area()
            //         .x(function(d) {return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            //         .y0(height)
            //         .y1(function(d) {return height})
            //     )
            //
            // // Add the line
            // svg.append("path")
            //     .datum(singleLocation.data)
            //     .attr("fill", "none")
            //     .attr("class", "line-path")
            //     .attr("stroke", colorCode)
            //     .attr("stroke-width", vw > 900 ? `2` : vw > 600 ? `1.5` : `1`)
            //     .attr("d", d3.line()
            //         .x(function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            //         .y(function(d) { return height })
            //     )
            //
            // // Add the dots
            // svg.selectAll("points")
            //     .data(singleLocation.data)
            //     .enter()
            //     .append("circle")
            //     .attr("class", "chart-points")
            //     .attr("fill", colorCode)
            //     .attr("stroke", "none")
            //     .attr("cx", function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            //     .attr("cy", function(d) { return height})
            //     .attr("r", vw > 900 ? `5` : vw > 600 ? `4` : `2`)

            // Animate on Load

            d3.selectAll(".chart-bars")
                .transition()
                .duration(1000)
                .attr("height", function(d) {
                    if (d.value === 0) {
                        return height - yScale(0.5)
                    } else {
                        return height - yScale(d.value)
                    }
                })
                .attr("y", function(d) {
                    if (d.value === 0) {
                        return yScale(0.5)
                    } else {
                        return yScale(d.value)
                    }
                })
                .delay((d,i) => {return i*10})

            // d3.selectAll(".chart-points")
            //     .transition()
            //     .duration(1000)
            //     .attr("cx", function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            //     .attr("cy", function(d) { return yScale(d.value)})
            //
            // d3.selectAll(".line-path")
            //     .transition()
            //     .duration(1000)
            //     .attr("d", d3.line()
            //         .x(function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            //         .y(function(d) { return yScale(d.value) })
            //     )
            //
            // d3.selectAll(".area-path")
            //     .transition()
            //     .duration(1000)
            //     .attr("d", d3.area()
            //         .x(function(d) {return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            //         .y0(height)
            //         .y1(function(d) {return yScale(d.value)})
            //     )
        })

        }


    return (
      <ChartBox>
          {/*ADD KEY IN ABSOLUTE POSITION TO INDICATE MISSING DATA*/}
          <ChartTooltip className={'chart-tooltip'} id={"rainfall-chart-box"} sx={{position: `absolute`, zIndex: 1000000000000}}>
              <LocationBox locationName={tooltipData.locationName} color={tooltipData.color}/>
              <Box sx={{display: `flex`, justifyContent: `space-between`, width: `100%`, marginTop: (theme) => (theme.spacing(1))}}>
                  <TooltipTitle>{uiText.locationPage.rainfallChart.value[toggleLanguage.language] + ":"}</TooltipTitle>
                  <TooltipText>{parseInt(tooltipData.value) + "mm"}</TooltipText>
              </Box>
              <Box sx={{display: `flex`, justifyContent: `space-between`, width: `100%`}}>
                  <TooltipTitle>{uiText.locationPage.rainfallChart.date[toggleLanguage.language] + ":"}</TooltipTitle>
                  <TooltipText>{tooltipData.timestamp.toLocaleString().split(',')[0]}</TooltipText>
              </Box>
          </ChartTooltip>
          <GeneralLegend locationData={legendDataArray}/>
          <LoadingSkeleton area="pluviometer-data" text={uiText.global.labels.timeSeriesLoadingText[toggleLanguage.language]}/>
          <svg
              id={'rainfall-chart-svg-container'}
              style={{
                  height: `100%`,
                  width: `100%`,
                  position: `relative`,
              }}
          >

          </svg>
      </ChartBox>
    );
}


const TooltipText = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightLight,
    fontSize: `14px`,
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

const TooltipTitle = styled(Typography)(({theme}) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: `14px`,
    [theme.breakpoints.down('sm')]: {
        fontSize: `12px`,
    },
}))

const ChartTooltip = styled(Box)(({theme}) => ({
    position: `absolute`,
    display: `none`,
    flexDirection: `column`,
    justifyContent: `center`,
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    maxWidth: `400px`,
    minWidth: `200px`,
    padding: theme.spacing(2),
    boxShadow: `0px 0px 15px #E5E5E5`,
    border: `1.5px solid #E5E5E5`,
    zIndex: 4001,
    [theme.breakpoints.down('md')]: {
        maxWidth: `300px`,
    },
}))

const ChartBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(5),
    height: `600px`,
    width: `100%`,
    position: `relative`,
    borderRadius: theme.shape.borderRadius,
    outline: `2px solid #E5E5E5`,
    zIndex: `100`,
    [theme.breakpoints.down('lg')]: {
        height: `500px`,
    },
    [theme.breakpoints.down('md')]: {
        height: `400px`,
    },
    [theme.breakpoints.down('sm')]: {
        height: `300px`,
    },
}))



export default connect((state) => state)(RainfallChart)
