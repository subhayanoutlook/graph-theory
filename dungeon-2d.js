// S & E denotes starting, ending points respectively
// task is to find a way out with minimum possible moves,
// avoid # only can move thourgh . (dots)
// bfs is the approach behind solution !

// [
//   ["S", ".", ".", "#", ".", ".", "."],
//   [".", "#", ".", ".", ".", "#", "."],
//   [".", "#", ".", ".", ".", ".", "."],
//   [".", ".", "#", "#", ".", ".", "."],
//   ["#", ".", "#", "E", ".", "#", "."],
// ]

//point to note
/* in a 2D array if you are currently in position (r,c) then,
   from there you can move up, down, left & right doing so
   your co-ordinates will be then 
   up -> (r-1,c)  |  down -> (r+1,c)  |  left -> (r,c-1) | right -> (r,c+1)
   offsets for row is [-1, +1, 0, 0] for column [0, 0, -1, +1]
*/

//2d dungeon representation in 5x7 matrix
const arr = Array(5)
  .fill()
  .map(() => Array(7).fill("."));
arr[0][0] = "S";
arr[4][3] = "E";
arr[0][3] = "#";
arr[1][1] = "#";
arr[1][5] = "#";
arr[2][1] = "#";
arr[3][2] = "#";
arr[3][3] = "#";
arr[4][0] = "#";
arr[4][2] = "#";
arr[4][5] = "#";

const getMeOut = (dungeon, start, end) => {
  const { row: startRow = null, col: startCol = null } = findSymbolIndex(
    dungeon,
    start
  );
  const { row: endRow = null, col: endCol = null } = findSymbolIndex(
    dungeon,
    end
  );
  const dr = [-1, 1, 0, 0]; //direction offsets for row
  const dc = [0, 0, -1, 1]; //direction offsets for column
  const visited = {};
  const rowQueue = [startRow];
  const colQueue = [startCol];
  const startKey = `${startRow},${startCol}`;
  const endKey = `${endRow},${endCol}`;
  visited[startKey] = null;

  while (rowQueue.length > 0) {
    const currRow = rowQueue.shift();
    const currCol = colQueue.shift();
    if (dungeon[currRow][currCol] === end)
      return reconstructPath(visited, startKey, endKey);
    //explore neighbours
    const currKey = `${currRow},${currCol}`;
    for (const [i, rowOffset] of dr.entries()) {
      const newRow = currRow + rowOffset;
      const newCol = currCol + dc[i];
      //bound checking
      if (newRow < 0 || newCol < 0) continue;
      if (newRow >= dungeon.length || newCol >= dungeon[0].length) continue;
      const newKey = `${newRow},${newCol}`;
      if (!(newKey in visited) && dungeon[newRow][newCol] != "#") {
        rowQueue.push(newRow);
        colQueue.push(newCol);
        visited[newKey] = currKey;
      }
    }
  }
  return "trapped forever 💀";
};

const findSymbolIndex = (dungeon, symbol) => {
  for (const [i, row] of dungeon.entries()) {
    if (row.includes(symbol)) {
      return { row: i, col: row.indexOf(symbol) };
    }
  }
  return false;
};

const reconstructPath = (visited, start, end) => {
  const path = [end];
  let curr = visited[end];
  while (curr != null) {
    path.push(curr);
    curr = visited[curr];
  }
  return { path: path.reverse(), moves: path.length };
};

console.log(getMeOut(arr, "S", "E"));
