import { Problem } from "../types/problem";
import { maxProfitProblem } from "./best-time-to-buy-and-sell-stock";
import { containerWithMostWaterProblem } from "./container-with-most-water";
import { generateParenthesesProblem } from "./generate-parenthesis";
import { jumpGame } from "./jump-game";
import { maxDepthProblem } from "./maximum-depth-of-binary-tree";
import { mergeIntervals } from "./merge-intervals";
import { reverseLinkedList } from "./reverse-liked-list";
import { romanToIntProblem } from "./roman-to-integer";
import { search2DMatrix } from "./search-a-2d-matrix";
import { searchInsertProblem } from "./search-insert-position";
import { subsetsProblem } from "./subsets";
import { solveSudokuProblem } from "./sudoku-solver";
import { toLowercase } from "./to-lowercase";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-paranethesis";

interface ProblemMap{
    [key:string]:Problem
}
export const problems:ProblemMap = {
    "two-sum":twoSum,
    "reverse-linked-list":reverseLinkedList,
    "jump-game":jumpGame,
    "search-a-2d-matrix":search2DMatrix,
    "valid-parentheses":validParentheses,
    "to-lowercase": toLowercase,
    "merge-intervals":mergeIntervals,
    "subsets":subsetsProblem,
    "sudoku-solver":solveSudokuProblem,
    "roman-to-integer":romanToIntProblem,
    "best-time-to-buy-and-sell-stock":maxProfitProblem,
    "container-with-most-water":containerWithMostWaterProblem,
    "generate-parenthesis":generateParenthesesProblem,
    "maximum-depth-binary-tree":maxDepthProblem,
    "search-insert-position":searchInsertProblem

}