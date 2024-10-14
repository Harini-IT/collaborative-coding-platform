import assert from "assert";
import { Problem } from "../types/problem";

export const maxProfitHandler = (fn: any) => {
    try {
        const tests = [
            [7, 1, 5, 3, 6, 4],
            [7, 6, 4, 3, 1],
            [2, 4, 1],
            [3, 2, 6, 5, 0, 3],
        ];
        const answers = [5, 0, 2, 4];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from maxProfitHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeMaxProfit = `function maxProfit(prices) {
  // Write your code here
};`;

export const maxProfitProblem: Problem = {
    id: "best-time-to-buy-and-sell-stock",
    title: "121. Best Time to Buy and Sell Stock",
    problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>-th day.
    You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
    Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
  </p>`,
    premiumProblem: false,
    examples: [
        {
            id: 0,
            inputText: `Input: [7,1,5,3,6,4]`,
            outputText: `Output: 5`,
            explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
        },
        {
            id: 1,
            inputText: `Inputs: [7,6,4,3,1]`,
            outputText: `Output: 0`,
            explanation:
                "In this case, no transactions are done and the max profit is 0.",
        },
    ],
    constraints: `<li class='mt-2'><code>1 <= prices.length <= 10^5</code></li>
    <li class='mt-2'><code>0 <= prices[i] <= 10^4</code></li>`,
    starterCode: starterCodeMaxProfit,
    handlerFunction: maxProfitHandler,
    starterFunctionName: "function maxProfit(",
    order: 121,
};
