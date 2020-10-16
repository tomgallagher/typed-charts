import React, { useEffect, useRef } from 'react';
import { select, max, axisBottom, axisLeft, scaleLinear, scaleBand } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

export const AnimatedBarChart = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        //we need to collect the SVG reference
        const svg = select(svgRef.current);
        //if the wrapper has not been measured then return, otherwise we get an error
        if (!dimensions) return;

        //scale band takes the total available space and splits it into any number of equal bands
        //maps arbitrary values (say, observations) to linear values (pixels in the SVG)
        const xScale = scaleBand()
            //use the index value as the array
            .domain(data.map((value, index) => index))
            .range([0, dimensions.width])
            .padding(0.5);

        //scale linear just ensures a linear relationship between value property and svg pixels
        const yScale = scaleLinear()
            .domain([0, max(data, (entry) => entry.value)])
            .range([dimensions.height, 0]);

        const colorScale = scaleLinear()
            //this divides up the data into three different bands
            .domain([70, 110, 150])
            //and ranges can actually map to a string! Useful for adding css properties
            .range(['green', 'orange', 'red'])
            //clamp ensures that there is no degradation of the color
            .clamp(true);

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
            .tickFormat((index) => index + 1); //this prevents decimals on whole numbers

        svg.select('.x-axis').style('transform', `translateY(${dimensions.height}px)`).call(xAxis);

        const yAxis = axisLeft(yScale);
        svg.select('.y-axis').style('transform', 'translateX(0px)').call(yAxis);

        svg.selectAll('.bar')
            .data(data.map((x) => x.value))
            .join('rect')
            .attr('class', 'bar')
            //KEY FOR ANIMATION - if you don't flip the scale, the transition of the height on data update animates DOWNWARDS, causing a gap in the bars to fill at the bottom
            .style('transform', 'scale(1, -1)')
            //every rect element needs an x and a y value so we can position them
            //we can get the x value from our scaled bands, worked out for us to map input (index) to output (pixels)
            .attr('x', (value, index) => xScale(index))
            //bandwidth can be used here as a shortcut to provide width
            .attr('width', xScale.bandwidth())
            //KEY FOR ANIMATION - once the scale has been flipped, we need to reposition
            //normally you would just use the yscale but the animation causes problems
            .attr('y', -dimensions.height)
            //INTERACTIVITY - each rect can be made interactive
            .on('mouseenter', function (event, value) {
                // events have changed in d3 v6: https://observablehq.com/@d3/d3v6-migration-guide#events
                const index = svg.selectAll('.bar').nodes().indexOf(this);
                //selectAll again, though nothing exists on the first call
                svg.selectAll('.tooltip')
                    //just use the value we get from the mouseenter function
                    .data([value])
                    //add it to the top of the column, with a minus number as they are being drawn inversely
                    .join((enter) => enter.append('text').attr('y', yScale(value) - 4))
                    //add the class so we can update
                    .attr('class', 'tooltip')
                    //use the value as the text
                    .text(value)
                    //this is an offset
                    .attr('x', xScale(index) + xScale.bandwidth() / 2)
                    //this attaches the text to the middle of the bar
                    .attr('text-anchor', 'middle')
                    .transition()
                    //animate in from above and with opacity
                    .attr('y', yScale(value) - 8)
                    .attr('opacity', 1);
            })
            .on('mouseleave', () => svg.select('.tooltip').remove())
            //then animate
            .transition()
            //then colorise
            .attr('fill', colorScale)
            //then the height is the total height of the svg minus the y scale
            .attr('height', (value) => dimensions.height - yScale(value));
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{ width: '100%' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'visible' }}>
                <g className='x-axis' />
                <g className='y-axis' />
            </svg>
        </div>
    );
};
