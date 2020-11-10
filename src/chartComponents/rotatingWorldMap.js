import React, { useRef, useEffect, useState } from 'react';
import { geoOrthographic, geoPath, select, timer, geoGraticule10 } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

//https://bl.ocks.org/atanumallick/8d18989cd538c72ae1ead1c3b18d7b54

export const RotatingWorldMap = ({ data, property }) => {
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
        const config = {
            speed: 0.005,
            verticalTilt: -10,
            horizontalTilt: 0,
        };

        const projection = geoOrthographic()
            //and make sure the projection output is sensitive to the size and what data it is going to parse
            .fitSize([width, height], data);
        const path = geoPath().projection(projection);

        const drawGlobe = () => {
            svg.selectAll('.segment')
                .data(data.features)
                .join('path')
                //then a click handler to handle showing country data in label
                .on('click', function (event, feature) {
                    //then update the state
                    setSelectedCountry(feature);
                })
                .attr('class', 'segment')
                .attr('d', path)
                .attr('stroke', '#888')
                .attr('stroke-width', '1px')
                .attr('fill', '#e5e5e5')
                .attr('opacity', '.6');
        };

        const drawGraticule = () => {
            const graticule = geoGraticule10();

            svg.append('path')
                .datum(graticule)
                .attr('class', 'graticule')
                .attr('d', path)
                .attr('fill', 'none')
                .attr('stroke', '#ccc');
        };

        const enableRotation = () => {
            timer(function (elapsed) {
                /*
                projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
                svg.selectAll('path').attr('d', path);
                */
            });
        };

        const drawLabel = () => {
            //render the label of the country on zoom
            svg.selectAll('.label')
                //use the selected country as the only data point
                .data([selectedCountry])
                //create text
                .join('text')
                .attr('class', 'label')
                .text(
                    //add the details from the feature
                    (feature) =>
                        feature && feature.properties.name + ': ' + feature.properties[property].toLocaleString()
                )
                //position in top left
                .attr('x', 10)
                .attr('y', 25);
        };

        drawGlobe();
        drawGraticule();
        drawLabel();
        enableRotation();
    }, [data, dimensions, property, selectedCountry]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'visible' }} />
        </div>
    );
};
