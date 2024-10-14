import assert from "assert";
import { Problem } from "../types/problem";

export const searchInsertHandler = (fn: any) => {
    try {
        const tests = [
            [[1,3,5,6], 5],
            [[1,3,5,6], 2],
            [[1,3,5,6], 7],
            [[1,3,5,6], 0],
            [[1], 0],
        ];
        const answers = [2, 1, 4, 0, 0];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i][0], tests[i][1]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from searchInsertHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeSearchInsert = `function searchInsert(nums, target) {
  // Write your code here
};`;

export const searchInsertProblem: Problem = {
    id: "search-insert-position",
    title: "35. Search Insert Position",
    problemStatement: `<p class='mt-3'>
    Given a sorted array of distinct integers <code>nums</code> and a target value, return the index if the target is found. 
    If not, return the index where it would be if it were inserted in order.
    You must write an algorithm with <code>O(log n)</code> runtime complexity.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: [1,3,5,6], target = 5`,
            outputText: `Output: 2`,
            explanation: "The target 5 is found at index 2.",
        },
        {
            id: 1,
            inputText: `Inputs: [1,3,5,6], target = 2`,
            outputText: `Output: 1`,
            explanation:
                "The target 2 is not found, so it would be inserted at index 1.",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10^4</code></li>
    <li class='mt-2'><code>-10^4 <= nums[i] <= 10^4</code></li>
    <li class='mt-2'><code>nums</code> is sorted in ascending order and consists of distinct elements.</li>`,
    starterCode: starterCodeSearchInsert,
    handlerFunction: searchInsertHandler,
    starterFunctionName: "function searchInsert(",
    order: 14,
};
