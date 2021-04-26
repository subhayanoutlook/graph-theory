//topological sort - for every vertex u, v where u -> v
//u should always appear before v in ordering

const testGraph = {
  A: ["D"],
  B: ["D"],
  C: ["A", "B"],
  D: ["G", "H"],
  E: ["A", "D", "F"],
  F: ["J", "K"],
  G: ["I"],
  H: ["J", "I"],
  I: ["L"],
  J: ["M", "L"],
  K: ["J"],
  L: [],
  M: [],
};

// shirt -> hoodie
//   |-> pants -> socks -> shoe
// underpants^

const prepareForSchool = {
  [`shirt 👚`]: ["hoodie 🧥", "pants 👖"],
  ["hoodie 🧥"]: ["underpants 🩲"],
  ["underpants 🩲"]: ["pants 👖"],
  ["socks 🧦"]: ["shoe 👞"],
  ["pants 👖"]: ["socks 🧦"],
  ["shoe 👞"]: [],
};

const topoSort = (graph) => {
  if (!graph) return null;
  const visited = {};
  const ordering = [];
  for (const node of Object.keys(graph)) {
    if (node in visited) continue;
    dfs(node, graph, visited, ordering);
  }
  return ordering;
};
const dfs = (at, graph, visited, ordering) => {
  if (!at) return;
  visited[at] = true;
  for (const node of [].slice.call(graph[at] ?? [])) {
    if (node in visited) continue;
    dfs(node, graph, visited, ordering);
  }
  ordering.unshift(at);
};

const topoSortKahns = (graph) => {
  if (!graph) return null;
  const inDegree = {};
  const queue = [];
  for (const [startNode, nodes] of Object.entries(graph)) {
    if (!(startNode in inDegree)) inDegree[startNode] = 0;
    for (const node of [].slice.call(nodes)) {
      inDegree[node] ? inDegree[node]++ : (inDegree[node] = 1);
    }
  }
  for (const [node, degree] of Object.entries(inDegree)) {
    if (degree === 0) queue.push(node);
  }
  const ordering = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    ordering.push(curr);
    const nodes = [].slice.call(graph[curr] ?? (graph[curr] = []));
    for (const node of nodes) {
      inDegree[node]--;
      if (inDegree[node] === 0) queue.push(node);
    }
  }
  if (ordering.length != Object.keys(graph).length) {
    return "Oops ! cycles detected 😵";
  }
  return ordering;
};

console.log(topoSort(testGraph));
console.log(topoSortKahns(prepareForSchool));
//formatting output of prepareForSchool 😃
const dressOrder = topoSort(prepareForSchool).map(
  (dress) => `${dress.split(" ")[1]}`
);

console.log(`You should wear dress in this order: `, ...dressOrder);
