import assert from "assert";
import { Problem } from "../types/problem";

export const solveSudokuHandler = (fn: any) => {
    try {
        const tests = [
            [
                ["5","3",".",".","7",".",".",".","."],
                ["6",".",".","1","9","5",".",".","."],
                [".","9","8",".",".",".",".","6","."],
                ["8",".",".",".","6",".",".",".","3"],
                ["4",".",".","8",".","3",".",".","1"],
                ["7",".",".",".","2",".",".",".","6"],
                [".","6",".",".",".",".","2","8","."],
                [".",".",".","4","1","9",".",".","5"],
                [".",".",".",".","8",".",".","7","9"]
            ]
        ];
        const answers = [
            [
                ["5","3","4","6","7","8","9","1","2"],
                ["6","7","2","1","9","5","3","4","8"],
                ["1","9","8","3","4","2","5","6","7"],
                ["8","5","9","7","6","1","4","2","3"],
                ["4","2","6","8","5","3","7","9","1"],
                ["7","1","3","9","2","4","8","5","6"],
                ["9","6","1","5","3","7","2","8","4"],
                ["2","8","7","4","1","9","6","3","5"],
                ["3","4","5","2","8","6","1","7","9"]
            ]
        ];
        for (let i = 0; i < tests.length; i++) {
            fn(tests[i][0]);
            const result = tests[i][0];
            assert.deepStrictEqual(result, answers[i][0]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from solveSudokuHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeSolveSudoku = `function solveSudoku(board) {
  // Write your code here
};`;

export const solveSudokuProblem: Problem = {
    id: "sudoku-solver",
    title: "37. Sudoku Solver",
    problemStatement: `<p class='mt-3'>
    Write a program to solve a Sudoku puzzle by filling the empty cells.
    A sudoku solution must satisfy all of the following rules:
    <ul>
    <li>Each of the digits <code>1-9</code> must occur exactly once in each row.</li>
    <li>Each of the digits <code>1-9</code> must occur exactly once in each column.</li>
    <li>Each of the digits <code>1-9</code> must occur exactly once in each of the <code>9</code> <code>3x3</code> sub-boxes of the grid.</li>
    </ul>
    The <code>'.'</code> character indicates empty cells.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: ["5","3",".",".","7",".",".",".","."]`,
            outputText: `Output:  ["5","3","4","6","7","8","9","1","2"]`,
            explanation: "The solution for the given Sudoku puzzle.",
        }
    ],
    constraints: `<li class='mt-2'>The input board <code>board</code> is a 9x9 array.</li>
    <li class='mt-2'>Each element of the board is a character in the set <code>{'1', '2', '3', '4', '5', '6', '7', '8', '9', '.'}</code>.</li>`,
    starterCode: starterCodeSolveSudoku,
    handlerFunction: solveSudokuHandler,
    starterFunctionName: "function solveSudoku(",
    order: 15,
};
