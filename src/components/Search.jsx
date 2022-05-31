import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Search() {
    let [ keyword, setKeyword ] = useState('');
    const navigate = useNavigate();


    const submitHandler = (e)=>{
        e.preventDefault();
        navigate('/searched/' + keyword);
        
    }
  return (
    <form class="relative text-white flex justify-center" onSubmit={submitHandler}>
        <input type="search" name="search" placeholder="Search" class="bg-gray-800 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full" onChange={(e)=>{setKeyword(e.target.value)}}/>
    </form>
  )
}

export default Search