import React, { useRef, useEffect, useState } from 'react';
import { geoMercator, geoPath, select } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

//https://www.youtube.com/watch?v=lx5k8oQHaJQ&t=107s
//https://github.com/muratkemaldar/using-react-hooks-with-d3/

export const WorldMap = ({ data, property }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
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
            .fitSize([width, height], selectedCountry || data)
            //add precision for smooth zoom scrolling
            .precision(100);
        //then we need a function to generate the paths for the outlines of each of the countries
        const pathGenerator = geoPath().projection(projection);
        //render the country
        svg.selectAll('.country')
            //in geo.json data all the countries are defined in the features array
            .data(data.features)
            //transmute the data into svg elements
            .join('path')
            //then a click handler to handle zoom
            .on('click', function (event, feature) {
                const index = svg.selectAll('.country').nodes().indexOf(this);
                console.log(index);
                setSelectedCountry(selectedCountry === feature ? null : feature);
            })
            //add the class so it can be changed
            .attr('class', 'country')
            //allow zoom transition
            .transition()
            .duration(1000)
            //add the shape of each path element
            .attr('d', (feature) => pathGenerator(feature))
            //make it look nice
            .attr('stroke', '#888')
            .attr('stroke-width', '1px')
            .attr('fill', '#e5e5e5')
            .attr('opacity', '.6');
        //render the label of the country on zoom
        svg.selectAll('.label')
            //use the selected country as the only data point
            .data([selectedCountry])
            //create text
            .join('text')
            .attr('class', 'label')
            .text(
                //add the details from the feature
                (feature) => feature && feature.properties.name + ': ' + feature.properties[property].toLocaleString()
            )
            //position in top left
            .attr('x', 10)
            .attr('y', 25);
    }, [data, dimensions, property, selectedCountry]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'hidden' }} />
        </div>
    );
};
