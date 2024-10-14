import { auth, firestore } from "@/firebase/firebase";
import useGetcurrProblem from "@/hooks/useGetCurrProblem";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Problem } from "@/utils/types/problem";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {  doc,  runTransaction } from "firebase/firestore";

type Props={
    problem:Problem
}
interface Comment {
  comment?: any;
  user?: any; 
}
const Comments:React.FC<Props> = ({problem})=>{
const [user] = useAuthState(auth)
    const {...userData} = useGetUserDetails()
    const { ...data } = useGetcurrProblem(problem.id);
    const [inputValue, setInputValue] = useState('');
    const returnData = async(transaction:any)=>{
        const userRef = doc(firestore,"users",user!.uid)
        const userDoc = await transaction.get(userRef)
  const problemRef = doc(firestore,"problems",problem.id);
  const problemDoc = await transaction.get(problemRef);
        return {userDoc,userRef,problemDoc,problemRef}
      }

    const handleInputChange = (event:any) => {
      setInputValue(event.target.value);
    };
    const handleSubmit = async()=>{
        await runTransaction(firestore,async(transaction)=>{
            const {userDoc,userRef,problemRef,problemDoc} = await returnData(transaction) 
            const userComments = [ ...userDoc.data().comments,
                { comment: inputValue, problem:data.currProblem?.id } 
              ];
            const prblmComments = [...problemDoc.data().comments,
            {comment:inputValue,user:userData.displayName}]  
            transaction.update(userRef, { comments:userComments });
            transaction.update(problemRef,{comments:prblmComments})
        })
    }
   
    return(
        <>
      
      <div className="w-full">
  <h2 className="text-xl font-semibold mb-4 text-white">Comments</h2>
  {data.currProblem && data.currProblem.comments && data.currProblem.comments.length > 0 ? (
    data.currProblem.comments.map((comment:Comment, index) => (
      <div className="bg-gray-600 p-4 my-2 rounded-lg" key={index}>
        <div className="text-white text-sm italic">{comment?.user}</div>
        <div className="text-white text-lg">{(comment as { comment?: string })?.comment}</div>
      </div>
    ))
  ) : (
    <div className="text-white py-2">No comments available</div>
  )}
</div>

      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <textarea placeholder="Add your comment"
        value={inputValue}
        onChange={handleInputChange}
        rows={3}
        cols={60}
        className="custom-input block w-full mt-1 text-sm"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
</>
    )
}
export default Comments