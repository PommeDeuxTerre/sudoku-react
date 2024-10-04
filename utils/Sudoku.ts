export class Sudoku{
    grid:number[][];

    constructor(grid:number[][]=[]){
        if (grid.length == 0)this.grid = Array.from({length: 9}, ()=>Array(9).fill(0)) as number[][];
        else this.grid = grid;
    }

    is_move_valid(move: number, x: number, y: number): boolean {
        // if cancel
        if (move == 0)return true;

        // not in the grid
        if (move < 0 || move > 9)return false;
        // horizontal
        if (this.grid[y].includes(move))return false;
        // vertical
        if (Array(9).fill(0).map((_, i)=>this.grid[i][x]).includes(move))return false;
        // square
        if (Array(9).fill(0).map((_, i)=>this.grid[Math.floor(y / 3) * 3 + Math.floor(i / 3)][Math.floor(x / 3) * 3 + i % 3]).includes(move))return false;

        return true;
    }

    make_move(move: number, x: number, y: number): boolean{
        if (!this.is_move_valid(move, x, y))return false;
        this.grid[y][x] = move;
        return true;
    }

    get(x: number, y: number): number{
        return this.grid[y][x];
    }

    clone(): Sudoku{
        return new Sudoku(this.grid);
    }
}
