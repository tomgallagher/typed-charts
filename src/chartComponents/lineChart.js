import React, { useEffect, useRef } from 'react';
import { select, line, curveCardinal, max, axisBottom, axisLeft, scaleLinear } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

//https://muratorium.com/using-react-hooks-with-d3

export const LineChart = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    // will be called initially and on every data change
    useEffect(() => {
        //we need to collect the SVG reference
        const svg = select(svgRef.current);
        //if the wrapper has not been measured then return, otherwise we get an error
        if (!dimensions) return;

        //start with the scales - they change your data into a visual respresentation of the data
        const xScale = scaleLinear()
            //domain = input, how many data points are we trying to chart, x scale on LINE CHART is usually the number of data points MINUS ONE, as we start at 0
            .domain([0, data.length - 1])
            //range = output, where on the x scale of the svg should we be charting - here it is from the far left to the far right, responsive to width
            .range([0, dimensions.width]);

        const yScale = scaleLinear()
            //domain = input, we want to have the max value plus
            .domain([0, max(data, (entry) => entry.value)])
            //range = output, where on the y axis we should start and finish, note the INVERSION OF DOMAIN AND RANGE to plot y values
            .range([dimensions.height, 0]);

        const xAxis = axisBottom(xScale)
            //we can set it to data length or sample
            .ticks(data.length)
            //this prevents decimals on whole numbers
            .tickFormat((index) => index + 1);

        //this positions the axis by styling the group element in the svg that is placed to summon x axis into it at the bottom with OVERFLOW
        svg.select('.x-axis').style('transform', `translateY(${dimensions.height}px)`).call(xAxis);

        const yAxis = axisLeft(yScale);

        //this positions the y-axis groupd element as an OVERFLOW
        svg.select('.y-axis').style('transform', 'translateX(0px)').call(yAxis);

        // the line function from d3 generates the "d" attribute of a path element
        // the d attribute of the path element defines where the line starts, where it goes and where it ends, a series of plots
        const myLine = line()
            //where to render each plot on x scale
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        // renders path element, and attaches the "d" attribute from line generator above
        //we use classes because if we grab elements, we can grab unexpected elements
        svg.selectAll('.line')
            //when we generate the path element, we don't want a path for each item
            //KEY - nest our data in an array so the path is built from ALL data points at once, not each element
            .data([data.map((entry) => entry.value)])
            //use a path element to draw a connected line
            .join('path')
            .attr('class', 'line')
            //just call my line to fill the d attribute
            .attr('d', myLine)
            //line charts need no fill and the color is done by stroke
            .attr('fill', 'none')
            .attr('stroke', 'blue');
    }, [data, dimensions]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'visible' }}>
                <g className='x-axis' />
                <g className='y-axis' />
            </svg>
        </div>
    );
};
