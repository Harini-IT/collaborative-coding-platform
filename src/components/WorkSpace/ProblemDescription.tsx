import { auth, firestore } from "@/firebase/firebase";
import { Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import Comments from "./Comments";
import useGetcurrProblem from "@/hooks/useGetCurrProblem";

type ProblemDescriptionProps = {
  problem: Problem;
  _solved:boolean
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem,_solved }) => {
  const [user] = useAuthState(auth)
  const { currProblem, loading, problemDifficultyClass,setCurrproblem } = useGetcurrProblem(
    problem.id
  );
  const { liked, disliked, solved, setData, starred } = useGetUserDataOnProblem(
    problem.id
  );
  const [updating, setupdating] = useState(false)
const returnData = async(transaction:any)=>{
  const userRef = doc(firestore,"users",user!.uid)
  const problemRef = doc(firestore,"problems",problem.id);
  const userDoc = await transaction.get(userRef)
  const problemDoc = await transaction.get(problemRef);
  return {userDoc,problemDoc,userRef,problemRef}
}


const handleLike =async ()=>{
if(!user) {
  toast.error('You must log in to like a problem',{position:'top-left'})
  return;
}
if(updating) return;
setupdating(true)
await runTransaction(firestore,async(transaction)=>{
 const {userDoc,problemDoc,userRef,problemRef} = await returnData(transaction) 
  if(userDoc.exists() && problemDoc.exists()){
    if(liked){
      transaction.update(userRef,{
        likedProblems:userDoc.data().likedProblems.filter((id:string)=>id!=problem.id)
      })
      transaction.update(problemRef,{
        liked:problemDoc.data().likes-1
      })
      setCurrproblem((prev)=>prev ? {...prev,likes:prev.likes-1}:null) 
      setData(prev=>({...prev,liked:false}))
    }
    else if(disliked){
transaction.update(userRef,{
  likedProblems:[...userDoc.data().likedProblems,problem.id],
  dislikedProblems:userDoc.data().dislikedProblems.filter((id:string)=>id!=problem.id)
})
transaction.update(problemRef,{
  likes:problemDoc.data().likes+1,
  dislikes:problemDoc.data().dislikes-1
})
setCurrproblem((prev)=>prev ? {...prev,likes:prev.likes+1,dislikes:prev.dislikes-1}: null)
setData(prev=>({...prev,likes:true,disliked:false}))
    }else{
//didn't liked didn't disliked case
transaction.update(userRef,{
  likedProblems:[...userDoc.data().likedProblems,problem.id],
})
transaction.update(problemRef,{
  likes:problemDoc.data().likes+1,
})
setCurrproblem((prev)=>prev ? {...prev,likes:prev.likes+1}: null)
setData(prev=>({...prev,liked:true}))
    }
  }

})
setupdating(false)
}

const handleDislike = async()=>{
  if(!user) {
    toast.error('You must log in to dislike a problem',{position:'top-left',theme:'dark'})
    return;
  }
  if(updating) return;
  setupdating(true)
  await runTransaction(firestore,async(transaction:any)=>{
  const {userDoc,problemDoc,userRef,problemRef} = await returnData(transaction) 
if(userDoc.exists()&&problemDoc.exists()){
   if(disliked){
    transaction.update(userRef,{
      dislikedProblems:userDoc.data().dislikedProblems.filter((id:string)=>id!==problem.id)
    })
    transaction.update(problemRef,{
      dislikes:problemDoc.data().dislikes -1
    })
    setCurrproblem((prev)=>prev ? {...prev,dislikes:prev.dislikes-1}:null)
    setData((prev)=>({...prev,disliked:false}))
   }
   else if(liked){
    transaction.update(userRef,{
      dislikedProblems:[...userDoc.data().dislikedProblems,problem.id],
      likedProblems:userDoc.data().likedProblems.filter((id:string)=>id!==problem.id)
    })
    transaction.update(problemRef,{
      dislikes:problemDoc.data().dislikes +1,
      likes:problemDoc.data().likes - 1
    })
    setCurrproblem((prev)=>prev ? {...prev,dislikes:prev.dislikes+1,likes:prev.likes -1}:null)
    setData((prev)=>({...prev,disliked:true,liked:false}))
   }
   else{
    transaction.update(userRef,{
      dislikedProblems:[...userDoc.data().dislikedProblems,problem.id],
    })
    transaction.update(problemRef,{
      dislikes:problemDoc.data().dislikes +1,
    })
    setCurrproblem((prev)=>prev ? {...prev,dislikes:prev.dislikes+1}:null)
    setData((prev)=>({...prev,disliked:true}))
   }
}
  })
  setupdating(false)
}


const handleStar = async()=>{
  if(!user) {
    toast.error('You must log in to star a problem',{position:'top-left',theme:'dark'})
    return;
  }
  if(updating) return;
  setupdating(true)
  if(!starred){
    const userRef = doc(firestore,"users",user.uid)
    await updateDoc(userRef,{
      starredProblems: arrayUnion(problem.id)
    })
    setData((prev)=>({...prev,starred:true}))
  }
  else{
    const userRef = doc(firestore,"users",user.uid)
await updateDoc(userRef,{
  starredProblems:arrayRemove(problem.id)
})
setData((prev)=>({...prev,starred:false}))

  }
  setupdating(false)
}
  return (
    <div className='bg-dark-layer-1'>
    <div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
      <div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
        Description
      </div>
    </div>

    <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
      <div className='px-5'>
        <div className='w-full'>
          <div className='flex space-x-4'>
            <div className='flex-1 mr-2 text-lg text-white font-medium'>{problem?.title}</div>
          </div>
          {!loading && currProblem && (
            <div className='flex items-center mt-3'>
              <div
                className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {currProblem.difficulty}
              </div>
              {(solved || _solved) && (
                <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
                  <BsCheck2Circle />
                </div>
              )}
              <div
                className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                onClick={handleLike} onFocus={handleLike}
              >
                {liked && !updating && <AiFillLike className='text-dark-blue-s' />}
                {!liked && !updating && <AiFillLike />}
                {updating && <AiOutlineLoading3Quarters className='animate-spin' />}

                <span className='text-xs'>{currProblem.likes}</span>
              </div>
              <div
                className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
                onClick={handleDislike} onFocus={handleDislike}
              >
                {disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
                {!disliked && !updating && <AiFillDislike />}
                {updating && <AiOutlineLoading3Quarters className='animate-spin' />}

                <span className='text-xs'>{currProblem.dislikes}</span>
              </div>
              <div
                className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
                onClick={handleStar} onFocus={handleStar}
              >
                {starred && !updating && <AiFillStar className='text-dark-yellow' />}
                {!starred && !updating && <TiStarOutline />}
                {updating && <AiOutlineLoading3Quarters className='animate-spin' />}
              </div>
            </div>
          )}
          <div className='text-white text-sm'>
            <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
          </div>
          <div className='mt-4'>
            {problem.examples.map((example, index) => (
              <div key={example.id}>
                <p className='font-medium text-white '>Example {index + 1}: </p>
                {example.img && <img src={example.img} alt='' className='mt-3' />}
                <div className='example-card'>
                  <pre>
                    <strong className='text-white'>Input: </strong> {example.inputText}
                    <br />
                    <strong>Output:</strong>
                    {example.outputText} <br />
                    {example.explanation && (
                      <>
                        <strong>Explanation:</strong> {example.explanation}
                      </>
                    )}
                  </pre>
                </div>
              </div>
            ))}
          </div>
          <div className='my-8 pb-4'>
            <div className='text-white text-sm font-medium'>Constraints:</div>
            <ul className='text-white ml-5 list-disc '>
              <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
            </ul>
          </div>
        </div>
        <Comments problem={problem}/>
      </div>
    </div>
  </div>
  );
};
export default ProblemDescription;




function useGetUserDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false, premium:false
  });
  const [user] = useAuthState(auth);
  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems, premium
        } = data;
        setData({
          liked: likedProblems.includes(problemId),
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
          premium:premium
        });
      }
    };
    if (user) getUserData();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false,premium:false });
  }, [problemId, user]);
  return { ...data, setData };
  
}

