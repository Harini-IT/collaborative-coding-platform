import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function useGetcurrProblem(problemId: string) {
    const [currProblem, setCurrproblem] = useState<DBProblem | null>(null);
    const [loading, setloading] = useState<boolean>(true);
    const [problemDifficultyClass, setProblemDifficultyClass] =
      useState<string>("");
    useEffect(() => {
      const getCurrProblem = async () => {
        setloading(true);
        const docRef = doc(firestore, "problems", problemId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const problem = docSnap.data();
          setCurrproblem({ id: problemId, ...problem } as DBProblem);
          setProblemDifficultyClass(
            problem.difficulty === "Easy"
              ? "bg-green"
              : problem.difficulty === "Medium"
              ? "bg-yellow-100"
              : "bg-red"
          );
        }
        setloading(false);
      };
      getCurrProblem();
    }, [problemId]);
    return { currProblem, loading, problemDifficultyClass,setCurrproblem};
  }

export default useGetcurrProblem