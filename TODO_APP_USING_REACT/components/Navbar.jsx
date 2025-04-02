import React from 'react'

const Navbar = () => {
  return (
   
      <nav className='flex justify-between bg-violet-400 py-4'>
        <div className="logo">
            <span className='font-bold text-2xl hover:text-white mx-9'>TODO-APP</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold hover:text-white transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold hover:text-white transition-all duration-75'>About</li>
        </ul>
      </nav>
    
  )
}

export default Navbar
