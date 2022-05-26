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
        right: `10`,
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

    // Set dynamic height & width according to container
    const height = 200 - chartMargin.bottom;
    const width = 350 - chartMargin.right;

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
        // AXIS AND GRIDLINES
        // ========

        // Draw X Axis
        const xScale = d3.scaleTime()
            .domain([toggleDate.startDate, toggleDate.endDate])
            .range([chartMargin.left, width])

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", styles.chartAxis)
            .call(d3.axisBottom(xScale).ticks(5).tickPadding(5));

        // Draw Y Axis
        const yScale = d3.scaleLinear()
            .domain([0, Math.ceil(maxValue / 10) * 10])
            .range([height, chartMargin.top])

        svg.append("g")
            .attr("class", styles.chartAxis)
            .attr("transform", "translate(" + chartMargin.left + ",0)")
            .call(d3.axisLeft(yScale).ticks(5).tickPadding(5));

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

        // Add the area
        svg.append("path")
            .datum(data.records)
            .attr("fill", colorCode)
            .attr("class", "area-path")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function(d) {return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                .y0(height)
                .y1(function(d) {return yScale(d.value)})
            )

        // Add the line
        svg.append("path")
            .datum(data.records)
            .attr("fill", "none")
            .attr("class", "line-path")
            .attr("stroke", colorCode)
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
                .y(function(d) { return yScale(d.value) })
            )

        // Add the dots
        svg.selectAll("points")
            .data(data.records)
            .enter()
            .append("circle")
            .attr("class", "chart-points")
            .attr("fill", colorCode)
            .attr("stroke", "none")
            .attr("cx", function(d) { return xScale(new Date(d.timestamp).setHours(0, 0, 0, 0))})
            .attr("cy", function(d) { return yScale(d.value)})
            .attr("r", 2.5)
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
    zIndex: `100`
}))


export default connect((state)=> state)(TooltipChart)