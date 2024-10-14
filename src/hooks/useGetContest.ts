import { useEffect, useState } from "react";
import { collection,  getDocs,  query } from "firebase/firestore";
import {  firestore } from "@/firebase/firebase";
const useGetContest = () => {
	const [contest, setContest] = useState([]);
	useEffect(() => {
	  const getContest = async () => {
		const q = query(collection(firestore, "contests"));
		const querySnapshot = await getDocs(q);
		const tmp:any =[];
		querySnapshot.forEach((doc) => {
		  tmp.push({ id: doc.id, ...doc.data() } );
		});
		setContest(tmp);
	  };
  
	  getContest();
  
	}, []);
  
	return {contest};
  };

export default useGetContest