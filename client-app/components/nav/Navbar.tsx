
import React from 'react'
import Search from './Search'
import Logo from './Logo'

const Navbar = () => {
  return (
    <header
      className='
        sticky
        z-50 top-0 
        flex items-center justify-between gap-5
        px-5
        bg-sky-900 
        text-slate-200
        shadow-md
        bg-opacity-90
        backdrop-blur-md'
    >
      <Logo />
      <Search />
      <div></div>
    </header>
  )
}

export default Navbar
