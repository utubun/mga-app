import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./graph.module.css";

const Graph = ({ data, width, height, margin, remove }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    // create reference
    const svg = d3
      .select(d3Container.current)
      .attr("viewBox", [0, 0, width, height]);

    // clean all children on update
    svg.selectAll("*").remove();

    // create group for plotting
    const view = svg.append("g").attr("width", width).attr("height", height);

    // run the force simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.r)
      )
      .force(
        "link",
        d3
          .forceLink()
          .links(data.links)
          .strength((d) => d.weight)
      )
      .on("tick", ticked);

    // define function updating the simulation
    function ticked() {
      updateLinks();
      updateNodes();
      updateNodeLabels();
    }

    // define function to update existing nodes
    const updateNodes = () => {
      view
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .classed("vertex", true)
        .attr("r", "12pt") //(d) => d.r)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", (d) => d.fill)
        .call(drag(simulation));
    };

    // define the function to update existing node labels
    const updateNodeLabels = () => {
      view
        .selectAll("text")
        .data(data.nodes)
        .join("text")
        .classed(".node-label", true)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .text((d) => d.id)
        .call(drag(simulation));
    };

    // define function to update existing links
    const updateLinks = () => {
      view
        .selectAll("line")
        .data(data.links)
        .join("line")
        .classed("edge", true)
        .attr("x1", (d) => d.source.x)
        .attr("x2", (d) => d.target.x)
        .attr("y1", (d) => d.source.y)
        .attr("y2", (d) => d.target.y)
        .attr("stroke-width", "0.5pt")
        .attr("stroke", "gray");
    };

    // drug
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [data, d3Container.current]);

  return <svg width={width} height={height} ref={d3Container} />;
};

export default Graph;
