import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      {/* Minimalist navbar */}
      <ul className='flex justify-evenly items-center text-base md:text-lg bg-white border-b border-gray-200 rounded-none shadow-none mt-0 px-2 py-3 mx-auto max-w-xl sticky top-0 z-50'>
        <Link to="/" className='hover:text-blue-600 px-3 py-1 rounded transition-colors'>Home</Link>
        <Link to="/about" className='hover:text-blue-600 px-3 py-1 rounded transition-colors'>About</Link>
        <Link to="/timer" className='hover:text-blue-600 px-3 py-1 rounded transition-colors'>Timer</Link>
        <Link to="/contactUS" className='hover:text-blue-600 px-3 py-1 rounded transition-colors'>Contact Us</Link>
      </ul>
    </div>
  )
}

export default Navbar