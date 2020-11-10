import React, { useEffect, useRef } from 'react';
import { select } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

export const GameOfLife = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    // will be called initially and on every data change
    useEffect(() => {
        console.log('Redrawing Game of Life');
        //we need to collect the SVG reference
        const svg = select(svgRef.current);
        //if the wrapper has not been measured then return, otherwise we get an error
        if (!dimensions) return;
        //otherwise we need to start drawing
        //we need the number of rows so we can fit into the height
        const rows = data[0].length;
        //small margin for legibility
        const margin = 3;
        //then we set the radius by subtracting the total margin from the height, dividing it by the number of rows and then by 2, as it's a radius
        const radius = (dimensions.height - margin * rows) / rows / 2;
        //then we need to get the left offset so we can centre, we know it's square so we can use the height
        const leftOffset = (dimensions.width - dimensions.height) / 2;
        //then we need the cell size for the grid
        const cellSize = radius * 2 + margin;

        svg.selectAll('g')
            .data(data)
            .join('g')
            .attr('transform', function (d, i) {
                return 'translate(' + (i * cellSize + leftOffset) + ')';
            })
            .selectAll('.point')
            .data(function (d) {
                return d;
            })
            .join('circle')
            .attr('class', 'point')
            .attr('stroke', 'black')
            .attr('fill', (d) => (d === false ? 'white' : 'blue'))
            .attr('r', radius)
            .attr('cx', radius)
            .attr('cy', function (d, i) {
                return radius + i * cellSize;
            });
    }, [data, dimensions]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'visible' }}></svg>
        </div>
    );
};
