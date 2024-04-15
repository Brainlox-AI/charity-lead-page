"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import axios from 'axios'
import YouTube from 'react-youtube';
import toast, {Toaster} from 'react-hot-toast';
import mixpanel from '@/config/mixpanel';
import { hindi_summary, french_summary, spanish_summary, portuguese_summary, english_summary } from './SummaryVideo';

type MessageType = {
    content:any,
    sentBy:"you" | "bot"
}

const DemoSection = () => {
    const languages = ["English", "Hindi", "Spanish", "French", "Portuguese"]
    const [currentLang,setCurrentLang] = useState<string>("English");
    const [messageInput,setMessageInput] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    const [showChats, setShowChats] = useState<boolean>(true)
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messageContainer= useRef<HTMLDivElement>(null)
    let [videoSummary,setVideoSummary] = useState<string>("");
    const [showCopy,setShowCopy] = useState<boolean>(true);
    const api_url = "https://programmingvideoembedding.azurewebsites.net/qna"

    useEffect(()=>{
      switch(currentLang){
        case "English":
          setVideoSummary(english_summary);
          break;

          case "Hindi":
          setVideoSummary(hindi_summary);
          break;

          case "Spanish":
          setVideoSummary(spanish_summary);
          break;

          case "French":
          setVideoSummary(french_summary);
          break;

          case "Portuguese":
          setVideoSummary(portuguese_summary);
          break;
      }
    },[currentLang])

    const handleSubmit = async()=>{
        const question = messageInput.trim();
        setMessageInput("");
        const chat_history = messages.filter((item:MessageType)=>{
            if(item.sentBy == "you") return item
        }).map((item:MessageType)=>item.content);
        let data = await axios.post(api_url,{
          questions:question,
          chat_history:chat_history,
          language:currentLang
        })
        let ans = data.data.response as string;
        sendMessageByBot(ans);
        mixpanel.track("Message Sent");
    }

    const handleKeyPress = async (event:any) => {
        if (event.key === 'Enter' && messageInput) {
          await sendMessage(messageInput);
          setMessageInput("");
        }
      };
    
      const sendMessageByBot = async(message:string)=>{
        setMessages((prevMessages) => [...prevMessages.slice(0,prevMessages.length-1), { content: message, sentBy: 'bot' }]);
      }

    const copySummary = async()=>{
        setShowCopy(false);
        await navigator.clipboard.writeText(videoSummary);
        toast('Summary Copied!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        mixpanel.track(`Summary Copied of ${currentLang} language`)
        setTimeout(()=>{
          setShowCopy(true)
        },200);
    }

    const sendMessage = async (message:string) => {
        setLoading(true);
        setMessages((prevMessages) => [...prevMessages, { content: message, sentBy: 'you' }]);
    
        setMessages((prevMessages) => [...prevMessages, { content: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>, sentBy: 'bot' }]);
    
        await handleSubmit();

        setLoading(false);
      };

    const renderMessages = () => {
        try{
            return messages.map((message,idx) => (
              <div key={idx} className={`message flex my-1 px-4 py-2 ${message.sentBy === "you" ? "justify-end  " : "justify-start max-w-[80%]"}`}>
                {message.sentBy === 'you' && <div className='bg-[#4E5BF6] text-white p-2 rounded-md border-none items-end max-w-[80%]'>{message.content}</div>}
                {message.sentBy !== 'you' && (
                  <Image width={32} height={32} src="/bot.png" alt="Your avatar" className="mr-2 w-8 h-8 rounded-full" />
                )}
                {message.sentBy !== 'you' && <div className="bg-[#F1F1F0F0] p-2 rounded-md border-none" style={{"lineHeight":1.75}}>{message.content}</div>}
              </div>
          ));
        }
        catch(err){
          console.log(err);
        }
        finally{
          setTimeout(()=>messageContainer.current?.scrollTo({top:messageContainer.current.scrollHeight}),100);
        }
      };
  return (
    <>
        <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className='container flex justify-center items-center flex-col mx-auto'>
        <h1 className='text-3xl my-2 text-center font-bold text-[#344054]'>Experience Multilingual AI Interaction</h1>
        <h3 className='text-xl my-2 text-center text-[#344054] font-semibold'>Watch the Video and Engage with Our GenAI Assistant Across 80+ Languages</h3>

        <div className='flex shadow-2xl live-chat w-[88%] my-10 border rounded-2xl p-6'>
            <div className="video-div flex flex-col w-1/2 justify-between">
                <div className="title text-lg my-3 flex items-center">
                    <span>Introduction to Programming and Computer Science - Full Course</span>
                </div>
                <div className="border rounded-2xl w-[95%]">

                <YouTube className='border rounded-2xl'
                videoId='zOjov-2OZ0E'
                opts={{height: '420', width: '100%'}}
                onPlay={()=>{mixpanel.track("Youtube Video Played");}}
                />
                </div>
            </div>
            <div className="chat-div flex flex-col w-1/2">
            <div className="title flex justify-between w-[95%] text-lg my-3">
                <div className='flex px-2 py-1 rounded-xl cursor-pointer bg-[#F6F6F7]'>
                  {showChats && <>
                    <Image onClick={()=>setShowChats(!showChats)} src="/dark_chats.png" height={50} width={50} alt='Chats'/>
                    <Image onClick={()=>setShowChats(!showChats)} src="/light_summary.png" height={50} width={50} alt='Chats'/>
                  </>
                  }
                  {!showChats && <>
                    <Image onClick={()=>setShowChats(!showChats)} src="/light_chats.png" height={50} width={50} alt='Chats'/>
                    <Image onClick={()=>setShowChats(!showChats)} src="/dark_summary.png" height={50} width={50} alt='Chats'/>
                  </>
                  }
                </div>
            <select onChange={(e)=>{setCurrentLang(e.target.value);mixpanel.track("Language Changed",{language:e.target.value})}} className="form-select rounded-md outline-none border px-2 border-gray-400 text-lg">
              {languages.map((item,idx)=>{
                return <option key={idx} value={item}>{item}</option>
              })}
            </select>
                </div>
                <div className="chat border rounded-2xl border-black h-[420px] overflow-y-auto w-[95%]">
                  {!showChats && 
                  <>
                    <div className="text-center mt-2 mb-1 text-xl font-bold underline">Summary Of Video</div>
                    <div className='p-2 relative bg-gray-100 rounded-md w-[95%] mx-auto'>
                      {videoSummary}

                      <div title={`Copy Summary in ${currentLang}`}>
                        {showCopy && <svg onClick={copySummary} className="cursor-pointer w-6 h-6 text-black absolute right-1 bottom-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
                          <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
                        </svg>}

                       {!showCopy && <svg className="cursor-pointer w-6 h-6 text-black absolute right-1 bottom-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                        </svg>}
                      </div>

                    </div>
                  </>
                  }
                {showChats &&
                <>
                <div ref={messageContainer} className='chat flex flex-col p-0 h-[85%] overflow-y-auto'>
            {renderMessages()}
          </div>
                    <div className="input flex items-center p-2 border-t border-gray-300">
                    <input
                      value={messageInput}
                      onChange={(e)=>setMessageInput(e.target.value)}
                      type="text"
                      placeholder="Type your message..."
                      className="flex-grow px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDownCapture={handleKeyPress}
                      disabled={loading}
                    />
                  <button
                    className="ml-2 px-4 py-2 rounded-lg"
                    onClick={() => sendMessage(messageInput)}
                  >
          <svg viewBox="0 0 20 20" style={{"transform":"rotate(90deg)", width:"1.2rem", height:"1.2rem", fill:'currentcolor'}} xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
        </button>
                    </div>
                    </> 
}
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default DemoSection