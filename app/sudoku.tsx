"use client"
import { createContext, useContext, useState } from "react";
import { Sudoku as SudokuGame } from "../utils/Sudoku";

const SudokuContext = createContext(new SudokuGame());
const SudokuSetGridContext = createContext((_:SudokuGame)=>{});

export default function Sudoku() {
    const [grid, setGrid] = useState(new SudokuGame());
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

    function update_grid(event: React.ChangeEvent<HTMLInputElement>){
        const move = Number(event.target.value)
        grid.make_move(move, x, y);
        setGrid(grid.clone());
    }

    return (
        <input
            className="w-full h-full border border-grey text-center"
            value={grid.get(x, y) || ""}
            onChange={update_grid}
        />
    );
}
