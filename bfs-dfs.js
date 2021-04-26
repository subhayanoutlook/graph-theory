//adjacency list representation of undirected graph
const undirectedGraph = {
  0: [1, 2],
  1: [0],
  2: [0, 3, 4],
  3: [2, 5, 6],
  4: [2],
  5: [3, 6],
  6: [5, 3],
};

//by root=0, will consider 0 (by default) as start node
const depthFirstTraversalIterative = (graph, root = 0) => {
  if (!graph) return null;
  const visited = {};
  const stack = [root];
  visited[root] = true;
  while (stack.length > 0) {
    const curr = stack.pop();
    console.log(curr);
    for (const node of [].slice.call(graph[curr])) {
      if (node in visited) continue;
      stack.push(node);
      visited[node] = true;
    }
  }
};

const depthFirstTraversalRecursive = (graph, root = 0, visited = {}) => {
  if (!graph) return null;
  if (root === null) return;
  console.log(root);
  visited[root] = true;
  for (const node of [].slice.call(graph[root])) {
    if (node in visited) continue;
    depthFirstTraversalRecursive(graph, node, visited);
  }
};

//breadth first traversal
const breadthFirstTraversal = (graph, root = 0) => {
  const visited = {};
  const queue = [root];
  visited[root] = true;
  while (queue.length > 0) {
    const curr = queue.shift();
    console.log(curr);
    for (const node of [].slice.call(graph[curr])) {
      if (node in visited) continue;
      queue.push(node);
      visited[node] = true;
    }
  }
};

// shortest path in a undirected graph using bfs
const shortestPathBfs = (graph, start = 0, end) => {
  const visited = {};
  const queue = [start];
  visited[start] = null;
  while (queue.length > 0) {
    const curr = queue.pop();
    if (curr === end) return reconstructPath(visited, start, end);
    for (const node of [].slice.call(graph[curr])) {
      if (node in visited) continue;
      queue.push(node);
      visited[node] = curr;
    }
  }
  return null;
};

//reach from end to start while reconstruction
const reconstructPath = (visited, start, end) => {
  const path = [end];
  let curr = visited[end];
  while (curr != null) {
    path.push(curr);
    curr = visited[curr];
  }
  return path.reverse();
};

//try uncommenting below calls to see the results

// depthFirstTraversalRecursive(undirectedGraph);
// depthFirstTraversalIterative(undirectedGraph);
// breadthFirstTraversal(undirectedGraph);

//there are 2 ways two reach from 5 to 4
// 5 -> 3 -> 2 -> 4  -- shortest
// 5 -> 6 -> 3 -> 2 -> 4

console.log(shortestPathBfs(undirectedGraph, 5, 4));
