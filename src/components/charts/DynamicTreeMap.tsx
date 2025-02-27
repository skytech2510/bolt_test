import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface TreeMapData {
  name: string;
  value: number;
  color: string;
}

interface DynamicTreeMapProps {
  data: TreeMapData[];
  height: number;
}

export function DynamicTreeMap({ data, height }: DynamicTreeMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create hierarchical data
    const hierarchy = d3.hierarchy({ children: data })
      .sum(d => (d as any).value)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    // Create treemap layout
    const treemap = d3.treemap<TreeMapData>()
      .size([width, height])
      .padding(2)
      .round(true);

    const root = treemap(hierarchy);

    // Create container for treemap
    const g = svg.append("g");

    // Add cells
    const cell = g.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    // Add rectangles
    cell.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => (d.data as TreeMapData).color)
      .attr("opacity", 0.8)
      .attr("rx", 4)
      .attr("ry", 4)
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // Add text labels
    cell.append("text")
      .attr("x", 4)
      .attr("y", 14)
      .attr("fill", "white")
      .attr("font-size", "12px")
      .attr("font-weight", "medium")
      .text(d => (d.data as TreeMapData).name)
      .append("tspan")
      .attr("x", 4)
      .attr("y", 28)
      .attr("fill", "rgba(255, 255, 255, 0.7)")
      .text(d => d.value?.toLocaleString());

    // Add hover effects
    cell.on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", function(d: any) {
          return `translate(${d.x0 - 2},${d.y0 - 2}) scale(1.01)`;
        });
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("transform", function(d: any) {
          return `translate(${d.x0},${d.y0}) scale(1)`;
        });
    });

  }, [data, height]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl"
    >
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        className="overflow-visible"
      />
    </motion.div>
  );
}