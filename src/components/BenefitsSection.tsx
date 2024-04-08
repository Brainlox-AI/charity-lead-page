import Image from 'next/image'
import React from 'react'

const BenefitsSection = () => {
    const data = [
        {image:"/b1.png",title:"Global Market Expansion & New Revenue Streams",content:"The multilingual capability, paired with insights from the analytics dashboard enables businesses to identify and target new markets effectively, potentially increasing revenue streams. Specially providing premium service for recorded video."},
        {image:"/b2.png",title:"Increased Content ROI",content:"By leveraging analytics to understand content performance and audience preferences, businesses can repurpose and optimize existing content, extending its lifespan and maximizing return on investment."},
        {image:"/b3.png",title:"Cost and operational efficiency",content:"Automating content interaction and gaining strategic insights from the dashboard reduces the need for extensive human support and content production costs, increasing operational efficiency."},
        {image:"/b4.png",title:"Enhanced User Engagement & revenue conversion",content:"The combination of interactive AI assistants, live streaming simulations, and data-driven content adjustments leads to higher engagement rates, driving conversions and boosting revenue."},
        {image:"/b5.png",title:"Competitive Advantage",content:"Offering innovative, interactive content experiences, along with strategic insights from sentiment analysis and KPI tracking, sets businesses apart, attracting more users and partners."},
    ]
  return (
    <div className="container flex flex-col items-center mt-20 mx-auto">
        <div className="titles text-center text-[#344054]">
            <div className="title text-sm border rounded-3xl px-2 py-1 border-gray-400 max-w-fit mx-auto">Build for Learners</div>
            <div className="big-heading text-4xl my-6" style={{fontWeight:600}}>
                Discover the Benefits: Elevate Your Learning
            </div>
        </div>
        <div className="flex w-[88%] mx-auto  flex-wrap sm:-m-4 my-5 justify-center">
            {data && data.map((item,idx)=>{
                return (<div key={idx} className="p-4 md:w-[32%] sm:mb-0 mb-6 border border-gray-500 rounded-2xl mx-2 my-3">
                <div className="rounded-lg h-96 overflow-hidden">
                    <Image src={item.image} alt='Image' height={300} width={300} className="object-cover object-center h-full w-full"/>
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

export default BenefitsSection