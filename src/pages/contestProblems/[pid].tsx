import Topbar from "@/components/Topbar/Topbar"
import ContestWorkSpace from "@/components/contest/ContestWorkSpace"
import { firestore } from "@/firebase/firebase"
import useGetUserDetails from "@/hooks/useGetUserDetails"
import { problems } from "@/utils/problems"
import { Problem } from "@/utils/types/problem"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Hourglass } from "react-loader-spinner"


type Props = {
  problem:Problem
}

const ContestProblemsPage:React.FC<Props> = ({problem}) => {
  const {...data} = useGetUserDetails()
  const [isAccessible, setIsAccessible] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { pid } = router.query;

 
  

  useEffect(() => {
    if (!pid) return;

    const fetchContestData = async () => {
      setLoading(true); 

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const contestDocRef = doc(firestore, "contests", formattedDate);
      const contestDoc = await getDoc(contestDocRef);

      if (contestDoc.exists()) {
        const contestData = contestDoc.data();
        const startTime = new Date(contestData.startTime);
        const endTime = new Date(contestData.endTime);
        const currentTime = new Date();
        const registeredUsers = contestData.registeredUsers || [];
        const isUserRegistered = registeredUsers.some((userObj:any) => userObj.userDetail === data.email);

        if (isUserRegistered && currentTime >= startTime && currentTime <= endTime) {
          setIsAccessible(true);
        } else {
          setIsAccessible(false);
        }
      } else {
        setIsAccessible(false);
      }

      setLoading(false);
    };

    fetchContestData();
  }, [pid, data.email, firestore]);
  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
    <Hourglass visible={true}  height="250" width="250" ariaLabel="hourglass-loading" 
    wrapperStyle={{}} wrapperClass="" colors={['#306cce', '#72a1ed']}
    />
    </div>
    )
  }
  return (
    <div>
      <Topbar problemPage/>
        <ContestWorkSpace problem={problem} />
    </div>
  );
};

export default ContestProblemsPage;




export async function getStaticPaths() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  try {
    const contestDocRef = doc(firestore, "contests", formattedDate);
    const contestDoc = await getDoc(contestDocRef);
    if (!contestDoc.exists()) {
      console.error("No contest found for date:", formattedDate);
      return {
        paths: [],
        fallback: false,
      };
    }
    const contestData = contestDoc.data();
    const problemIds = contestData.problems.map((problem:any) => problem.id);
    const paths = problemIds.map((pid:string) => ({
      params: { pid: String(pid) }
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching contest document:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}



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

