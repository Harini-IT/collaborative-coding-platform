import { firestore } from '@/firebase/firebase';
import useGetAllUsers from '@/hooks/useGetAllUsers'
import { User } from '@/utils/types/user'
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react'
import { BsFillSearchHeartFill } from 'react-icons/bs'
import { RiTeamFill } from 'react-icons/ri';
import Footer from '@/components/Footer';

type Props = {}

const Teams = (props: Props) => {
  const users = useGetAllUsers()
  const [searchQuery, setSearchQuery] = useState('');
  const [teamName, setTeamName] = useState('')
  const filteredUsers = users.users.filter(user =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [teamList, setTeamList] = useState<User[]>([])

  const addUserToTeam = (user: User) => {
    setTeamList((prevTeamList) => {
      if (!prevTeamList.find((existingUser) => existingUser.uid === user.uid)) {
        return [...prevTeamList, user];
      }
      return prevTeamList;
    });
  }

  const createTeam = async () => {
    const teamData = { teamList, teamName, contests: 0, createdAt: Date.now() }
    const sanitizedTeamList = teamData.teamList.map(user => ({
      displayName: user.displayName,
      solvedProblems: user.solvedProblems,
      uid: user.uid
    }));
    const sanitizedTeamData = {
      ...teamData,
      teamList: sanitizedTeamList
    };
    await setDoc(doc(firestore, "teams", teamData.teamName), sanitizedTeamData);
    const teamDocRef = doc(firestore, "teams", teamName);
    for (const user of teamData.teamList) {
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, { team: teamDocRef });
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="bg-gray-900 py-4 text-center">
        <h1 className="text-3xl font-semibold">Team Management</h1>
      </div>
      <div className="mt-2 p-2 flex justify-center  text-center items-center w-[300px] h-[50%] shadow-md border border-white rounded-full mx-auto">
<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
placeholder="Search by displayName..."
className="custom-input bg-gray-900 p-2 border rounded-l-full"
/>
<BsFillSearchHeartFill fontSize={'20'} className="mx-2" />
</div>
      <div className='flex items-center justify-between p-5'>
        <div className="w-1/2 p-4 border border-gray-300 rounded-xl mx-6">
          <h2 className="text-lg font-semibold mb-4 underline underline-offset-3">Users</h2>
          <ul>
            {filteredUsers.length ? filteredUsers.map((user) => (
              <div key={user.uid} className="flex items-center justify-between mb-2">
                <li className="text-gray-200 p-4">{user.displayName}</li>
                <div className="flex items-center">
                  <p className="mx-2 py-1 px-3 text-black rounded-full bg-green-400">{user.solvedProblems.length}</p>
                  <button onClick={() => addUserToTeam(user)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
                </div>
              </div>
            )) : (
              <li className="text-gray-200">No matching users found.</li>
            )}
          </ul>
        </div>
        <div className="w-1/2 md:w-1/2 p-4 border border-gray-300 rounded-xl">
          <h2 className="text-lg font-semibold mb-4 underline underline-offset-3">Team Members</h2>
          {teamList.length ? teamList.map((member) => (
            <h1 key={member.uid} className="text-gray-200 mb-2">{member.displayName}</h1>
          )) : (
            <p className="text-gray-200">No team members added yet.</p>
          )}
          <input
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
            placeholder="Team Name"
            className="border border-gray-300 rounded mt-2 p-2 block w-full bg-gray-800 text-white"
          />
          <button onClick={createTeam} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Team</button>
        </div>
      </div>
      <div className="px-10 mx-6 border rounded my-4 bg-gray-900 text-white">
        <h2 className="text-3xl text-center font-semibold my-4">Why Teams?</h2>
        <p className="text-gray-200 first-letter:font-playwrite-nl first-letter:text-xl">
          Forming teams and participating in coding contests play a pivotal role in the growth and development of individuals within the tech community. Collaborating with like-minded individuals in a team setting offers several key advantages:
          <br /><br />
          <div className="flex items-start mb-4">
            <div className="mr-2 text-blue-500">
              <RiTeamFill fontSize={'20'}/>
            </div>
            <div>
              <p className="mb-2">
                Firstly, teams bring together diverse skill sets and perspectives, allowing members to leverage each other's strengths. In coding contests, this diversity often translates into more innovative solutions and efficient problem-solving approaches. Teammates can specialize in different areas, such as algorithms, data structures, or UI/UX design, complementing each other to tackle complex challenges comprehensively.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <div className="mr-2 text-blue-500">
              <RiTeamFill fontSize={'20'}/>
            </div>
            <div>
              <p className="mb-2">
                Secondly, participating in coding contests as a team fosters a culture of learning and continuous improvement. Teammates can learn from each other's techniques, strategies, and coding styles. This exchange not only enhances individual skills but also promotes a deeper understanding of advanced concepts and algorithms through peer collaboration and knowledge sharing.
              </p>
            </div>
          </div>
          <div className="flex items-start mb-4">
            <div className="mr-2 text-blue-500">
              <RiTeamFill fontSize={'20'}/>
            </div>
            <div>
              <p className="mb-2">
                Moreover, teamwork in coding contests cultivates essential soft skills such as communication, teamwork, and time management. Coordinating tasks, dividing workloads, and meeting deadlines under pressure are invaluable experiences that prepare individuals for real-world software development scenarios.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-2 text-blue-500">
              <RiTeamFill fontSize={'20'}/>
            </div>
            <div>
              <p>
                Lastly, forming teams and engaging in coding contests is an excellent opportunity to build a professional network. Competitions often attract participants from diverse backgrounds and industries, providing a platform to connect with potential mentors, employers, and collaborators. Networking within the coding community can lead to career opportunities, mentorship, and even partnerships on future projects.
              </p>
            </div>
          </div>
        </p>
      </div>

      <Footer />  
    </div>
  )
}

export default Teams;
