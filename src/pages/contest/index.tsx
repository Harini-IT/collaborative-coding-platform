import ContestTimer from "@/components/contest/ContestTimer";
import { firestore } from "@/firebase/firebase";
import useGetContest from "@/hooks/useGetContest";
import useGetProblems from "@/hooks/useGetProblems";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import {  doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { contestState } from "@/atoms/authModalAtom";
import { MagnifyingGlass } from "react-loader-spinner";
import Topbar from "@/components/Topbar/Topbar";
import Footer from "@/components/Footer";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
};

type Contest = {
  formattedDate: string;
  problems: Problem[];
  registeredUsers: string[];
  registeredTeams: string[];
  startTime: string;
  endTime: string;
};

const Index = () => {
  const contestDetails = useGetContest();
  const [loading, setLoading] = useState(true); 
  const [contest, setContest] = useRecoilState(contestState);
  const [contestCreated, setContestCreated] = useState(false);
  const { problems } = useGetProblems(); 
  const { isAdmin, team } = useGetUserDetails();
  let serialNum = 1;

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const formattedDate = getFormattedDate();
        const contestDocRef = doc(firestore, 'contests', formattedDate);
        const contestDoc = await getDoc(contestDocRef);

        if (contestDoc.exists()) {
          setContest(contestDoc.data() as Contest);
          setContestCreated(true); 
        } else {
          setContest(false);
          setContestCreated(false);
        }
      } catch (error) {
        console.error('Error fetching contest details:', error);
        toast.error('Error fetching contest details');
      }
      setLoading(false);
    };

    fetchContestDetails();
  }, []);

  const getFormattedDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleCreateContest = async () => {
    try {
      const selectedProblems = getRandomProblems(problems, 3); 
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
      const formattedDate = getFormattedDate();

      const contestData: Contest = {
        problems: selectedProblems,
        registeredUsers: [],
        registeredTeams: [],
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        formattedDate,
      };

      await setDoc(doc(firestore, 'contests', formattedDate), contestData);
      setContest(contestData);
      setContestCreated(true);
      toast.success('Contest created successfully!');
    } catch (error) {
      console.error('Error creating contest:', error);
      toast.error('Error creating contest');
    }
  };

  const getRandomProblems = (problems: Problem[], numProblems: number): Problem[] => {
    const shuffledProblems = problems.sort(() => Math.random() - 0.5);
    return shuffledProblems.slice(0, numProblems);
  };

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <MagnifyingGlass
          visible={true}
          height="300"
          width="300"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full" style={{ background: "#1b263b" }}>
      <Topbar/>
      <h1 className="text-center text-3xl font-extrabold text-white underline pt-4 pb-2 italic">CodeQuest Weekly Contest</h1>
      <div className="flex justify-center items-center py-15">
        {(!contestCreated && isAdmin) ? (
          <button className="contest flex items-center space-x-2 bg-dark-fill-2 p-2 rounded hover:bg-dark-fill-2" onClick={handleCreateContest}>
            Create Contest
            <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
              <path
                clipRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        ) : null}
        {contestDetails.contest && <ContestTimer />}
      </div>
      <div className="flex justify-center items-center mt-10">
        <table className="w-[70%] divide-y bg-dark-layer-2 divide-gray-200 py-25">
          <caption className="text-center text-2xl font-bold text-white pt-10">Previous Contests</caption>
          <thead style={{ background: "#1d3557" }}>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">S.No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Problem</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Solved by</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200" style={{ background: "#0d1b2a" }}>
            {contestDetails.contest.flatMap((contest: Contest, contestIdx: number) =>
              contest.problems.map((p: Problem, problemIdx: number) => (
                <tr key={`${contestIdx}-${problemIdx}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{serialNum++}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{contest.formattedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200 cursor-pointer">{p.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{contest.registeredUsers.length}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
    
  );
};

export default Index;

