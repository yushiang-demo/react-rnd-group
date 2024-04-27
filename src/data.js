import Node from "./Node";

const node1 = Node([100, 100, 100, 100]);
const node2 = Node([150, 220, 100, 100]);
const node3 = Node([270, 150, 100, 100]);

const group = Node([400, 100, 100, 175]);
const child1 = Node([425, 125, 50, 50]);
const child2 = Node([425, 200, 50, 50]);

child1.setParent(group);
child2.setParent(group);

const nodes = [node1, node3, node2, group, child1, child2];

export default nodes;
