import React, { useState, useEffect, useRef } from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import { useResizeObserver } from '../hooks/useResizeObserver';

export const AnimatedTreeChart = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [branches, setBranches] = useState(0);

    useEffect(() => {
        //we need to collect the SVG reference
        const svg = select(svgRef.current);
        //exit on no dimensions
        if (!dimensions) return;
        //this converts our data into a hierarchy understood by D3 - this requires children to be a property and an array of like nodes
        const root = hierarchy(data);
        //make sure we adjust the height
        setBranches(root.leaves().length);
        //then we need to create the tree layout and pass the sizes so it matches the svg - the width and height are flipped from normal so we can display horizontal
        const treeLayout = tree().size([dimensions.height, dimensions.width]);
        //then you call the tree layout function and enrich root with x and y co-orindates for each node, based on the width and height of the tree
        treeLayout(root);
        //then we need to generate the links between each node
        const linkGenerator = linkHorizontal()
            //link generator receives link and needs to know link source and target
            .source((link) => link.source)
            .target((link) => link.target)
            //then it needs to position the x and y of each link, flipped for horizontal tree
            .x((node) => node.y)
            .y((node) => node.x);

        //render nodes which are just all the descendants of the root
        svg.selectAll('.node')
            //can just pass the descendants
            .data(root.descendants())
            //join to an svg circle element which is intially invisible
            .join((enter) => enter.append('circle').attr('opacity', 0))
            //then add the class so we can update
            .attr('class', 'node')
            //radius of the circle
            .attr('r', 4)
            //color
            .attr('fill', 'black')
            //then the special x and y position property for circles, flipped for horizontal tree
            .attr('cx', (node) => node.y)
            .attr('cy', (node) => node.x)
            //then animate the transition from left to right so that nodess appear according to their depth in the tree
            .transition()
            .duration(500)
            .delay((node) => node.depth * 500)
            .attr('opacity', 1);

        //render links using path elements
        svg.selectAll('.link')
            //we can just pass the links created for us by the hierarchy
            .data(root.links())
            //for a line we need to have a path
            .join('path')
            //add the class so we can find it later
            .attr('class', 'link')
            //then pass the link generator
            .attr('d', linkGenerator)
            //use this to overlay an invisible line on top of the existing line
            .attr('stroke-dasharray', function () {
                const length = this.getTotalLength();
                return `${length} ${length}`;
            })
            .attr('stroke', 'black')
            .attr('fill', 'none')
            .attr('opacity', 1)
            .attr('stroke-dashoffset', function () {
                return this.getTotalLength();
            })
            //then make the transition with specified duration
            .transition()
            .duration(500)
            //then add a delay to the appearance of each label according to the depth, so it animates from left to right
            .delay((link) => link.source.depth * 500)
            .attr('stroke-dashoffset', 0);

        //render htmlelement label for each node
        svg.selectAll('.label')
            .data(root.descendants())
            //match the item to a text element which is initially invisible
            .join((enter) => enter.append('text').attr('opacity', 0))
            .attr('class', 'label')
            //work with data to get the value you want for the label
            .text((node) => (node.data.nodeType === 1 ? node.data.nodeTagName.toUpperCase() : 'Text'))
            //text styling
            .attr('text-anchor', 'middle')
            .attr('font-size', 10)
            //text positioning
            .attr('x', (node) => node.y)
            .attr('y', (node) => node.x - 8)
            //then make the transition with specified duration
            .transition()
            .duration(500)
            //then add a delay to the appearance of each label according to the depth, so it animates from left to right
            .delay((node) => node.depth * 500)
            .attr('opacity', 1);
    }, [data, dimensions]);

    return (
        <div className='chartContainer' ref={wrapperRef}>
            <svg ref={svgRef} style={{ width: '100%', height: `${branches * 50}px`, overflow: 'visible' }}></svg>
        </div>
    );
};
