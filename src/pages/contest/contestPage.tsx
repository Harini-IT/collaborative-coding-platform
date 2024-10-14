import {  firestore } from '@/firebase/firebase';
import useGetContest from '@/hooks/useGetContest';
import useGetUserDetails from '@/hooks/useGetUserDetails';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Blocks } from 'react-loader-spinner';

type Props = {};

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
};

type Contest = {
  formattedDate: string;
  problems: Problem[];
};

type TeamData = {
  problems: string[];
  solvedBy: string[];
};

const ContestPage: React.FC<Props> = () => {
  const contest = useGetContest();
  const [prbs, setPrbs] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const data = useGetUserDetails();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;

  const contests: Contest[] = contest.contest as Contest[];
  const currentContest: Contest | undefined = contests.find((c) => c.formattedDate === currentDate);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (data.team) {
        const teamDocRef = doc(firestore, 'teams', data.team) ;
        const teamDoc = await getDoc(teamDocRef);
        if (teamDoc.exists()) {
          const teamData = teamDoc.data() as TeamData;
          setPrbs(teamData.problems || []);
          setUsers(teamData.solvedBy || []);
        }
      }
      setLoading(false);
    };

    fetchTeamData();
  }, [data.team, currentDate]);

  if (loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Blocks height="250" width="250" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" visible={true} />
      </div>
    );
  }

  if (!currentContest) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Blocks height="250" width="250" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" visible={true} />
      </div>
    );
  }

  return (
    <div>
      <table className="w-[70%] divide-y bg-dark-layer-2 divide-gray-200 mx-auto">
        <caption className="text-center text-2xl font-bold text-white pb-4">Contest Details</caption>
        <thead style={{ background: '#1d3557' }}>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Problem</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Difficulty</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200" style={{ background: '#0d1b2a' }}>
          {currentContest.problems.map((prb: Problem) => (
            <tr key={prb.id}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                <Link className="hover:text-blue-600 cursor-pointer" href={`/contestProblems/${prb.id}`}>
                  {prb.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">{prb.difficulty}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200 cursor-pointer">{prb.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                {prbs.includes(prb.id) && users[prbs.indexOf(prb.id)] ? (
                  <span className='text-sm flex items-center justify-center'>
                    <BsCheckCircleFill color='green' fontSize={'38'} className='px-2' />
                    {users[prbs.indexOf(prb.id)]}
                  </span>
                ) : (
                  <span className="text-red-500">Not solved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContestPage;
