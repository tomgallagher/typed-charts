import React, { useRef, useEffect } from 'react';
import { geoMercator, geoPath, select } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

//https://www.youtube.com/watch?v=lx5k8oQHaJQ&t=107s
//https://github.com/muratkemaldar/using-react-hooks-with-d3/

export const WorldMap = ({ data, property }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    // will be called initially and on every data change
    useEffect(() => {
        //this is what gives D3 the ability to work with the SVG element
        const svg = select(svgRef.current);
        //then we get width and height from the hook or fall back if no dimensions yet
        const { width, height } = dimensions || svgRef.current.getBoundingClientRect();
        //we define the projection function - translates lat/long data from geojson into 2 dimensional pixel values
        const projection = geoMercator()
            //and make sure the projection output is sensitive to the size and what data it is going to parse
            .fitSize([width, height], data);
        //then we need a function to generate the paths for the outlines of each of the countries
        const pathGenerator = geoPath().projection(projection);
        svg.selectAll('.country')
            //in geo.json data all the countries are defined in the features array
            .data(data.features)
            //transmute the data into svg elements
            .join('path')
            //add the class so it can be changed
            .attr('class', 'country')
            //add the shape of each path element
            .attr('d', (feature) => pathGenerator(feature))
            //make it look nice
            .style('stroke', '#888')
            .style('stroke-width', '1px')
            .style('fill', '#e5e5e5')
            .style('opacity', '.6');
    }, [data, dimensions, property]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'visible' }} />
        </div>
    );
};
