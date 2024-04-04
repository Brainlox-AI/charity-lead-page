import Image from 'next/image'
import React from 'react'

const FeaturesSection = () => {
    const data = [
        {image:"/card1.jpeg",title:"Data-Driven Insights",content:"Unlock actionable insights with Debales' data-driven analytics. Understand audience preferences, track performance metrics, and make informed decisions to optimise your content strategy."},
        {image:"/card2.jpeg",title:"AI-Enhanced Assessments",content:"Elevate learning outcomes with Debales' AI-enhanced assessments. Seamlessly integrate AI technology to personalise assessments, provide immediate feedback, and foster deeper understanding among learners."},
        {image:"/card3.jpeg",title:"Gamified Engagement",content:"Transform learning into an interactive experience with Debales' gamified engagement features. Motivate learners through gamification techniques, promoting active participation and retention of knowledge."},
    ]
  return (
    <div className="container flex flex-col items-center mt-20">
        <div className="titles text-center text-[#344054]">
            <div className="title text-sm border rounded-3xl px-2 py-1 border-gray-400 max-w-fit mx-auto">GenAI Capabilities</div>
            <div className="big-heading text-4xl my-6" style={{fontWeight:600}}>
                <span>Enhance Learning Across 80+ Languages</span> <br/> <span>with interactive AI Technology</span>
            </div>
        </div>
        <div className="flex w-[95%]  flex-wrap mx-auto my-5 justify-center">
            {data && data.map((item,idx)=>{
                return (<div key={idx} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div className="rounded-lg h-64 overflow-hidden">
                    <Image src={item.image} alt='Image' height={150} width={150} className="object-cover object-center h-full w-full"/>
                </div>
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{item.title}</h2>
                <p className="text-base leading-relaxed mt-2">{item.content}</p>
            </div>
            )
        })}
    </div>
  </div>
  )
}

export default FeaturesSection