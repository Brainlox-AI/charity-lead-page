"use client"
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import axios from 'axios'
import ChatSvg from './ChatSvg';
import YouTube from 'react-youtube';
import mixpanel from '@/config/mixpanel';

type MessageType = {
    content:any,
    sentBy:"you" | "bot"
}

const DemoSection = () => {
    const languages = ["English", "Hindi", "Spanish", "French", "Portuguese"]
    const [currentLang,setCurrentLang] = useState<string>("English");
    const [messageInput,setMessageInput] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messageContainer= useRef<HTMLDivElement>(null)
    const api_url = "https://programmingvideoembedding.azurewebsites.net/qna"

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
    <div className='container flex justify-center items-center flex-col mx-auto'>
        <h1 className='text-3xl my-2 text-center font-bold text-[#344054]'>Experience Multilingual AI Interaction</h1>
        <h3 className='text-xl my-2 text-center text-[#344054] font-semibold'>Watch the Video and Engage with Our GenAI Assistant Across 80+ Languages</h3>
        <div className='flex shadow-2xl live-chat w-[95%] my-10 border rounded-2xl p-6'>
            <div className="video-div flex flex-col w-1/2 justify-between">
                <div className="title text-lg my-3 flex items-center">
                    <span>Introduction to Programming and Computer Science - Full Course</span>
                </div>
                <div className="border rounded-2xl w-[95%]">

                <YouTube className='border rounded-2xl'
                videoId='zOjov-2OZ0E'
                opts={{height: '400', width: '100%'}}
                onPlay={()=>{mixpanel.track("Youtube Video Played");}}
                />
                </div>
            </div>
            <div className="chat-div flex flex-col w-1/2">
            <div className="title flex justify-between w-[95%] text-lg my-3">
                <ChatSvg/>
            <select onChange={(e)=>{setCurrentLang(e.target.value);mixpanel.track("Language Changed",{language:e.target.value})}} className="form-select rounded-md outline-none border px-2 border-gray-400 text-lg">
              {languages.map((item,idx)=>{
                return <option key={idx} value={item}>{item}</option>
              })}
            </select>
                </div>
                <div className="chat border rounded-2xl border-black h-[400px] w-[95%]">
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
                </div>
            </div>
        </div>

    </div>
  )
}

export default DemoSection