import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Presets from "../dummyDb/presets";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export default function Grid() {
  const [gridProps, setGridProps] = useState({
    gridSize: 32,
    speed: 200,
  });

  const [gridForm, setGridForm] = useState({
    gridSize: 32,
    speed: 200,
    preset: "",
  });

  const { gridSize, speed } = gridProps;
  const generateEmptyGrid = (size) => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(Array.from(Array(size), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(gridSize);
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          for (let k = 0; k < gridSize; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < gridSize &&
                newK >= 0 &&
                newK < gridSize
              ) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
  }, []);

  const stepGrid = useCallback(() => {
    if (runningRef.current) {
      setRunning(false);
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          for (let k = 0; k < gridSize; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < gridSize &&
                newK >= 0 &&
                newK < gridSize
              ) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    // setTimeout(runSimulation, speed);
  }, []);

  const setGridToPreset = () => {
    running && setRunning(!running);
    setGrid(Presets[`${gridForm.preset}`]);
  };

  return (
    <>
      <div
        className="shadow-xl"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1rem)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: "1rem",
                height: "1rem",
                backgroundColor: grid[i][k] ? "darkSlateBlue" : "sandyBrown",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <div className="flex flex-col w-2/3 px-4 justify-between">
        <div className="flex w-full justify-between">
          <button
            className="bg-orange-400 hover:bg-indigo-100 text-blue-900 px-6 py-1 my-2 border rounded-sm border-orange-400 shadow-lg"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "stop" : "start"}
          </button>
          <button
            className="bg-orange-400 hover:bg-indigo-100 text-blue-900 px-6 py-1 my-2 border rounded-sm border-orange-400 shadow-lg"
            onClick={() => {
              stepGrid();
            }}
          >
            step
          </button>
          <button
            className="bg-orange-400 hover:bg-indigo-100 text-blue-900 px-6 py-1 my-2 border rounded-sm border-orange-400 shadow-lg"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < gridSize; i++) {
                rows.push(
                  Array.from(Array(gridSize), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            random
          </button>
          <button
            className="bg-orange-400 hover:bg-indigo-100 text-blue-900 px-6 py-1 my-2 border rounded-sm border-orange-400 shadow-lg"
            onClick={() => {
              setGrid(generateEmptyGrid(gridSize));
            }}
          >
            clear
          </button>
        </div>
        <div className="flex w-full justify-around py-2 align-middle">
          <select
            name="Presets"
            className="bg-orange-400 hover:bg-indigo-100 text-blue-900 px-6 py-1 my-2 border rounded-sm border-orange-400 shadow-lg"
            onChange={(e) =>
              setGridForm({ ...gridForm, preset: e.target.value })
            }
          >
            <option value="">Presets</option>
            <option value="twinkle">Twinkle</option>
            <option value="fireWorks">Fire Works</option>
          </select>
          <button
            className="bg-orange-400 hover:bg-indigo-100 text-blue-900 px-6 py-1 my-2 border rounded-sm border-orange-400 shadow-lg"
            onClick={setGridToPreset}
          >
            Set Grid to Preset
          </button>
        </div>
      </div>
    </>
  );
}
