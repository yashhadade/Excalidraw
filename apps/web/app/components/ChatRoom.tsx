import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function  getChat(roomId:String){
    const reponse = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    return reponse.data.message
}

export async function ChatRoom({id}:{id:string}){
    const message=await getChat(id);

    return <ChatRoomClient id={id} message={message}/>
}