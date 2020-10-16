import React, { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

//https://www.youtube.com/watch?v=lx5k8oQHaJQ&t=107s
//https://github.com/muratkemaldar/using-react-hooks-with-d3/tree/09-racing-bar-chart

export const RacingBarChart = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    // will be called initially and on every data change
    useEffect(() => {
        //this is what gives D3 the ability to work with the SVG element
        const svg = select(svgRef.current);
        //if the wrapper has not been measured then return, otherwise we get an error
        if (!dimensions) return;

        // sorting the data so the biggest is always at the top
        data.sort((a, b) => b.value - a.value);

        //scales are responsbile for transforming data
        //into visual representations e.g. values into pixels
        //scaleBand is ordinal, so it can only map whole numbers as chunks
        //scaleLinear is continuous, so it can map any value proportionally

        const yScale = scaleBand()
            //add some spacing between bars
            .paddingInner(0.1)
            //the domain takes an array of input values for the scale
            //for horixontal bars, this is just the index of the data
            .domain(data.map((value, index) => index)) // [0,1,2,3,4,5]
            //this maps index value of zero to pixel position 0
            //then index value of 5 to map to height of wrapper
            .range([0, dimensions.height]); // [0, 200]

        const xScale = scaleLinear()
            //domain takes an array of two values, min and max
            //we need the width minimum to be zero and max as the D3 max value
            .domain([0, max(data, (entry) => entry.value)]) // [0, 65 (example)]
            //map from 0 to zero, max to width, something in middle to relative
            .range([0, dimensions.width]); // [0, 400 (example)]

        // draw the bars, using properties of yScale and xScale
        // the join callbacks, with enter, update and exit, can depend
        // on the current state of svg, if empty, fine
        svg.selectAll('.bar')
            //KEY - synchronises the SVG with EACH UNIQUE NAME in the data array
            //if you just had data(data), then the index is used by default
            //if index used, color will change but bars do not move
            //so we add add key callback function
            .data(data, (entry, index) => entry.unique_id)
            //maps each of the entries in the array to a rect element
            //you can just join('rect') but this means there is a transition
            //as the SVG is built
            //if you want the paint to start without transtion
            //you need a callback to set the y position from the beginning
            .join((enter) => enter.append('rect').attr('y', (entry, index) => yScale(index)))
            //add the color of each entry using the fill attribute
            .attr('fill', (entry) => entry.color)
            //this allows the rect elements to update continuously
            //working with selectAll
            .attr('class', 'bar')
            //x attribute is always going to be 0
            //as the horizontal bar always starts on the left
            .attr('x', 0)
            //height we can derive from yScale bandwidth function
            //all bands have an equal width
            .attr('height', yScale.bandwidth())
            //KEY - the animation step
            //we are looking to animate the width of the bar
            //and the swapping of bars, their y position
            .transition()
            //use callback function to set the width by
            //querying the xScale with the value of the data entry
            .attr('width', (entry) => xScale(entry.value))
            //then we also need to position each bar vertically
            //so we query the yScale with the index number
            .attr('y', (entry, index) => yScale(index));

        // draw the labels, similar but with changes as it's text
        svg.selectAll('.label')
            //KEY - synchronises the labels with the data array
            .data(data, (entry, index) => entry.unique_id)
            //map to SVG element
            //again, using callback function to prevent transition effect
            //on first paint
            .join((enter) =>
                enter
                    .append('text') // svg has a text element as well
                    .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5)
            )
            .text((entry) => `${entry.name} (${entry.value} meters)`)
            .attr('class', 'label')
            .attr('x', 10) //offset from left for readability
            .transition()
            .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{ width: '100%' }}>
            <svg
                className='racing-bar-svg'
                ref={svgRef}
                style={{ width: '100%', height: '300px', overflow: 'visible' }}
            />
        </div>
    );
};
