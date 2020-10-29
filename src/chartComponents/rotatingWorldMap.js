import React, { useRef, useEffect } from 'react';
import { geoOrthographic, geoPath, select, timer, geoGraticule10 } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

//https://bl.ocks.org/atanumallick/8d18989cd538c72ae1ead1c3b18d7b54

export const RotatingWorldMap = ({ data, property }) => {
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
                projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
                svg.selectAll('path').attr('d', path);
            });
        };

        drawGlobe();
        drawGraticule();
        enableRotation();
    }, [data, dimensions, property]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: '300px', overflow: 'visible' }} />
        </div>
    );
};
