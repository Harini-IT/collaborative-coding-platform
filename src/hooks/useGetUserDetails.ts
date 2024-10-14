import { auth, firestore } from "@/firebase/firebase";
import { useEffect,useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {  doc, getDoc} from "firebase/firestore";


function useGetUserDetails() {
    const [data, setData] = useState({
      liked: [],
      disliked: [],rating:[],
      starred: [],updatedAt:0,comments:[],badges:[],
      solved: [], premium:false, createdAt:0,email:'',displayName:'',solvedDates:[],gender:'',isAdmin:false,team:''
    });
    const [user] = useAuthState(auth);

    useEffect(() => {
      const getUserData = async () => {
        const userRef = doc(firestore, "users", user!.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const {
            solvedProblems,
            likedProblems,rating,
            dislikedProblems, solvedDates,comments,gender,badges,
            starredProblems, premium,createdAt,email,displayName,updatedAt,isAdmin,team
          } = data;
          setData({
            liked: likedProblems,gender:gender,
            disliked: dislikedProblems,rating:rating,team:team,
            starred: starredProblems, solvedDates:solvedDates,badges:badges,
            solved: solvedProblems, updatedAt:updatedAt,comments:comments,isAdmin:isAdmin,
            premium:premium,createdAt:createdAt,email:email,displayName:displayName
          });
        }
      };
      if (user) getUserData();
      return () =>
        setData({ liked: [], disliked: [], starred: [], solved: [],premium:false,createdAt:0,email:'',
        displayName:'',updatedAt:0,solvedDates:[],comments:[],rating:[],gender:'',isAdmin:false,team:'',badges:[] });
    }, [ user]);
    return { ...data, setData };
  }

  export default useGetUserDetails