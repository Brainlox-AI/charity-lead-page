"use client"
import React from 'react'
import Image from 'next/image'

const HeroSection = ({email, setEmail, isDisabled, setIsDisabled, sendEmail} : {email:string, setEmail:React.Dispatch<React.SetStateAction<string>>, isDisabled:boolean, setIsDisabled:React.Dispatch<React.SetStateAction<boolean>>, sendEmail:(e:any)=>{}}) => {
  return (
<div className="container mx-auto flex flex-col w-[88%] items-center lg:justify-between lg:flex-row mt-10">
  <div className="flex flex-col ml-5">
    <div className='mt-24'>
        <span className="text-[60px] text-gray-700 md:text-[60px] font-bold font-openSans ">
            Ready to Revolutionize
        </span>
        <br />
        <span className="text-gray-500 text-[50px] md:text-[50px] font-[500] text-opacity-60 font-roboto mt-8 mb-[50px] ">
            How Your Charity
        </span>
        <br />
        <span className="text-gray-500 text-[50px] font-[500] md:text-[50px] text-opacity-60 font-roboto mt-8 mb-[50px] ">
            Learn and Grows?
        </span>
    </div>
    <div className="text-gray-500 text-xl" style={{lineHeight:"30px", fontWeight:800}}>
        <span>
            Discover How Our Advanced GenAI Tools and Content
        </span>
        <br />
        <span>
        Can Amplify Your Impact
        </span>
    </div>
    <div className="relative pb-[141px] my-5 z-5">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your work email" className="h-[65px] w-2/3 text-black font-roboto text-[15px] font-[500] py-4 px-6 border-gray-500 outline-none border" style={{borderRadius:"60px"}}>
    </input>
      <button disabled={isDisabled} onClick={sendEmail} className="bg-[#6366F1] font-openSans text-[15px] h-[41px] text-white w-[23%] absolute right-[35%] top-3 bottom-3 hover:bg-[#6941C6] transition-colors" style={{borderRadius:"60px"}}>Get Free Demo</button>
    </div>
  </div>
  <div>
  <Image priority src={"/bg2.png"} alt='Bg Image' height={1200} width={1500} className='h-full w-full' style={{height:"75vh"}}/>
  </div>
</div>
  )
}

export default HeroSection