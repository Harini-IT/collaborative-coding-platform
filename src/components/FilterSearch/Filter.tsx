import React from 'react'

type Props = {
    onClick:React.Dispatch<React.SetStateAction<string>>,
    category:string
}

const Filter:React.FC<Props> = ({onClick,category}) => {

  return (
    <div onClick={()=>onClick(category)} onMouseDown={()=>onClick(category)}
    className='cursor-pointer w-auto m-7 px-3 py-1 border rounded-full bg-transparent text-white hover:text-black hover:bg-white
    text-center'>{category}</div>
  )
}

export default Filter