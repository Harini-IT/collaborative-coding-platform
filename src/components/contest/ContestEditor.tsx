import React, { useEffect, useState } from 'react'
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { githubDark } from '@uiw/codemirror-theme-github'
import EditorFooter from '../WorkSpace/EditorFooter'
import { Problem } from '@/utils/types/problem'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { javascript } from "@codemirror/lang-javascript";
import { problems } from '@/utils/problems'
import { useRouter } from 'next/router'
import {  arrayUnion, doc,  getDoc,  runTransaction, updateDoc } from "firebase/firestore";
import useGetUserDetails from '@/hooks/useGetUserDetails'
import useGetcurrProblem from '@/hooks/useGetCurrProblem'

type Props = {
  problem: Problem;
  setsuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setsolved: React.Dispatch<React.SetStateAction<boolean>>;
};
type TeamDocData = {
  contests: Array<{
    date: string;
    problems: string[];
    solvedBy: string[];
  }>;
};
const ContestEditor: React.FC<Props> = ({ problem, setsuccess, setsolved }) => {
  const [activetestCaseId, setActivetestCaseId] = useState(0);
  const { problemDifficultyClass } = useGetcurrProblem(problem.id);
  let [userCode, setuserCode] = useState<string>(problem.starterCode);
  const [user] = useAuthState(auth);
  const { query: { pid } } = useRouter();
  const { ...data } = useGetUserDetails();
  let ratingArray: number[] = data.rating;
  const currentMonth = new Date().getMonth();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  const returnData = async (transaction: any) => {
    const userRef = doc(firestore, "users", user!.uid);
    const userDoc = await transaction.get(userRef);
    return { userDoc, userRef };
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        toast('Please login to submit the code!');
        return;
      }

      const userRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userTeam = userDoc.data()!.team;
      const teamDocSnapshot = await getDoc(userTeam);
      const contestRef = doc(firestore, "contests", currentDate);
      const contestDoc = await getDoc(contestRef);
      const contestData = contestDoc.data();
      const isUserInTeam = (contestData?.registeredTeams && contestData.registeredTeams.includes(userTeam.id));

      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);

        if (success) {
          toast.success("Congrats, All test cases pass!");
          setsuccess(true);
          setTimeout(() => { setsuccess(false); }, 4000);
          setsolved(true);

          // Contest rating update
          if (problemDifficultyClass === 'Easy')
            ratingArray[currentMonth] += 300;
          else if (problemDifficultyClass === 'Hard')
            ratingArray[currentMonth] += 500;
          else if (problemDifficultyClass === 'Medium')
            ratingArray[currentMonth] += 400;

          await updateDoc(userRef, { solvedContestProblems: arrayUnion(pid), rating: ratingArray });
        } else {
          if (problemDifficultyClass === 'Easy')
            ratingArray[currentMonth] -= 300;
          else if (problemDifficultyClass === 'Hard')
            ratingArray[currentMonth] -= 500;
          else if (problemDifficultyClass === 'Medium')
            ratingArray[currentMonth] -= 400;

          await updateDoc(userRef, { solvedContestProblems: arrayUnion(pid), rating: ratingArray });
        }

        await runTransaction(firestore, async (transaction) => {
          const { userDoc, userRef } = await returnData(transaction);
          const solvedDatesArray = userDoc.data().solvedDates || [];
          const existingDateIndex = solvedDatesArray.findIndex((entry: any) => entry.date === currentDate);

          if (existingDateIndex !== -1)
            solvedDatesArray[existingDateIndex].count += 1;
          else
            solvedDatesArray.push({ date: currentDate, count: 1 });

          transaction.update(userRef, { solvedDates: solvedDatesArray });
        });
      }

      if (isUserInTeam) {
        if (teamDocSnapshot.exists()) {
          const teamDocData = teamDocSnapshot.data() as TeamDocData;
          const contestIndex = teamDocData.contests.findIndex((contest: any) => contest.date === currentDate);
          if (contestIndex !== -1) {
            const contest = teamDocData.contests[contestIndex];
            const teamPrbs:any = contest.problems || [];
            const teamUsers = contest.solvedBy || [];
            teamPrbs.push(pid);
            teamUsers.push(data.displayName);

            await updateDoc(userTeam, {
              [`contests.${contestIndex}.problems`]: teamPrbs,
              [`contests.${contestIndex}.solvedBy`]: teamUsers,
            });
          } else {
            throw new Error("Contest object with today's date not found in the contests array.");
          }
        } else {
          throw new Error("Team document not found.");
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onchange = (value: string) => {
    setuserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setuserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setuserCode(problem.starterCode);
    }
  }, [pid, user, problem, problem.starterCode]);

  return (
    <div className='flex flex-col bg-dark-layer-1 relative'>
    <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
        <div className='w-full overflow-auto'>
<CodeMirror value={userCode} theme={githubDark}
extensions={[javascript()]}  onChange={onchange}/>

        </div>
<div className='w-full px-5 overflow-auto'>
<div className='flex h-10 items-center space-x-6'>
    <div className='relative flex h-full flex-col justify-center cursor-wait'>
        <div className='text-sm font-medium leading-5'>Test cases</div>
        <hr className='absolute bottom-0 h-0.5 w-18 rounded-full border-nonebg-white'/>
    </div>
</div>
<div className="flex">
    {problem.examples.map((example,index)=>(
        <div key={example.id} onClick={()=>setActivetestCaseId(index)} 
        role='button'
        className="mr-2 items-start mt-2 text-white">
        <div className="flex items-center flex-wrap gap-y-4">
            <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 
            hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activetestCaseId === index ? "":"text-gray-500"}`}>
             Case  {index+1}
            </div>
        </div>
    </div>
    ))}

    
</div>

<div className='font-semibold my-4'>
    <p className='text-sm font-medium mt-4 text-white'>Input</p>
    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white'>{problem.examples[activetestCaseId].inputText}</div>
    <p className='text-sm font-medium mt-4 text-white'>Output</p>
    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white'>{problem.examples[activetestCaseId].outputText}</div>
</div>
</div>
    </Split>
    <EditorFooter handleSubmit={handleSubmit}/>

    </div>
  )
}

export default ContestEditor




