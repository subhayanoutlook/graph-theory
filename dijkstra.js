const PQ = require("./util/priority-queue");
const weightedGraph = {
  0: {
    1: 4,
    2: 1,
  },
  1: {
    3: 1,
  },
  2: {
    1: 2,
    3: 5,
  },
  3: {
    4: 3,
  },
};

// 0 -> 1 | edge-weight 4
// 0 -> 2 | edge-weight 1

//lazy dijkstra
const lazyDijkstra = (graph, startNode = 0) => {
  if (!graph) return "invalid graph";
  const distance = {};
  distance[startNode] = 0;
  const pqueue = new PQ();
  pqueue.enqueue(startNode, 0);
  while (pqueue.length > 0) {
    const curr = pqueue.dequeue();
    if (curr.weight > distance[curr.node]) continue;
    for (const [node, weight] of Object.entries(graph[curr.node] ?? {})) {
      const newEdgeWeight = curr.weight + weight;
      if (newEdgeWeight > distance[node]) continue; //redundant condition can be removed
      distance[node] = newEdgeWeight;
      pqueue.enqueue(node, newEdgeWeight);
    }
  }
  return distance[Object.keys(graph).length];
};
console.log(lazyDijkstra(weightedGraph));
