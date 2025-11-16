function checkWin(grid: string[][], player1Icon: "x" | "o") {
  for (let row = 0; row < 3; row++) {
    if (
      grid[row][0] !== "" &&
      grid[row][0] === grid[row][1] &&
      grid[row][1] === grid[row][2]
    ) {
      return grid[row][0] === player1Icon ? "Player 1" : "Player 2";
    }
  }
  for (let col = 0; col < 3; col++) {
    if (
      grid[0][col] !== "" &&
      grid[0][col] === grid[1][col] &&
      grid[1][col] === grid[2][col]
    ) {
      return grid[0][col] === player1Icon ? "Player 1" : "Player 2";
    }
  }
  if (
    grid[0][0] !== "" &&
    grid[0][0] === grid[1][1] &&
    grid[1][1] === grid[2][2]
  ) {
    return grid[0][0] === player1Icon ? "Player 1" : "Player 2";
  }
  if (
    grid[0][2] !== "" &&
    grid[0][2] === grid[1][1] &&
    grid[1][1] === grid[2][0]
  ) {
    return grid[0][2] === player1Icon ? "Player 1" : "Player 2";
  }
  return null;
}

export default checkWin;
