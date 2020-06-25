import Head from "next/head";
import Grid from "../components/Grid";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <header className="w-full h-218 bg-indigo-600 shadow-2xl text-white font-extrabold flex justify-center">
        <h1 className="h-full text-center py-2 text-3xl">
          Conway's Game of Life
        </h1>
      </header>
      <section className="flex flex-col flex-1 border-2 px-32">
        <div className="flex h-full">
          <div className="w-2/3 h-full flex flex-col justify-evenly items-center">
            <Grid />
          </div>
          <div className="w-1/3 h-full flex flex-col pt-12 items-center">
            <p className=" text-lg">
              The universe of the Game of Life is a two-dimensional orthogonal
              grid of square cells, each of which is in one of two possible
              states, live or dead, (or populated and unpopulated,
              respectively). Every cell interacts with its eight neighbours,
              which are the cells that are horizontally, vertically, or
              diagonally adjacent. At each step in time, the following
              transitions occur:
            </p>
            <p className="text-2xl font-semibold pt-8 pb-4">Rules</p>
            <ol>
              <li className="py-2">
                1. Any live cell with fewer than two live neighbours dies, as if
                by underpopulation.
              </li>
              <li className="py-2">
                2. Any live cell with two or three live neighbours lives on to
                the next generation.
              </li>
              <li className="py-2">
                3. Any live cell with more than three live neighbours dies, as
                if by overpopulation.
              </li>
              <li className="py-2">
                4. Any dead cell with exactly three live neighbours becomes a
                live cell, as if by reproduction.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
