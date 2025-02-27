import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  maxValue: number;
  label: string;
  color: string;
  size: number;
}

export function GaugeCluster({ metrics }: { metrics: GaugeProps[] }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        {metrics.map((metric, index) => (
          <Gauge key={metric.label} {...metric} />
        ))}
      </div>
    </div>
  );
}

function Gauge({ value, maxValue, label, color, size }: GaugeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 20 };
    const width = size - margin.left - margin.right;
    const height = size - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

    const radius = Math.min(width, height) / 2;
    
    // Create outer glow filter
    const defs = svg.append("defs");
    
    const filter = defs.append("filter")
      .attr("id", `glow-${label.replace(/\s+/g, '-')}`)
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

    // Create gradient
    const gradient = defs.append("linearGradient")
      .attr("id", `gauge-gradient-${label.replace(/\s+/g, '-')}`)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", color)
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0.6);

    // Background arc
    const backgroundArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    g.append("path")
      .attr("d", backgroundArc as any)
      .attr("fill", "#1a1b1e");

    // Foreground arc
    const percentScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([-Math.PI / 2, Math.PI / 2]);

    const arc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2);

    const foregroundArc = g.append("path")
      .datum({ endAngle: percentScale(0) })
      .attr("d", arc as any)
      .attr("fill", `url(#gauge-gradient-${label.replace(/\s+/g, '-')})`)
      .style("filter", `url(#glow-${label.replace(/\s+/g, '-')})`);

    // Animate the foreground arc
    foregroundArc.transition()
      .duration(2000)
      .attrTween("d", function(d: any) {
        const interpolate = d3.interpolate(d.endAngle, percentScale(value));
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });

    // Add value text
    g.append("text")
      .attr("class", "value")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-size", "1.5rem")
      .attr("font-weight", "600")
      .text(`${Math.round((value / maxValue) * 100)}%`);

    // Add label text
    g.append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", "3em")
      .attr("fill", "rgb(148 163 184)")
      .attr("font-size", "0.875rem")
      .text(label);

  }, [value, maxValue, label, color, size]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl flex items-center justify-center"
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="w-full h-auto"
      />
    </motion.div>
  );
}