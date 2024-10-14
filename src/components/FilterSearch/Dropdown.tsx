import { IoLanguageOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from "react";

type Props={
  terms:boolean
}
const Dropdown:React.FC<Props> = ({terms}) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
   
  const handleLanguage = (word:string) => {
terms && router.push('/terms', '/terms', { locale: word })
!terms && router.push('/policy', '/policy', { locale: word })
    console.log(word)
  };
 
    return (
      <div className="relative inline-block text-left">
        <div>
          <button   type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={toggleDropdown}>
            <IoLanguageOutline fontSize={'35'}/>
          </button>
        </div>
  
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="py-1" role="none">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() =>  handleLanguage("en")}>
           English
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() =>  handleLanguage("bn")}>
  Bengali</button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() =>  handleLanguage("de")}>
  Germany </button>
  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() =>  handleLanguage("pt")}>
  Portugese </button>
    
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Dropdown


  



  
