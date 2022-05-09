// Component uses D3 to render a time-series chart of avg daily rainfall for all selected locations

// Package Imports
import {connect} from "react-redux";
import {Box, styled} from "@mui/material";
import * as d3 from 'd3';

// Local Imports
import useD3 from '../../hooks/useD3';
import {useEffect} from "react";
import dummyRainfallData from "../../data/dummyRainfallData";

// Style Imports
import styles from '../../styles/modules/location-page/Chart.module.css'

// Rainfall Chart Component
const RainfallChart = ({toggleLanguage, toggleDate}) => {

    useEffect(() => {
        // Select and Clear the Chart
        const svg = d3.select('#rainfall-chart-svg-container')
        svg.selectAll("*").remove();

        // Draw the chart again
        drawChart();
    })

    // DRAW CHART FUNCTION
    const drawChart = () => {

        // Set Margins
        const chartMargin = {
            left: `75`,
            right: `75`,
            top: `75`,
            bottom: `75`
        }

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
            .domain([0,100])
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
        // Add the area
        svg.append("path")
            .datum(dummyRainfallData)
            .attr("fill", "#2196F3")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function(d) { return xScale(new Date(d.timestamp))})
                .y0(height )
                .y1(function(d) { return yScale(d.value) })
            )

        // Add the line
        svg.append("path")
            .datum(dummyRainfallData)
            .attr("fill", "none")
            .attr("stroke", "#2196F3")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function(d) { return xScale(new Date(d.timestamp))})
                .y(function(d) { return yScale(d.value) })
            )

        // Add the dots
        svg.selectAll("points")
            .data(dummyRainfallData)
            .enter()
            .append("circle")
            .attr("fill", "#2196F3")
            .attr("stroke", "none")
            .attr("cx", function(d) { return xScale(new Date(d.timestamp))})
            .attr("cy", function(d) { return yScale(d.value)})
            .attr("r", 5)


    }



    return (
      <ChartBox >
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
