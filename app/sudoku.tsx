"use client"
import { createContext, useContext, useState } from "react";

const SudokuContext = createContext(Array.from({length: 9}, ()=>Array(9).fill(0)));
const SudokuSetGridContext = createContext((_:number[][])=>{});

export default function Sudoku() {
    const [grid, setGrid] = useState(Array.from({length: 9}, ()=>Array(9).fill(0)) as number[][]);
    return (
        <SudokuSetGridContext.Provider value={setGrid}>
            <SudokuContext.Provider value={grid}>
                <div className="w-full h-full flex flex-col">
                    <SudokuRow y={0} />
                    <SudokuRow y={1} />
                    <SudokuRow y={2} />
                    <SudokuRow y={3} />
                    <SudokuRow y={4} />
                    <SudokuRow y={5} />
                    <SudokuRow y={6} />
                    <SudokuRow y={7} />
                    <SudokuRow y={8} />
                </div>
            </SudokuContext.Provider>
        </SudokuSetGridContext.Provider>
    );
}

function SudokuRow({y}: {y: number}) {
    return (
        <div className="w-full h-full flex flex-row">
            <SudokuSquare x={0} y={y} />
            <SudokuSquare x={1} y={y} />
            <SudokuSquare x={2} y={y} />
            <SudokuSquare x={3} y={y} />
            <SudokuSquare x={4} y={y} />
            <SudokuSquare x={5} y={y} />
            <SudokuSquare x={6} y={y} />
            <SudokuSquare x={7} y={y} />
            <SudokuSquare x={8} y={y} />
        </div>
    );
}

function SudokuSquare({y, x}: {y: number, x: number}) {
    const grid = useContext(SudokuContext);
    const setGrid = useContext(SudokuSetGridContext);

    function is_move_valid(move: number): boolean {
        // if cancel
        if (move == 0)return true;

        // horizontal
        if (grid[y].includes(move))return false;
        // vertical
        if (Array(9).fill(0).map((_, i)=>grid[i][x]).includes(move))return false;
        // square
        if (Array(9).fill(0).map((_, i)=>grid[Math.floor(y / 3) * 3 + Math.floor(i / 3)][Math.floor(x / 3) * 3 + i % 3]).includes(move))return false;

        return true;
    }

    function update_grid(event: React.ChangeEvent<HTMLInputElement>){
        const value = Number(event.target.value)

        if (value < 0 || value > 9)return;
        if (!is_move_valid(value))return;

        grid[y][x] = value;
        setGrid(grid.slice())
    }

    return (
        <input
            className="w-full h-full border border-grey text-center"
            value={grid[y][x] || ""}
            onChange={update_grid}
        />
    );
}
