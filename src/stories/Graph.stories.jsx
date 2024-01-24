import React from "react";
import Graph from "../components/visuals/Graph";

const data = {
  nodes: [
    {
      id: "a",
      r: 25,
      fill: "red",
    },
    {
      id: "b",
      r: 10,
      fill: "salmon",
    },
    {
      id: "c",
      r: 24,
      fill: "green",
    },
    {
      id: "d",
      r: 15,
      fill: "gray",
    },
    {
      id: "e",
      r: 30,
      fill: "skyblue",
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
      weight: 0.1,
    },
    {
      source: 0,
      target: 2,
      weight: 0.1,
    },
    {
      source: 0,
      target: 3,
      weight: 0.1,
    },
    {
      source: 0,
      target: 4,
      weight: 0.1,
    },
    {
      source: 1,
      target: 2,
      weight: 0.5,
    },
    {
      source: 2,
      target: 3,
      weight: 0.5,
    },
    {
      source: 3,
      target: 4,
      weight: 0.5,
    },
    {
      source: 4,
      target: 1,
      weight: 0.5,
    },
  ],
};

const margin = {
  top: 20,
  right: 5,
  bottom: 30,
  left: 40,
};

const Template = (args) => <Graph {...args} />;

export const BaseGraph = Template.bind({});

BaseGraph.args = {
  data: data,
  width: 300,
  height: 300,
  margin: margin,
  remove: [],
};

export default {
  title: "Visualizations/2D/Graph/Base",
  component: Graph,
};
