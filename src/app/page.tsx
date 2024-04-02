import DemoSection from '@/components/DemoSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <DemoSection/>
    <Footer/>
    </>
  )
}

export default Home