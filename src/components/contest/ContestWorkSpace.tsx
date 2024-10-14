import React, { useEffect, useState } from 'react'
import Split from 'react-split'
import ProblemDescription from '../WorkSpace/ProblemDescription'
import { Problem } from '@/utils/types/problem'
import Confetti from 'react-confetti'
import useGetUserDetails from '@/hooks/useGetUserDetails'
import { IoIosLock } from "react-icons/io";
import { useRouter } from 'next/router'
import ContestEditor from '../contest/ContestEditor'
type Props = {
  problem:Problem,
}

const ContestWorkSpace:React.FC<Props>= ({problem}) => {
  const [success, setsuccess] = useState(false)
const [solved, setsolved] = useState(false)
const {width,height} = useWindowSize()
  const {premium} = useGetUserDetails()
  if(premium===false && problem.premiumProblem==true){
    return <Premium/>
  }

  return (
    <>
    
        <Split className='split' minSize={0}>
<ProblemDescription problem={problem} _solved={solved}/>
<div className='bg-dark-fill-2'>
  <ContestEditor problem={problem} setsuccess={setsuccess} setsolved={setsolved}/>
 {success &&  <Confetti gravity={0.2} tweenDuration={5000} width={width-1} height={height-1}/>}
</div>
    </Split>
      
    
    </>
  )
}

export default ContestWorkSpace

function useWindowSize(){
  const [windowSize, setwindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth :1200,
    height: typeof window !== "undefined" ? window.innerHeight :800,
  })

  function changeWindowSize(){
    if(typeof window !== "undefined")
    setwindowSize({width:window.innerWidth,height:window.innerHeight})
  }
  useEffect(()=>{
    if(typeof window !== "undefined"){
      window.addEventListener('resize',changeWindowSize)
      return ()=>{
        window.removeEventListener('resize',changeWindowSize)
      }
    }
  },[])
  return windowSize
}


const Premium = ()=>{
  const router = useRouter()
  return(
    <div className="h-screen flex flex-col justify-center items-center p-10">
    <IoIosLock className="text-8xl mb-4" style={{ color: 'orange' }} />
    <h2 className="text-3xl font-bold mb-2">Problem Locked!</h2>
    <p className="text-center mb-4">Upgrade to Premium to solve this problem</p>
    <button className="bg-blue-400 hover:bg-blue-600 font-bold py-2 px-4 rounded" onClick={()=>router.push('/payment')}>
      Upgrade
    </button>
  </div>
  )
}