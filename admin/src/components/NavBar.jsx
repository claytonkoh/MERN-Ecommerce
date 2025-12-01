import React from 'react'
import { assets } from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo"/>
        <button onClick={()=>setToken('')} className='bg-black text-white px-4 py-2 sm:py-2 
        rounded-full text-xs sm:text-sm transition duration-300 ease-in-out hover:bg-gray-700' >Logout</button>
    </div>
  )
}

export default NavBar