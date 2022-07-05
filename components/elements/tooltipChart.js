// Tooltip Chart Component to render chart inside map tooltips

// Package Imports
import {connect} from "react-redux";
import {useEffect} from "react";
import * as d3 from "d3";
import {Box, styled} from "@mui/material";
import styles from "../../styles/modules/location-page/TooltipChart.module.css";
import {locationColorKeys} from "../../data/colorMapping";

// Local Imports

// Tooltip Chart Component

const TooltipChart = ({ data, toggleDate }) => {

    useEffect(() => {
        // Select and Clear the Chart
        const svg = d3.select('#tooltip-chart-svg-container')
        svg.selectAll("*").remove();

        // Draw the chart again
        drawChart();

    }, [toggleDate])

    // Set Margins
    const chartMargin = {
        left: `30`,
        right: `30`,
        top: `15`,
        bottom: `25`
    }

    // Determine highest value - 25 used where no value
    let maxValue = 25;

    data['records'].forEach((element, index) => {

        if (parseInt(element['value']) > maxValue) {
            maxValue = element['value']
        }
    })


    // Get viewport dimensions
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    // Set dynamic height & width according to container
    const height = (vw > 900 ? 200: 150) - chartMargin.bottom;
    const width = (vw > 900 ? 350: 260) - chartMargin.right;

    const drawChart = () => {
        // Select SVG
        const svg = d3.select('#tooltip-chart-svg-container');

        // Add Background Color to Chart
        svg.append("rect")
            .attr("width", width - chartMargin.left)
            .attr("height", height - chartMargin.top)
            .attr("transform", "translate(" + chartMargin.left + ", " + chartMargin.top + ")")
            .attr("fill", "rgba(229, 229, 229, 0.2)");

        // ========
        // FILTER OUT DATA RECORDS NOT INSIDE DATE RANGE
        // ========
        const dataRecords = [];

        data.records.forEach(function(item) {
            if ((new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate)) < new Date(item.timestamp)) && (new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate)) >= new Date(item.timestamp).setHours(0, 0, 0, 0))) {
                dataRecords.push(item)
            }
        })

        // ========
        // AXIS AND GRIDLINES
        // ========

        const startDate = new Date(d3.timeFormat("%B %d, %Y")(toggleDate.startDate))
        const endDate = new Date(d3.timeFormat("%B %d, %Y")(toggleDate.endDate))

        // Draw X Axis
        const xScale = d3.scaleTime()
            .domain([startDate.setDate(startDate.getDate() - 0.5), endDate.setDate(endDate.getDate() + 1)])
            .range([chartMargin.left, width])


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", styles.chartAxis)
            .call(d3.axisBottom(xScale).ticks(3).tickPadding(5));

        // Draw Y Axis
        const yScale = d3.scaleLinear()
            .domain([0, Math.ceil(maxValue / 10) * 10])
            .range([height, chartMargin.top])

        svg.append("g")
            .attr("class", styles.chartAxis)
            .attr("transform", "translate(" + chartMargin.left + ",0)")
            .call(d3.axisLeft(yScale).ticks(3).tickPadding(5));

        // Add X Gridlines
        svg.append("g")
            .attr("class", styles.chartGrid)
            .attr("transform", "translate(0," + (height) + ")")
            .call(d3.axisBottom(xScale)
                .ticks(8)
                .tickSize(-(height - (chartMargin.top)))
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

        // Configure Color Keys
        let colorCode = '#2196F3'

        // Get number of days in the chart
        const numberOfDays = Math.ceil((xScale.domain()[1] - xScale.domain()[0]) / (1000 * 3600 * 24));
        const barWidth = (xScale.range()[1] - xScale.range()[0]) / (numberOfDays)

        const x1 = d3.scaleBand()
            .domain([2,1,0])
            .rangeRound([0, barWidth])

        // Render Bars
        svg.selectAll('tooltip-chart-bars')
            .data(dataRecords)
            .enter()
            .append('rect')
            .attr("fill", colorCode)
            .attr("x", function(d) {

                return (xScale(new Date(d.timestamp).setHours(0, 0, 0, 0)))

            })
            .attr("width", (barWidth - 1))
            .attr("height", function(d) {
                if (d.value === "0") {
                    return height - yScale(0.5)
                } else {
                    return height - yScale(d.value)
                }
            })
            .attr("y", function(d) {
                if (d.value === "0") {
                    return yScale(0.5)
                } else {
                    return yScale(d.value)
                }
            })
            .attr("class", "tooltip-chart-bars")
            .attr("fill-opacity", function (d) {
                return d.value === "0" ? 0.3 : 1
            })



        // // Add the area
        // svg.append("path")
        //     .datum(dataRecords)
        //     .attr("fill", colorCode)
        //     .attr("class", "area-path")
        //     .attr("fill-opacity", .3)
        //     .attr("stroke", "none")
        //     .attr("d", d3.area()
        //         .x(function(d) {return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
        //         .y0(height)
        //         .y1(function(d) {return yScale(d.value)})
        //     )
        //
        // // Add the line
        // svg.append("path")
        //     .datum(dataRecords)
        //     .attr("fill", "none")
        //     .attr("class", "line-path")
        //     .attr("stroke", colorCode)
        //     .attr("stroke-width", 2)
        //     .attr("d", d3.line()
        //         .x(function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
        //         .y(function(d) { return yScale(d.value) })
        //     )
        //
        // Add the dots
        // svg.selectAll("points")
        //     .data(dataRecords)
        //     .enter()
        //     .append("circle")
        //     .attr("class", "chart-points")
        //     .attr("fill", colorCode)
        //     .attr("stroke", "none")
        //     .attr("cx", function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
        //     .attr("cy", function(d) { return yScale(d.value)})
        //     .attr("r", 2.5)
    }


    return (
        <TooltipChartBox>
            <svg
                id={'tooltip-chart-svg-container'}
                style={{
                    height: `100%`,
                    width: `100%`,
                }}
            >

            </svg>
        </TooltipChartBox>
    )
}


const TooltipChartBox = styled(Box)(({theme}) => ({
    marginTop: theme.spacing(2),
    height: `200px`,
    width: `100%`,
    position: `relative`,
    borderRadius: theme.shape.borderRadius,
    outline: `2px solid #E5E5E5`,
    zIndex: 4000,
    [theme.breakpoints.down('md')]: {
        height: `150px`,
    },
}))


export default connect((state)=> state)(TooltipChart)