import assert from "assert";
import { Problem } from "../types/problem";

export const maxDepthHandler = (fn: any) => {
    try {
        const tests = [
            [3,9,20,null,null,15,7],
            [1,null,2],
            [],
            [0],
        ];
        const answers = [3, 2, 0, 1];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from maxDepthHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeMaxDepth = `function maxDepth(root) {
  // Write your code here
};`;

export const maxDepthProblem: Problem = {
    id: "maximum-depth-of-binary-tree",
    title: "104. Maximum Depth of Binary Tree",
    problemStatement: `<p class='mt-3'>
    Given the root of a binary tree, return its maximum depth.
    A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: [3,9,20,null,null,15,7]`,
            outputText: `Output: 3`,
            explanation: "The maximum depth is 3, which is the length of the longest path from the root node down to the farthest leaf node.",
        },
        {
            id: 1,
            inputText: `Inputs: [1,null,2]`,
            outputText: `Output: 2`,
            explanation:
                "The maximum depth is 2, which is the length of the longest path from the root node down to the farthest leaf node.",
        },
    ],
    constraints: `<li class='mt-2'><code>The number of nodes in the tree is in the range [0, 10^4]</code></li>
    <li class='mt-2'><code>-100 <= Node.val <= 100</code></li>`,
    starterCode: starterCodeMaxDepth,
    handlerFunction: maxDepthHandler,
    starterFunctionName: "function maxDepth(",
    order: 8,
};
