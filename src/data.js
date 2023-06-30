import React from "react";
import Node from "./Node";

const group = { ...Node([300, 0, 0, 0]), body: () => null };

const node1 = { ...Node([100, 30, 100, 100]), body: () => "Custom Parent A" };
const node2 = { ...Node([100, 100, 100, 100]), body: () => "Custom Child A" };
const node3 = {
  ...Node([110, 0, 100, 100]),
  body: () => "Custom Grandchild A",
};
const node4 = { ...Node([210, 0, 100, 100]), body: () => "Custom Parent A" };
const node5 = { ...Node([110, 0, 100, 100]), body: () => "Custom Child B" };

const nodes = [
  {
    node: group,
    children: [
      {
        node: node1,
        children: [
          {
            node: node2,
            children: [
              {
                node: node3,
              },
            ],
          },
        ],
      },
      {
        node: node4,
        children: [
          {
            node: node5,
          },
        ],
      },
    ],
  },
];

export default nodes;
