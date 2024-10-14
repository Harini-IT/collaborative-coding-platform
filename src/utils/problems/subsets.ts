import assert from "assert";
import { Problem } from "../types/problem";

export const subsetsHandler = (fn: any) => {
    try {
        const tests = [
            [1,2,3],
            [0],
        ];
        const answers = [
            [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]],
            [[],[0]],
        ];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.deepStrictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from subsetsHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeSubsets = `function subsets(nums) {
  // Write your code here
};`;

export const subsetsProblem: Problem = {
    id: "subsets",
    title: "78. Subsets",
    problemStatement: `<p class='mt-3'>
    Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set).
    The solution set must not contain duplicate subsets. Return the solution in any order.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: [1,2,3]`,
            outputText: `Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,
            explanation: "Return all possible subsets of [1,2,3] without duplicates.",
        },
        {
            id: 1,
            inputText: `Inputs: [0]`,
            outputText: `Output: [[],[0]]`,
            explanation:
                "Return all possible subsets of [0] without duplicates.",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= nums.length <= 10</code></li>
    <li class='mt-2'><code>0 <= nums[i] <= 10</code></li>
    <li class='mt-2'>All the numbers of <code>nums</code> are unique.</li>`,
    starterCode: starterCodeSubsets,
    handlerFunction: subsetsHandler,
    starterFunctionName: "function subsets(",
    order: 10,
};
