import React from "react";
import {IoClose} from 'react-icons/io5'
import Login from "./Login";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Signup from "./Signup";
import ResetPassword from "./ResetPwd";


type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
const authModal = useRecoilValue(authModalState)
const setAuthModal = useSetRecoilState(authModalState)
	const closeModal = ()=> {
		setAuthModal((prev)=>({...prev,isOpen:false,type:"login"}))
	}
	
	return (
		<>
			<div
				className='co' onClick={closeModal}
			style={{boxShadow:'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'}}></div>
			<div className='w-full sm:w-[450px]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center'>
				<div className='relative w-full h-full mx-auto flex items-center justify-center'>
				<div className='rounded-lg shadow relative w-full  mx-6' style={{ boxShadow: 'inset 2px 2px 10px rgba(0,0,0,1), inset -1px -1px 5px rgba(255, 255, 255, 0.6)' }}>
						<div className='flex justify-end p-2'>
<button type='button'className='bg-transparent  rounded-lg text-sm  ml-auto inline-flex 
 items-center hover:bg-gray-800 hover:text-white text-white p-2' onClick={closeModal}
 onMouseDown={closeModal}>
							<IoClose className="h-5 w-5"/>
                            </button>
						</div>
    {authModal.type === 'login'?<Login/> : 
	authModal.type==='register' ? <Signup/> :<ResetPassword/>}
					</div>
				</div>
				
			</div>
		</>
	);
};
export default AuthModal;
