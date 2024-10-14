import React, { useEffect, useState } from 'react'
import SettingNav from './SettingNav'
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { githubDark } from '@uiw/codemirror-theme-github'
import EditorFooter from './EditorFooter'
import { Problem } from '@/utils/types/problem'
import BronzeMedalPopup from '../FilterSearch/BronzeMedalPopup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { javascript } from "@codemirror/lang-javascript";
import { problems } from '@/utils/problems'
import { useRouter } from 'next/router'
import {  arrayUnion, doc,  runTransaction, updateDoc } from "firebase/firestore";
import useGetSolvedProblems from '@/hooks/useGetSolvedProblems'
type Props = {
    problem:Problem,
    setsuccess:React.Dispatch<React.SetStateAction<boolean>>,
    setsolved:React.Dispatch<React.SetStateAction<boolean>>,
}
export interface ISettings{
    fontSize:string,settingsModalOpen:boolean,dropdownOpen:boolean
}
const Editor:React.FC<Props> = ({problem,setsuccess,setsolved}) => {
const [activetestCaseId,setActivetestCaseId] = useState(0)
const [open, setOpen] = useState(false);
const [color,setColor] = useState('')
const [medal,setMedal]= useState('')
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const solvedProblems = useGetSolvedProblems();
let [userCode, setuserCode] = useState<string>(problem.starterCode)
const [settings, setsettings] = useState<ISettings>({fontSize:"16px",settingsModalOpen:false,dropdownOpen:false})
const [user] = useAuthState(auth)
const {query:{ pid } } = useRouter()
function getCurrentDate() {
    const now = new Date();    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }

  const returnData = async(transaction:any)=>{
    const userRef = doc(firestore,"users",user!.uid)
    const userDoc = await transaction.get(userRef)
    return {userDoc,userRef}
  }
const handleSubmit = async()=>{
    if(!user){
    toast('Please login to submit the code!')
return;
    }
       

try {
  userCode =  userCode.slice(userCode.indexOf(problem.starterFunctionName))
  const cb = new Function(`return ${userCode}`)(); 
  const handler = problems[pid as string].handlerFunction
  if(typeof handler === "function") {
    const success = handler(cb)
    if(success){
        toast.success("Congrats, All testcases passes!")
       setsuccess(true)
       setTimeout(()=>{setsuccess(false)},4000)
       const userRef = doc(firestore,'users',user.uid)
       await updateDoc(userRef,{solvedProblems:arrayUnion(pid)})
       setsolved(true)   
       if(solvedProblems.length==20){
        await updateDoc(userRef,{badges:arrayUnion('bronze')}) 
        handleOpen(); 
        setColor('#cd7f32'); setMedal('Bronze')
       }
       else if(solvedProblems.length==50){
        await updateDoc(userRef,{badges:arrayUnion('silver')}) 
        handleOpen()
        setColor('#C0C0C0'); setMedal('Silver')
       }
       }
    const date = getCurrentDate();

await runTransaction(firestore, async (transaction) => {
  const { userDoc, userRef } = await returnData(transaction);
 const solvedDatesArray = userDoc.data().solvedDates || [];  
 const existingDateIndex = solvedDatesArray.findIndex((entry:any) => entry.date === date);
   if (existingDateIndex !== -1)
    solvedDatesArray[existingDateIndex].count += 1;
  else   solvedDatesArray.push({ date: date, count: 1 });
  

  transaction.update(userRef, { solvedDates: solvedDatesArray });
});
  }
} catch (error:any) {
if(error.message.startsWith('Error:AssertionError'))
toast.error('Test cases failed')
else
console.log(error)

}

}


const onchange = (value:string)=>{
setuserCode(value)
localStorage.setItem(`code-${pid}`,JSON.stringify(value))
}
useEffect(()=>{
    const code = localStorage.getItem(`code-${pid}`)
    if(user){
setuserCode(code ? JSON.parse(code): problem.starterCode)
    }else{
setuserCode(problem.starterCode)
    }
},[[pid,user,problem,problem.starterCode]])

  return (
    <div className='flex flex-col bg-dark-layer-1 relative'>
      <BronzeMedalPopup open={open} handleClose={handleClose} color={color} medal={medal}/>
    <SettingNav/>
    <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
        <div className='w-full overflow-auto'>
<CodeMirror value={userCode} theme={githubDark}
extensions={[javascript()]} style={{fontSize:settings.fontSize}} onChange={onchange}/>

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

export default Editor


