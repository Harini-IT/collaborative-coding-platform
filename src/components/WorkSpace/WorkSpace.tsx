import React, { useEffect, useState } from 'react'
import Split from 'react-split'
import ProblemDescription from './ProblemDescription'
import Editor from './Editor'
import { Problem } from '@/utils/types/problem'
import Confetti from 'react-confetti'



type Props = {
  problem:Problem,
}

const WorkSpace:React.FC<Props>= ({problem}) => {
  const [success, setsuccess] = useState(false)
const [solved, setsolved] = useState(false)
const {width,height} = useWindowSize()

  
 
  return (
    <>
    
        <Split className='split' minSize={0}>
<ProblemDescription problem={problem} _solved={solved}/>
<div className='bg-dark-fill-2'>
 <Editor problem={problem} setsuccess={setsuccess} setsolved={setsolved}/>
  
 {success &&  <Confetti gravity={0.2} tweenDuration={5000} width={width-1} height={height-1}/>}
</div>
    </Split>
      
    
    </>
  )
}

export default WorkSpace

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


