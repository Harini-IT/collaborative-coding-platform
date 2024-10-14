import assert from "assert";
import { Problem } from "../types/problem";

export const generateParenthesesHandler = (fn: any) => {
    try {
        const tests = [
            3,
            1,
        ];
        const answers = [
            ["((()))","(()())","(())()","()(())","()()()"],
            ["()"]
        ];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.deepStrictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from generateParenthesesHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeGenerateParentheses = `function generateParentheses(n) {
  // Write your code here
};`;

export const generateParenthesesProblem: Problem = {
    id: "generate-parentheses",
    title: "22. Generate Parentheses",
    problemStatement: `<p class='mt-3'>
    Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: 3`,
            outputText: `Output: ["((()))","(()())","(())()","()(())","()()()"]`,
            explanation: "Generate all combinations of well-formed parentheses with 3 pairs.",
        },
        {
            id: 1,
            inputText: `Inputs: 1`,
            outputText: `Output: ["()"]`,
            explanation:
                "Generate all combinations of well-formed parentheses with 1 pair.",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= n <= 8</code></li>`,
    starterCode: starterCodeGenerateParentheses,
    handlerFunction: generateParenthesesHandler,
    starterFunctionName: "function generateParentheses(",
    order: 13,
};
