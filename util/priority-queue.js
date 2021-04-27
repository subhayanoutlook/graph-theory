class QueueElement {
  constructor(node, weight) {
    this.node = node;
    this.weight = weight;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }
  get length() {
    return this.items.length;
  }
}

//lowest weight highest priority
PriorityQueue.prototype.enqueue = function (node, weight) {
  if (node === null || weight === null) return null;
  let isHighest = false;
  for (const [i, item] of this.items.entries()) {
    if (item.weight > weight) {
      isHighest = true;
      return this.items.splice(i, 0, new QueueElement(node, weight));
    }
  }
  if (!isHighest) return this.items.push(new QueueElement(node, weight));
  return null;
};

PriorityQueue.prototype.dequeue = function () {
  return this.items.shift();
};
module.exports = PriorityQueue;
