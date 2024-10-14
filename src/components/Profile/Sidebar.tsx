import useGetUserDetails from '@/hooks/useGetUserDetails'
import useGetProblems from '@/hooks/useGetProblems';
import Image from "next/image"
import { MdVerified } from "react-icons/md";
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
type Props = {
percent:number,bg:string
}

const Sidebar = () => {
    const { ...data } = useGetUserDetails();
    const {problems,len} = useGetProblems()
    const easyProblemsCount = problems.filter(problem => problem.difficulty === 'Easy').length;
    const mediumProblemsCount = problems.filter(problem => problem.difficulty === 'Medium').length;
    const hardProblemsCount = problems.filter(problem => problem.difficulty === 'Hard').length;
  
    const [signout] = useSignOut(auth)
    const handleClick =()=>{
    signout()
    router.push("/");
    }
  
    const createDate = (create: any) => {
    const dateObject = new Date(create);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  
  const created = createDate(data.createdAt);
  const updated = createDate(data.updatedAt)


  const difficultyCounts:{ [key: string]: number } = {
    Easy: 0,
    Medium: 0,
    Hard: 0
  };

data.solved.forEach(solvedProblemTitle => {
const problem = problems.find(problem => problem.id === solvedProblemTitle);// Debugging
if (problem) {
      difficultyCounts[problem.difficulty]++;
    }
  });

const easyPercent = (difficultyCounts.Easy/easyProblemsCount)*100;
const mediumPercent = (difficultyCounts.Medium/easyProblemsCount)*100;
const harPercent = (difficultyCounts.Hard/easyProblemsCount)*100

const router = useRouter()
const handleDeleteAccount = async () => {
  try {
    if (auth.currentUser) {
      await auth.currentUser.delete();
      toast.success("Your account has been deleted successfully.");
      router.push("/"); 
  } else {
      toast.error('No user is currently signed in.');
  }
  } catch (error) {
      alert("Error")
  }
};


const percent = (data.solved.length/len)*100;
  return (
    <motion.div className=' h-full ml-1' style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',background:' linear-gradient(158deg, rgba(18,18,23,1) 6%, rgba(19,19,38,1) 35%, rgba(38,41,42,1) 100%'}} initial={{ opacity: 0, x: -10 }} 
    animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.5, delay: 0.2 }} >
      <div className='text-center py-6 font-bold'>
      <h2 className='text-white'>User Profile</h2> </div>
        <div className='flex justify-between pl-2'>
             <motion.div className='w-[50%] rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image src={`https://avatar.iran.liara.run/public/${data.gender==='female'? 'girl' : 'boy'}?username=${data.displayName}`} alt='' className='rounded-full' width={200} height={190} priority/>
        </motion.div>
        <motion.div
            className='pt-6 mx-auto'
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }} >
            <div className='flex justify-center'>
                {data.premium && (
                    <motion.div
                        whileHover={{ scale: 1.2 }} 
                        transition={{ duration: 0.2 }}  >
                        <MdVerified fontSize={22} color='green' />
                    </motion.div>
                )}
                <motion.h2
                    className='text-center px-2 font-bold capitalize text-white'
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    transition={{ duration: 0.2 }}    >
                    {data.displayName}
                </motion.h2>
            </div>
            <div>
                <motion.span
                    className='text-center pr-3 mt-4 text-white'
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    transition={{ duration: 0.2 }}  >
                    Joined on<br />{created}
                </motion.span>
            </div>
        </motion.div>
            
        </div>

        <h4 className='text-center text-sm py-4 text-white'>{data.email}</h4>
        <h2 className='text-center font-bold py-2 text-xl text-white'>Problems solved</h2>
        <div className="relative w-32 h-32 mx-auto my-3">
  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 32 32">
    <circle className="stroke-current text-gray-300" cx="16" cy="16" r="14" strokeWidth="4" fill="none" />
    <circle className="stroke-current text-blue-500" cx="16" cy="16" r="14" strokeWidth="4" fill="none" 
      strokeDasharray="88.3"
      strokeDashoffset={88.3 - (percent / 100) * 88.3} />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-dark font-bold text-md text-white">
    {data.solved.length}/{len}
  </div>
</div>

<div className='flex justify-center'>
  <h5 className='pl-6 text-xs py-2 text-white'>Easy {difficultyCounts.Easy}/{easyProblemsCount} </h5><Linear percent={easyPercent} bg={'green'}/> </div>
  <div className='flex justify-center'>
  <h5 className='pl-5 text-xs py-2 text-white'>Medium {difficultyCounts.Medium}/{mediumProblemsCount} </h5><Linear percent={mediumPercent} bg={'yellow'}/> </div>
  <div className='flex justify-center'>
  <h5 className='pl-6 text-xs py-2 text-white'>Hard {difficultyCounts.Hard}/{hardProblemsCount}</h5><Linear percent={harPercent} bg={'red'}/>  </div>


<div className='py-4 text-center text-white'>
  <h5 className='text-sm'>Last Updated {updated}</h5>
</div>

<button className='bg-dark-500 mx-auto py-2 mb-7 w-[30%] flex cursor-pointer rounded-2xl items-center justify-center text-white'
    onClick={handleClick} style={{background:'linear-gradient(180deg, rgb(56, 56, 56) 0%, rgb(36, 36, 36) 66%, rgb(41, 41, 41) 100%)'}}> Logout
    </button>
    <button className="button" onClick={handleDeleteAccount}>
  <span>Delete Account!
</span>
<span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>
</span>
</button>

    </motion.div>

  )
}

export default Sidebar

 
const Linear:React.FC<Props> = ({percent,bg})=>{
  return (
    <div className="relative w-32 h-2 bg-gray-300 rounded-full mx-auto my-3">
  <div
    className='absolute top-0 left-0 h-full  rounded-full' style={{ backgroundColor: bg, width: `${percent}%` }}
  ></div>
  <div className="absolute inset-0 flex items-center justify-center text-dark font-bold text-sm">
  </div>
</div>
  )
}