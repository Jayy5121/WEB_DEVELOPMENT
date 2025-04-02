import React from 'react'

const Navbar = () => {
    return (
        <nav className='top-0 bg-blue-200 '>
            <div className="mycontainer flex justify-around items-center h-10 py-5 px-4">
                <div className="logo text-xl text-blue-950 font-bold ">
                    PASSWORD MANAGER
                </div>
                {/* <ul >
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="">Home</a>
                        <a className='hover:font-bold' href="">Contact</a>
                        <a className='hover:font-bold' href="">About</a>
                    </li>
                </ul> */}
                <button className='text-white bg-blue-950 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'>
                    <img className='invert  w-7 p-1' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>

                </button>
            </div>
        </nav>
    )
}

export default Navbar
