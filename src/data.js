import Node from "./Node";

const node1 = { ...Node([100, 100, 300, 300]), body: () => "Parent A" };
const node2 = { ...Node([100, 100, 200, 200]), body: () => "Child A" };
const node3 = { ...Node([200, 200, 300, 300]), body: () => "Parent B" };

node2.setParent(node1);
node2.setParent(node3);

const nodes = [node1, node2, node3];

export default nodes;
