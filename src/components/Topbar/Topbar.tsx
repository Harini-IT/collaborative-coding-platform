import { auth} from "@/firebase/firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { TbHeartCode } from "react-icons/tb";
import { RiUserHeartLine } from "react-icons/ri";

type TopbarProps = {
  problemPage?:boolean
};

const Topbar: React.FC<TopbarProps> = ({problemPage}) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState)
  const router = useRouter()
const handleProblemChange = (isforward:boolean)=>{
const {order} = problems[router.query.pid as string] as Problem
const direction = isforward ? 1 : -1
const nextOrder = order+direction
const nextProblemKey  = Object.keys(problems).find(key=>problems[key].order===nextOrder)
if(isforward && !nextProblemKey){
  const first = Object.keys(problems).find((key)=>problems[key].order ===1)
  router.push(`/problems/${first}`)
}else if(!isforward && !nextProblemKey){
const last = Object.keys(problems).find((key)=>problems[key].order ===Object.keys(problems).length)
router.push(`/problems/${last}`)
}
else{
  router.push(`/problems/${nextProblemKey}`)
}
}



  return (
    <nav className="relative flex h-[70px] w-full shrink-0 items-center bg-dark-layer-1 text-dark-gray-7">
<div className={`flex w-full items-center justify-between 
${!problemPage ?"max-w-[1200px] mx-auto" :"" }`}>
       <div className="flex justify-between items-center">
       <Link href="/" className="h-[30px] flex cursor-pointer pr-3">
        <TbHeartCode fontSize={'35'} color="red" /><h1 className="text-xl myfont pt-1 text-cyan-300 font-extrabold">CodeQuest</h1>
        </Link>
        <Link href={"/contest"} className="px-8 pt-2 hover:font-bold">Contests</Link>
        <Link href={"/teams"} className="pt-2 pr-8 hover:font-bold">Teams</Link>
        <Link href={"/contact"} className="pt-2 hover:font-bold">Contact us</Link>
       </div>
{problemPage && (
  <div className="flex items-center gap-4 flex-1 justify-center">
    <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2
    h-8 w-8 cursor-pointer" onClick={()=>handleProblemChange(false)} onMouseDown={()=>handleProblemChange(false)}>
      <FaChevronLeft/>
    </div>
    <Link href="/" className="flex items-center gap-2 font-medium max-w-p120px] text-gray cursor-pointer">
      <div><BsList/></div>
      <p>Problem List</p>
    </Link>
    <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2
    h-8 w-8 cursor-pointer" onClick={()=>handleProblemChange(true)} onMouseDown={()=>handleProblemChange(false)}>
      <FaChevronRight/>
    </div>
  </div>
)}

        <div className="flex items-center space-x-4 flex-1 justify-end">
         
          {!user && (
            <Link href="/auth" onClick={()=>{
				setAuthModalState((prev)=>({...prev,isOpen:true,type:"login"}))}}
        onMouseDown={()=>{
          setAuthModalState((prev)=>({...prev,isOpen:true,type:"login"}))}}>
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          )}
    {user && problemPage }
          {user && (
            <div className="cursor-pointer group relative px-2" onClick={()=>router.push('/profile')} onMouseDown={()=>router.push('/profile')}>
          <RiUserHeartLine fontSize={'35'}/>
              <div
                className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
		transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
   
    </nav>
  );
};
export default Topbar;


