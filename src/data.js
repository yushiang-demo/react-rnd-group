import Node from "./Node";

const node1 = { ...Node([100, 30, 300, 300]), body: () => "Custom Parent A" };
const node2 = { ...Node([50, 50, 200, 200]), body: () => "Custom Child A" };
const node3 = {
  ...Node([30, 50, 50, 50]),
  body: () => "Custom Grandchild A",
};

node3.setParent(node2);
node2.setParent(node1);

const nodes = [node1, node2, node3];

export default nodes;
