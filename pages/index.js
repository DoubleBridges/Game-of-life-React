import Head from "next/head";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <header className="w-full h-32 bg-red-800 shadow-2xl text-white font-extrabold flex justify-center">
        <h1 className="h-full text-center py-2 text-6xl">
          Conway's Game of Life
        </h1>
      </header>
      <section className="flex flex-col flex-1 border-2 border-gray-900 px-32">
        <div className="flex h-full">
          <div className="w-2/3 h-full border border-gray-900 flex flex-col justify-around items-center">
            <div className="w-64 h-64 border border-gray-900"></div>
            <div className="w-3/4 h-16 border border-gray-900"></div>
          </div>
          <div className="w-1/3 h-full border border-gray-900 flex flex-col justify-evenly items-center">
            <button className="px-4 py-2 bg-blue-900 text-white shadow-xl">
              Select This Grid
            </button>
            <button className="px-4 py-2 bg-blue-900 text-white shadow-xl">
              Select This Grid
            </button>
            <button className="px-4 py-2 bg-blue-900 text-white shadow-xl">
              Select This Grid
            </button>
            <button className="px-4 py-2 bg-blue-900 text-white shadow-xl">
              Select This Grid
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
