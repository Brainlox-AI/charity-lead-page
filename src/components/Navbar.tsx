import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span className="ml-3 font-bold text-xl">DEBALES</span>
    </Link>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
      <a className="mr-7 hover:text-gray-900 cursor-pointer">Features</a>
      <a className="mr-7 hover:text-gray-900 cursor-pointer">Products</a>
      <a className="mr-7 hover:text-gray-900 cursor-pointer">Resources</a>
      <a className="mr-7 hover:text-gray-900 cursor-pointer">Pricing</a>
    </nav>
    <button className="inline-flex mx-2 items-center border-0 p-2 focus:outline-none  rounded text-base mt-4 md:mt-0">Log in</button>
    <button className="inline-flex mx-2 items-center bg-[#6941C6] border-0 py-2 px-3 focus:outline-none text-white text-base mt-4 md:mt-0" style={{borderRadius:"30px"}} >Get free demo</button>
  </div>
</header>
  )
}

export default Navbar