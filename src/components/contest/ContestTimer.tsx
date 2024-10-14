import { useEffect, useRef, useState } from 'react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import useGetUserDetails from '@/hooks/useGetUserDetails';
type TeamDocData = {
  teamName: String,
  contests: Array<{
    date: string;
    problems: string[];
    solvedBy: string[];
  }>;
};
  
  const ContestTimer: React.FC = () => {
    const [timer, setTimer] = useState('00:00:00');
    const [user] = useAuthState(auth);
    const { ...data } = useGetUserDetails();
    const [userRegistered, setUserRegistered] = useState(false);
    const timerRef = useRef<number | null>(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    const date = `${year}-${month}-${day}`;
  
    useEffect(() => {
      const fetchContestDetails = async () => {
        const contestDocRef = doc(firestore, 'contests', date);
        const userRef = doc(firestore, 'users', user!.uid);
        const userDoc = await getDoc(userRef);
        const userTeam = userDoc.data()?.team;
        if (!userTeam) return;
  
        const teamDocSnapshot = await getDoc(userTeam);
        const teamDocData = teamDocSnapshot.data() as TeamDocData;
        const unsubscribe = onSnapshot(contestDocRef, (doc) => {
          if (doc.exists()) {
            const contestData = doc.data();
            const startTime = new Date(contestData.startTime).getTime();
            const endTime = new Date(contestData.endTime).getTime();
            const registeredUsers = contestData.registeredUsers || [];
            const registeredTeams = contestData.registeredTeams || [];
  
            if (data.email && registeredUsers.includes(data.email)) {
              setUserRegistered(true);
            }
            if (registeredTeams.includes(teamDocData.teamName)) {
              setUserRegistered(true);
            }
  
            startTimer(startTime, endTime);
          }
        });
  
        return () => unsubscribe();
      };
  
      if (data.email || data.team) {
        fetchContestDetails();
      }
    }, [data.email, data.team, date, user]);
  
    const getFormattedDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const startTimer = (startTime: number, endTime: number) => {
      const updateTimer = () => {
        const currentTime = Date.now();
        let remainingTime;
  
        if (currentTime < startTime) {
          remainingTime = startTime - currentTime;
        } else if (currentTime > endTime) {
          remainingTime = 0;
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
          }
        } else {
          remainingTime = endTime - currentTime;
        }
  
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
  
        setTimer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      };
  
      updateTimer();
  
      timerRef.current = window.setInterval(updateTimer, 1000);
    };
  
    const registerTeam = async () => {
      try {
        const userDocRef = doc(firestore, 'users', user!.uid);
        const userSnapshot = await getDoc(userDocRef);
        const userData = userSnapshot.data();
  
        if (!userData || !userData.team) {
          toast.error('User has no team');
          return;
        }
        const teamRef = userData.team;
        const teamDocSnapshot = await getDoc(teamRef);
  
        if (!teamDocSnapshot.exists()) {
          toast.error('Team not found');
          return;
        }
        const teamData:any = teamDocSnapshot.data();
        const teamName = teamData.teamName;
        
        const formattedDate = getFormattedDate();
        const contestDocRef = doc(firestore, "contests", formattedDate); 
        const teamDocRef = doc(firestore, "teams", teamName);
        await updateDoc(contestDocRef, {
          registeredTeams: arrayUnion(teamName),
        });
        await updateDoc(teamDocRef, {
          contests: arrayUnion({ date: formattedDate, problems: [], solvedBy: [] }),
        });
        toast.success('Team registered successfully!');
        setUserRegistered(true);
      } catch (err) {
        console.error('Error registering team:', err);
        toast.error('Error registering team');
      }
    };
  
    const registerUser = async () => {
      try {
        const formattedDate = getFormattedDate();
        const contestDocRef = doc(firestore, 'contests', formattedDate);
        await updateDoc(contestDocRef, {
          registeredUsers: arrayUnion(user!.email),
        });
        toast.success('User registered successfully!');
        setUserRegistered(true);
      } catch (err) {
        console.error('Error registering user:', err);
        toast.error('Error registering user');
      }
    };
  return (
    <div className="w-[30%] h-[30%] text-center mx-auto rounded-2xl mt-6" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
      <h1 className="py-5 text-green-600 font-bold">Contest Timer!</h1>
      <h2 className="text-white">{timer}</h2>
      <div className="flex justify-evenly">
<button className={`mt-4 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-4 mb-10 rounded-3xl
  ${userRegistered && 'cursor-not-allowed'}`}  onClick={registerUser}>
Register
</button>
<button className={`mt-4 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-4 mb-10 rounded-3xl
  ${userRegistered && 'cursor-not-allowed'}`} onClick={registerTeam}>
Register as a Team
</button>
</div>
{userRegistered && (
<button className="contest !mb-4">
<Link href={'/contest/contestPage'}>Get Started!</Link>
<svg fill="currentColor" viewBox="0 0 24 24" className="icon">
<path
           clipRule="evenodd"
           d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
           fillRule="evenodd"
         ></path>
</svg>
</button>
)}
    </div>
  );
};

export default ContestTimer;
