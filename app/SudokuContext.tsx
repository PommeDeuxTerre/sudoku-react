import React, { createContext, ReactNode, useState } from 'react';
import { Sudoku } from '@/utils/Sudoku';

export interface SudokuContextType {
  grid: Sudoku;
  setGrid: React.Dispatch<React.SetStateAction<Sudoku>>;
}

export const SudokuContext = createContext<SudokuContextType|null>(null);

export const SudokuProvider = ({ children }: {children: ReactNode}) => {
  const [grid, setGrid] = useState(new Sudoku());

  return (
    <SudokuContext.Provider value={{ grid, setGrid }}>
      {children}
    </SudokuContext.Provider>
  );
};
