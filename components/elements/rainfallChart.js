// Component uses D3 to render a time-series chart of avg daily rainfall for all selected locations

// Package Imports
import {connect} from "react-redux";
import {Box, styled} from "@mui/material";
import * as d3 from 'd3';
import {usePromiseTracker} from "react-promise-tracker";

// Local Imports
import {useEffect, useState} from "react";
import {locationColorKeys} from "../../data/colorMapping";

// Style Imports
import styles from '../../styles/modules/location-page/Chart.module.css'
import LoadingSkeleton from "./loadingSkeleton";
import GeneralLegend from "./generalLegend";
import uiText from "../../data/ui-text";

// Rainfall Chart Component
const RainfallChart = ({toggleLanguage, toggleDate, updatePrimaryLocation, updateAdditionalLocation, updatePluviometerData}) => {

    const [legendDataArray, setLegendDataArray] = useState([]);

    console.log("Executing A")

    useEffect(() => {
        console.log("Executing B")

        // Select and Clear the Chart
        const svg = d3.select('#rainfall-chart-svg-container')
        svg.selectAll("*").remove();

        // Draw the chart again
        drawChart();

    }, [updatePluviometerData.locations.length, toggleDate.startDate, toggleDate.endDate])

    // DRAW CHART FUNCTION
    const drawChart = () => {

        // Set Margins
        const chartMargin = {
            left: `85`,
            right: `85`,
            top: `75`,
            bottom: `75`
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
            .attr("width", width - chartMargin.right)
            .attr("height", height - chartMargin.bottom)
            .attr("transform", "translate(" + chartMargin.left + ", " + chartMargin.top + ")")
            .attr("fill", "rgba(229, 229, 229, 0.2)");


        // =========
        // FILTER DATA
        // =========
        const dataArray = [];
        const completeDataset = [];

        updatePluviometerData.locations.forEach(function(location) {
            // Check if there are multiple entries for one location - return the one with the biggest start date
            // OR SIMPLY REMOVE THE OLD ONE INSIDE THE REDUX STORE
            // NOTE - CURRENTLY DOESN'T CONSIDER END DATE
            const sameIDArray = updatePluviometerData.locations.filter(function(d) {return (d.id === location.id)})
            // If there is more than one - push the one with the highest timestamp
            if (sameIDArray.length > 1) {
                const maxTimestamp = sameIDArray.filter(function(d) {return d['startDate'] >= location['startDate']})
                maxTimestamp.length ? dataArray.push(maxTimestamp[0]) : null
            } else {
                dataArray.push(location)
            }
        })

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
                location.pluviometerData.forEach(function(singlePluviometer) {
                    // Loop through individual records
                    singlePluviometer.records.forEach(function(record){
                        // Check if {timestamp: x, valueArray: []} exists
                        if (dataRecords.hasOwnProperty(new Date(record.timestamp).setHours(0, 0, 0, 0))) {
                            dataRecords[new Date(record.timestamp).setHours(0, 0, 0, 0)].push(record.value)
                        } else {
                            dataRecords[new Date(record.timestamp).setHours(0, 0, 0, 0)] = []
                            dataRecords[new Date(record.timestamp).setHours(0, 0, 0, 0)].push(record.value)
                        }
                    })
                })
                let formattedDataArray = [];
                // DETERMINE AVG VALUE FOR EACH TIME
                Object.keys(dataRecords).forEach(function(key) {
                    const singleDataRecord = {timestamp: new Date(d3.timeFormat("%B %d, %Y")(key)), value: dataRecords[key].reduce((acc,v,i,a)=>(acc+v/a.length),0)}
                    singleDataRecord.value > maxValue ? maxValue = singleDataRecord.value : null;
                    formattedDataArray.push(singleDataRecord)
                });

                completeDataset.push({locationID: location.id, data: formattedDataArray.sort(function (a, b) {return a.timestamp - b.timestamp})})

            }
        })

        setLegendDataArray(filteredDataTwo)


        // ========
        // AXIS AND GRIDLINES
        // ========

        // Draw X Axis
        const xScale = d3.scaleTime()
            .domain([toggleDate.startDate, toggleDate.endDate])
            .range([chartMargin.left, width])

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", styles.chartAxis)
            .call(d3.axisBottom(xScale).ticks(8).tickPadding(15));

        // Draw Y Axis
        const yScale = d3.scaleLinear()
            .domain([0, Math.ceil(maxValue / 10) * 10])
            .range([height, chartMargin.bottom])

        svg.append("g")
            .attr("class", styles.chartAxis)
            .attr("transform", "translate(" + chartMargin.left + ",0)")
            .call(d3.axisLeft(yScale).ticks(5).tickPadding(15));

        // Add X Gridlines
        svg.append("g")
            .attr("class", styles.chartGrid)
            .attr("transform", "translate(0," + (height + 10) + ")")
            .call(d3.axisBottom(xScale)
                .ticks(16)
                .tickSize(-(height - (chartMargin.bottom - 10)))
                .tickFormat("")
            )

        // Add Y Gridlines
        svg.append("g")
            .attr("class", styles.chartGrid)
            .attr("transform", "translate(" + (chartMargin.left - 10) + ",0)")
            .call(d3.axisLeft(yScale)
                .ticks(5)
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

            // Add the area
            svg.append("path")
                .datum(singleLocation.data)
                .attr("fill", colorCode)
                .attr("class", "area-path")
                .attr("fill-opacity", .3)
                .attr("stroke", "none")
                .attr("d", d3.area()
                    .x(function(d) {return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                    .y0(height)
                    .y1(function(d) {return height})
                )

            // Add the line
            svg.append("path")
                .datum(singleLocation.data)
                .attr("fill", "none")
                .attr("class", "line-path")
                .attr("stroke", colorCode)
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                    .y(function(d) { return height })
                )

            // Add the dots
            svg.selectAll("points")
                .data(singleLocation.data)
                .enter()
                .append("circle")
                .attr("class", "chart-points")
                .attr("fill", colorCode)
                .attr("stroke", "none")
                .attr("cx", function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                .attr("cy", function(d) { return height})
                .attr("r", 5)

            // Animate on Scroll

            d3.selectAll(".chart-points")
                .transition()
                .duration(1000)
                .attr("cx", function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                .attr("cy", function(d) { return yScale(d.value)})

            d3.selectAll(".line-path")
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                    .y(function(d) { return yScale(d.value) })
                )

            d3.selectAll(".area-path")
                .transition()
                .duration(1000)
                .attr("d", d3.area()
                    .x(function(d) {return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                    .y0(height)
                    .y1(function(d) {return yScale(d.value)})
                )
        })

        }


    return (
      <ChartBox >
          {/*ADD KEY IN ABSOLUTE POSITION TO INDICATE MISSING DATA*/}
          <GeneralLegend locationData={legendDataArray}/>
          <LoadingSkeleton area="pluviometer-data" text={uiText.global.labels.timeSeriesLoadingText[toggleLanguage.language]}/>
          <svg
              id={'rainfall-chart-svg-container'}
              style={{
                  height: `100%`,
                  width: `100%`,
              }}
          >

          </svg>
      </ChartBox>
    );
}

const ChartBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(5),
    height: `600px`,
    width: `100%`,
    position: `relative`,
    borderRadius: theme.shape.borderRadius,
    outline: `2px solid #E5E5E5`,
    zIndex: `100`
}))



export default connect((state) => state)(RainfallChart)
