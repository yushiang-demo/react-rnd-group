import React from "react";
import Node from "./Node";

const node1 = { ...Node([100, 30, 100, 100]), body: () => <>A.</> };
const node2 = { ...Node([100, 100, 100, 100]), body: () => <>a.</> };
const node3 = { ...Node([110, 0, 100, 100]), body: () => <>1.</> };
const node4 = { ...Node([210, 0, 100, 100]), body: () => <>B.</> };
const node5 = { ...Node([110, 0, 100, 100]), body: () => <>b.</> };

const nodes = [
  {
    node: node1,
    children: [
      {
        node: node2,
        children: [
          {
            node: node3
          }
        ]
      }
    ]
  },
  {
    node: node4,
    children: [
      {
        node: node5
      }
    ]
  }
];

export default nodes;
