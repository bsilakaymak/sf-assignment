import { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({
  data,
}: {
  data: { name: string; energyCost: number }[];
}) => {
  // This component is not really working as expected
  // there are weird issues going on with y axis values
  // I had no time to debug it

  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (data && data.length > 0) {
      const svg = d3.select(svgRef.current);

      const svgWidth = Math.max(400, data.length * 60);
      const svgHeight = 300;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const chartWidth = svgWidth - margin.left - margin.right;
      const chartHeight = svgHeight - margin.top - margin.bottom;

      const barWidth = 50;

      svg.selectAll("*").remove();

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, chartWidth])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.energyCost) as number])
        .nice()
        .range([chartHeight, 0]);

      chart
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "#7F1C1D")
        .attr(
          "x",
          (d) =>
            (xScale(d.name) as number) + (xScale.bandwidth() - barWidth) / 2
        )
        .attr("y", (d) => yScale(d.energyCost))
        .attr("width", barWidth)
        .attr("height", (d) => chartHeight - yScale(d.energyCost));

      chart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));

      chart
        .append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).ticks(3));
    }
  }, [data]);

  return <svg ref={svgRef} width="100%" height="300"></svg>;
};

export default BarChart;
