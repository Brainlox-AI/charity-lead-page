import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const handle = ()=>{
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }
  return (
    <header className="text-gray-600 body-font shadow-2xl">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
    <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span className="ml-3 font-bold text-xl">DEBALES</span>
    </Link>
    <button onClick={handle} className="inline-flex mx-2 items-center bg-[#6941C6] border-0 py-2 px-3 focus:outline-none text-white text-base mt-4 md:mt-0" style={{borderRadius:"30px"}} >Get free demo</button>
  </div>
</header>
  )
}

export default Navbar