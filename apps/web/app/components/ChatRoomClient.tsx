"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient ({message,id}:{message:{message:string}[];
id:string
}){
const [chat,setChat]=useState(message)
const [currentMessage,setCurrentMessage]=useState("")
const {socket,loading}=useSocket();
useEffect(()=>{
    if(socket &&!loading){
        socket.send(JSON.stringify({
            type:"join_room",
            roomId:id,
        }))
        socket .onmessage=(event)=>{
            const parsedData=JSON.parse(event.data);
            if(parsedData.type==="chat"){
                setChat(c=>[...c,{message:parsedData.message}])
            }
        }
    }
    return ()=>{
        socket?.close()
    }
},[socket,loading,id])

return <div>
    {chat.map((m, index) => (
  <div key={index}>{m.message}</div>
))}

    <input type="text" value={currentMessage} onChange={e=>{setCurrentMessage(e.target.value)}}></input>
    <button onClick={()=>{
        socket?.send(JSON.stringify({
            type:"chat",
            roomId:id,
            message:currentMessage
        }))
        setCurrentMessage("")
    }}>Send Message</button>
</div>
}