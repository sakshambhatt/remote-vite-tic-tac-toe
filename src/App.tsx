import { useState } from "react";
import "./App.css";

const checkWin = (grid: string[][], player1Icon: "x" | "o") => {
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
};

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

function App() {
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [player1Icon, setPlayer1Icon] = useState<"x" | "o">("x");
  const [showPlayerIcons, setShowPlayerIcons] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const player2Icon = player1Icon === "x" ? "o" : "x";
  const type = turnCount % 2 === 0 ? player1Icon : player2Icon;

  function selectPlayer1Icon(icon: "x" | "o") {
    setPlayer1Icon(icon);
    setShowPlayerIcons(true);
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        {/* grid */}
        <h2 className="font-bold my-8">TIC TAC TOE</h2>
        <div className="">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, cellIndex) => {
                const position = { row: rowIndex, col: cellIndex };
                return (
                  <Cell
                    key={cellIndex}
                    type={type}
                    position={position}
                    grid={grid}
                    setGrid={setGrid}
                    setTurnCount={setTurnCount}
                    showPlayerIcons={showPlayerIcons}
                    selectPlayer1Icon={selectPlayer1Icon}
                    player1Icon={player1Icon}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* menu */}
        <div className="">
          <h2 className="font-bold mt-8 mb-2">Settings:</h2>
          <div className={!showPlayerIcons ? "invisible" : "visible"}>
            <div>
              <p>
                Player 1:{" "}
                <span
                  className={
                    player1Icon == "x"
                      ? "text-red-600 text-3xl"
                      : "text-blue-600 text-3xl"
                  }
                >
                  {player1Icon}
                </span>
              </p>
              <p>
                Player 2:{" "}
                <span
                  className={
                    player2Icon == "x"
                      ? "text-red-600 text-3xl"
                      : "text-blue-600 text-3xl"
                  }
                >
                  {player2Icon}
                </span>
              </p>
            </div>
            <div className={showPlayerIcons ? "invisible" : "visible"}>
              <>
                Select icon for player 1:
                <button
                  className="border border-black bg-gray-300 px-4 cursor-pointer mx-4 text-3xl text-red-600"
                  onClick={() => selectPlayer1Icon("x")}
                >
                  x
                </button>
                <button
                  className="border border-black bg-gray-300 px-4 cursor-pointer text-3xl text-blue-600"
                  onClick={() => selectPlayer1Icon("o")}
                >
                  o
                </button>
              </>
            </div>
            {/* <div>
              <button
                className="mt-4 border border-black bg-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => {
                  setGrid([
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""],
                  ]);
                  setShowPlayerIcons(false);
                  setTurnCount(0);
                }}
              >
                Reset Game
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
