import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import {FiLogOut} from 'react-icons/fi'

const Logout:React.FC=()=>{
const [signout,loading,error] = useSignOut(auth)
const handleClick =()=>{
signout()
}
return(
    <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange'
    onClick={handleClick}>
        <FiLogOut/>
    </button>
)
}
export default Logout