import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeToLowerCase = `function toLowerCase(s){
  // Write your code here
};`;


const handlerToLowerCase = (fn: any) => {
	try {
		const s = [
			"Hello","worLD","tEdDyY"
		];

		const answers = [
			"hello","world","teddyy"
		];

		for (let i = 0; i < s.length; i++) {
			const result = fn(s[i]);
			assert.deepStrictEqual(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("toLowerCase handler function error");
		throw new Error(error);
	}
};

export const toLowercase: Problem = {
	id: "to-lowercase",
	title: "11. To LowerCase",
	problemStatement: `<p class='mt-3'>
    Given a string <code>s</code>, return the string after replacing every uppercase letter with the same lowercase letter.`,
	examples: [
		{
			id: 1,
			inputText: "heLLo WorLd",
			outputText: "hello world",
		},
		{
			id: 2,
			inputText: "tOm aND jErrY",
			outputText: "tom and jerry",
		},
		{
			id: 3,
			inputText: "bLacK ShirT",
			outputText: "black shirt",
		},
	],
	constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10</code>
</li> <li class='mt-2'>
<code>s</code>consists of printable ASCII characters.

<strong>Only one valid answer exists.</strong>
</li>`,
	handlerFunction: handlerToLowerCase,
	starterCode: starterCodeToLowerCase,
	order: 11,
	starterFunctionName: "function toLowerCase(",
};