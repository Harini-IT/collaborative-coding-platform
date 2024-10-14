import assert from "assert";
import { Problem } from "../types/problem";

// Function to handle testing for the Container With Most Water problem
export const containerWithMostWaterHandler = (fn: any) => {
    try {
        // Test cases
        const tests = [
            [1, 8, 6, 2, 5, 4, 8, 3, 7],
            [1, 1],
            [4, 3, 2, 1, 4],
            [1, 2, 1],
        ];
        // Expected answers
        const answers = [49, 1, 16, 2];
        // Test each case
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        // All tests passed
        return true;
    } catch (error: any) {
        // Error handling
        console.log("Error from containerWithMostWaterHandler: ", error);
        throw new Error(error);
    }
};

// Starter code for the Container With Most Water problem
const starterCodeContainerWithMostWater = `function maxArea(height) {
  // Write your code here
};`;

// Problem definition
export const containerWithMostWaterProblem: Problem = {
    id: "container-with-most-water",
    title: "11. Container With Most Water",
    problemStatement: `<p class='mt-3'>
    Given <code>n</code> non-negative integers <code>height[i]</code> representing the height of each bar in a bar chart where the width of each bar is <code>1</code>, find the area of the largest rectangle that can be formed by the bars.
  </p>`,
    premiumProblem: true,
    examples: [
        {
            id: 0,
            inputText: `Input: [1,8,6,2,5,4,8,3,7]`,
            outputText: `Output: 49`,
            explanation: "The above vertical lines are represented by the array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (rectangle) the container can hold is 49.",
        },
        {
            id: 1,
            inputText: `Inputs: [1,1]`,
            outputText: `Output: 1`,
            explanation:
                "The above vertical lines are represented by the array [1,1]. In this case, the max area of water (rectangle) the container can hold is 1.",
        },
    ],
    constraints: `<li class='mt-2'><code>n == height.length</code></li>
    <li class='mt-2'><code>2 <= n <= 3 * 10^4</code></li>
    <li class='mt-2'><code>0 <= height[i] <= 3 * 10^4</code></li>`,
    starterCode: starterCodeContainerWithMostWater,
    handlerFunction: containerWithMostWaterHandler,
    starterFunctionName: "function maxArea(",
    order: 6,
};
