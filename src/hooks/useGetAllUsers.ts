
import { useEffect, useState } from "react";
import { collection,  getDocs,  query } from "firebase/firestore";
import {  firestore } from "@/firebase/firebase";
import { User } from "@/utils/types/user";
const useGetAllUsers = () => {
	const [users, setusers] = useState<User[]>([]);
  const len = users.length;
	useEffect(() => {
	  const getusers = async () => {
		const q = query(collection(firestore, "users"));
		const querySnapshot = await getDocs(q);
		const tmp: User[] = [];
		querySnapshot.forEach((doc) => {
		  tmp.push({ uid: doc.id, ...doc.data() } as User);
		});
		setusers(tmp);
	  };
  
	  getusers();
  
	}, []);
	return {users,len};
  };

export default useGetAllUsers