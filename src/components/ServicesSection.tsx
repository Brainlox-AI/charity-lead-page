import React from 'react'
import Image from 'next/image'

const ServicesSection = () => {
    const data = [
        {image:"/s1.png",title:"Interactive AI Assistants",content:"Create AI-powered assistants from your long-form content, providing users with an interactive way to engage with the material."},
        {image:"/s2.png",title:"Live Streaming Simulation",content:"Boost audience engagement by simulating live streaming for pre-recorded content, making it appear as if events are happening in real-time."},
        {image:"/s3.png",title:"Multilingual Engagement",content:"Breakdown language barriers by making your content accessible to a global audience in their native languages, expanding your reach and fostering deeper connections."},
        {image:"/s4.png",title:"Advanced Analytics Dashboard",content:"Equip your strategy with actionable insights through an intuitive dashboard that analyses sentiment and tracks KPIs."},
        {image:"/s5.png",title:"Accessibility and Inclusivity",content:"Ensure that your content is accessible to diverse audiences, enhancing the user experience and fostering inclusivity across different abilities."},
    ]

    function getDiv(image:string , title:string, content:string, css:string = ""){
        return(
            <div className={`p-4 sm:mb-0 mb-6 ${css} border border-gray-400 rounded-2xl`}>
                <div className="rounded-lg h-96 overflow-hidden">
                    <Image src={image} alt='Image' height={1500} width={1200} className="object-cover object-center h-full w-full"/>
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{title}</h2>
                <p className="text-base leading-relaxed mt-2">{content}</p>
            </div>
        )
    }
  return (
    <>
<div className="container flex flex-col items-center mx-auto mt-20">
        <div className="titles text-center text-[#344054]">
            <div className="title text-sm border rounded-3xl px-2 py-1 border-gray-400 max-w-fit mx-auto">Tools built to help</div>
            <div className="big-heading text-4xl my-6" style={{fontWeight:600}}>
                <span>Discover Debales: Revolutionizing</span> <br/> <span>Learning Experiences</span>
            </div>
            <div className="big-heading text-lg my-6" style={{fontWeight:600}}>
                Unlock the power of Debales for dynamic learning experiences. Explore our suite of tool to elevate education
            </div>
        </div>
        <div className="w-[95%]  mx-auto my-5 flex flex-col justify-between items-center">
            <div className='flex w-full justify-center'>
                {getDiv(data[0].image,data[0].title, data[0].content,"w-[40%] mr-3 ")}
                {getDiv(data[1].image,data[1].title, data[1].content,"w-[60%] ml-3 ")}
            </div>
            
            {getDiv(data[2].image,data[2].title, data[2].content,"w-[100%] mt-8")}

            <div className='flex w-full justify-center mt-8'>
                {getDiv(data[3].image,data[3].title, data[3].content,'w-[60%] mr-3')}
                {getDiv(data[4].image,data[4].title, data[4].content,"w-[40%] ml-3")}
            </div>
        </div>
  </div>
    </>
  )
}

export default ServicesSection