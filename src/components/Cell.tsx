import checkWin from "../functions/checkWin";

function Cell({
  type,
  position,
  grid,
  setGrid,
  setTurnCount,
  showPlayerIcons,
  selectPlayer1Icon,
  player1Icon,
}: {
  type: "x" | "o";
  position: { row: number; col: number };
  grid: string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  setTurnCount: React.Dispatch<React.SetStateAction<number>>;
  showPlayerIcons: boolean;
  selectPlayer1Icon: (icon: "x" | "o") => void;
  player1Icon: "x" | "o";
}) {
  const handleOnCellClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (position && grid[position.row][position.col] === "") {
      const newGrid = [...grid];
      newGrid[position.row][position.col] = type;
      setGrid(newGrid);
      setTurnCount((prev) => prev + 1);
      if (!showPlayerIcons) {
        selectPlayer1Icon(type);
      }

      const winner = checkWin(grid, player1Icon);
      if (winner) {
        alert(`${winner} wins!`);
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <input
      name="cell"
      className={`border border-black-800 h-10 w-10 cell-type type-${
        grid[position.row][position.col]
      }`}
      type="checkbox"
      onChange={(e) => handleOnCellClick(e)}
    />
  );
}

export default Cell;
