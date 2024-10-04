"use client"
import { useContext } from 'react';
import Sudoku from "./sudoku";
import { SudokuProvider, SudokuContext, SudokuContextType } from "./SudokuContext";

export default function Home(){
  const { grid, setGrid } = useContext(SudokuContext) as SudokuContextType;
  console.log(grid, setGrid);
    return (
        <SudokuProvider >
            <div className="w-[80vh] h-[80vh] mx-auto mt-[10vh]">
                <Sudoku />
            </div>
        </SudokuProvider >
    );
}
