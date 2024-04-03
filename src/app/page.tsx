"use client"
import DemoSection from '@/components/DemoSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import React, {useState} from 'react'
import Swal from 'sweetalert2'


const Home = () => {
  const [email, setEmail] = useState<string>("")
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    function isEmail(mail:string) {
      let matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (mail.length > 320) return false;
      return matcher.test(mail);
    }
   
    const sendEmail = async()=>{
      if(!isEmail(email)){
        Swal.fire({
          title: "<strong>Please provide a proper email</strong>",
          icon: "info",
          showCloseButton: true,
        });
        return;
      }
      setIsDisabled(true)
    let resp = await fetch("/api/sendEmail",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    })
    resp = await resp.json()
    if(resp.status){
      Swal.fire({
        title: "Success",
        text: "Thank you for signing up! We'll reach out shortly to schedule your personal demo meeting.",
        icon: "success"
      });
      setEmail(""); 
    }
    else{
      Swal.fire({
        title: "Error Occured",
        text: "Can't send email",
        icon: "error"
      });
    }
    setIsDisabled(false);
    }

  return (
    <>
    <Navbar/>
    <HeroSection email={email} setEmail={setEmail} isDisabled={isDisabled} setIsDisabled={setIsDisabled} sendEmail={sendEmail} />
    <DemoSection/>
    <Footer email={email} setEmail={setEmail} isDisabled={isDisabled} setIsDisabled={setIsDisabled} sendEmail={sendEmail}/>
    </>
  )
}

export default Home