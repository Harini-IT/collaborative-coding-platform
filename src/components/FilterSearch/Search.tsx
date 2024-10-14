import React from 'react'
import { BsFillSearchHeartFill } from 'react-icons/bs';
type Props = {
   onChange:React.Dispatch<React.SetStateAction<string>>,value:any
}

const Search:React.FC<Props> = ({ onChange, value }) => {
   
  return (
    <div className="mt-7 p-3 flex justify-center items-center w-[300px] h-[50%] shadow-md bg-white border-gray-600 rounded-full">
    <input type="text" onChange={(e) => onChange(e.target.value)} value={value} className="custom-input" 
    placeholder='Search'/>
    <BsFillSearchHeartFill fontSize={'25'}/>
  
</div>


  )
}

export default Search