import * as d3 from "d3";
import { useEffect, useRef } from "react";
import englandData from "../data/england_totalgoal_data.json";

const BarChart = () => {
    const ref = useRef();

    useEffect(() => {
        // Set the dimensions and margins of the graph
        const margin = { top: 50, right: 30, bottom: 70, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // Append the svg object to the body of the page
        const svg = d3
            .select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add title
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", -20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("fill", "#888")
            .text("Distribution of Total Goals in English Football (1980+)");

        // X axis
        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(englandData.map((d) => d.totgoal))
            .padding(0.2);
        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "middle");

        // Add Y axis
        const y = d3.scaleLinear().domain([0, 20000]).range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Bars
        svg
            .selectAll("mybar")
            .data(englandData)
            .join("rect")
            .attr("x", (d) => x(d.totgoal))
            .attr("y", (d) => y(d.games_count))
            .attr("width", x.bandwidth())
            .attr("height", (d) => height - y(d.games_count))
            .attr("fill", "#61dafbaa");
    }, []);

    return <svg width={460} height={400} id="barchart" ref={ref} />;
};

export default BarChart;