import Topbar from "@/components/Topbar/Topbar"
import WorkSpace from "@/components/WorkSpace/WorkSpace"
import { problems } from "@/utils/problems"
import { Problem } from "@/utils/types/problem"
import { useEffect, useState } from "react"

type Props = {
  problem:Problem
}

const ProblemPage:React.FC<Props> = ({problem}) => {
  const hasMounted = useHasMounted()
if(!hasMounted) return null;
  return (
    <div>
        <Topbar problemPage/>
        <WorkSpace problem={problem} />
    </div>
  )
}

export default ProblemPage


//SSG
//~ getStaticPaths - it creates dynamic routes

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key)=>({
    params:{pid:key}
  }))
  return {
    paths,fallback:false
  }
}

//~fetches data
export async function getStaticProps({params}:{params:{pid:string}}){
const {pid} = params;
const problem = problems[pid];
if(!problem){
  return {notFound:true}
}
problem.handlerFunction = problem.handlerFunction.toString()
return{
  props:{
    problem
  }
}
}


function useHasMounted(){
  const [hasMounted,setHasMounted] = useState(false)
  useEffect(()=>{
    setHasMounted(true)
  },[])
  return hasMounted
}