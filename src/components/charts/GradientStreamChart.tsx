import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface StreamData {
  date: Date;
  [key: string]: any;
}

interface GradientStreamChartProps {
  data: StreamData[];
  keys: string[];
  height: number;
  colors: string[];
}

export function GradientStreamChart({ data, keys, height, colors }: GradientStreamChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.sum(keys, key => d[key])) as number])
      .range([innerHeight, 0]);

    // Create the stack
    const stack = d3.stack()
      .keys(keys)
      .offset(d3.stackOffsetSilhouette);

    const series = stack(data);

    // Create gradients
    const defs = svg.append("defs");
    
    colors.forEach((color, i) => {
      const gradient = defs.append("linearGradient")
        .attr("id", `gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", innerHeight);

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.7);

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.3);
    });

    // Create the area generator
    const area = d3.area<d3.Series<StreamData, string>>()
      .x(d => x(d.data.date))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(d3.curveBasis);

    // Create the chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the streams
    g.selectAll("path")
      .data(series)
      .join("path")
      .attr("d", area)
      .attr("fill", (_, i) => `url(#gradient-${i})`)
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // Add axes
    const xAxis = d3.axisBottom(x)
      .ticks(width > 600 ? 10 : 5)
      .tickSize(-innerHeight)
      .tickPadding(10);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "rgba(255, 255, 255, 0.1)"));

    // Add hover effects
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px");

    const bisect = d3.bisector((d: StreamData) => d.date).left;

    g.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mousemove", (event) => {
        const [mx] = d3.pointer(event);
        const date = x.invert(mx);
        const index = bisect(data, date, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        const d = date - d0.date > d1.date - date ? d1 : d0;

        tooltip
          .style("visibility", "visible")
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`)
          .html(`
            <div class="font-medium">${d.date.toLocaleDateString()}</div>
            ${keys.map((key, i) => `
              <div class="flex items-center">
                <span class="w-2 h-2 rounded-full mr-2" style="background: ${colors[i]}"></span>
                ${key}: ${d[key]}
              </div>
            `).join('')}
          `);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    return () => {
      tooltip.remove();
    };
  }, [data, keys, height, colors]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      className="overflow-visible"
    />
  );
}