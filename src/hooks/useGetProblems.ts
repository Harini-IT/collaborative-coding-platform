
import { useEffect, useState } from "react";
import { collection,  getDocs, orderBy, query } from "firebase/firestore";
import {  firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
const useGetProblems = () => {
	const [problems, setProblems] = useState<DBProblem[]>([]);
  const len = problems.length;
	useEffect(() => {
	  const getProblems = async () => {
		const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
		const querySnapshot = await getDocs(q);
		const tmp: DBProblem[] = [];
		querySnapshot.forEach((doc) => {
		  tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
		});
		setProblems(tmp);
	  };
  
	  getProblems();
  
	}, []);
  
	return {problems,len};
  };

export default useGetProblems