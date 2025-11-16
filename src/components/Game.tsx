import { useState } from "react";
import { initialGrid } from "../const";
import Cell from "./Cell";

function Game() {
  const [grid, setGrid] = useState(initialGrid);
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
              {row.map((_, cellIndex) => {
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
            <div>
              <button
                className="mt-4 border border-black bg-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
