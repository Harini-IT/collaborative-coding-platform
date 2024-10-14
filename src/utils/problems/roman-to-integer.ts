import assert from "assert";
import { Problem } from "../types/problem";

export const romanToIntHandler = (fn: any) => {
    try {
        const tests = [
            "III",
            "IV",
            "IX",
            "LVIII",
            "MCMXCIV",
        ];
        const answers = [3, 4, 9, 58, 1994];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from romanToIntHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeRomanToInt = `function romanToInt(s) {
  // Write your code here
};`;

export const romanToIntProblem: Problem = {
    id: "roman-to-integer",
    title: "13. Roman to Integer",
    problemStatement: `<p class='mt-3'>
    Roman numerals are represented by seven different symbols: <code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code>, and <code>M</code>.
    Given a roman numeral <code>s</code>, convert it to an integer.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: "III"`,
            outputText: `Output: 3`,
            explanation: "The roman numeral III represents the integer 3.",
        },
        {
            id: 1,
            inputText: `Inputs: "IV"`,
            outputText: `Output: 4`,
            explanation:
                "The roman numeral IV represents the integer 4.",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= s.length <= 15</code></li>
    <li class='mt-2'><code>s</code> contains only the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li>`,
    starterCode: starterCodeRomanToInt,
    handlerFunction: romanToIntHandler,
    starterFunctionName: "function romanToInt(",
    order: 12,
};
