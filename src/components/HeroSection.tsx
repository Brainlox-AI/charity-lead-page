"use client"
import React from 'react'
import HeroSvg from './HeroSvg'

const HeroSection = ({email, setEmail, isDisabled, setIsDisabled, sendEmail} : {email:string, setEmail:React.Dispatch<React.SetStateAction<string>>, isDisabled:boolean, setIsDisabled:React.Dispatch<React.SetStateAction<boolean>>, sendEmail:(e:any)=>{}}) => {
  return (
<div className="container flex flex-col lg:justify-between lg:flex-row relative z-10 ">
  <div className="flex flex-col pt-[141px] absolute left-[5%]">
    <div className='text-[#344054]'>
        <span className="text-[40px] md:text-[61px] font-bold font-openSans ">
            Ready to Revolutionize
        </span>
        <br />
        <span className="text-[35px] md:text-[51px] font-[500] text-opacity-60 font-roboto mt-8 mb-[50px] ">
            How Your Charity
        </span>
        <br />
        <span className="text-[35px] font-[500] md:text-[51px] text-opacity-60 font-roboto mt-8 mb-[50px] ">
            Learn and Grows?
        </span>
    </div>
    <div className="text-[#667085] text-xl" style={{lineHeight:"30px", fontWeight:800}}>
        <span>
            Discover How Our Advanced GenAI Tools and Content
        </span>
        <br />
        <span>
        Can Amplify Your Impact
        </span>
    </div>
    <div className="relative pb-[141px] my-5">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your work email" className="h-[65px] w-2/3 text-black font-roboto text-[15px] font-[500] py-4 px-6 border-gray-500 outline-none border" style={{borderRadius:"60px"}}>
    </input>
      <button disabled={isDisabled} onClick={sendEmail} className="bg-[#6941C6] font-openSans text-[15px] h-[41px] text-white w-1/5 absolute right-[35%] top-3 bottom-3" style={{borderRadius:"60px"}}>Get Free Demo</button>
    </div>
  </div>
  <div className="flex">
    <HeroSvg/>
  </div>
</div>
  )
}

export default HeroSection