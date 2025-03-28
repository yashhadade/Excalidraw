import axios from "axios"
import { BACKEND_URL } from "../../config"
import { ChatRoom } from "../../components/ChatRoom"

async  function getRoom(slug:string){
    // console.log(slug)
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
// console.log(response.data.room.id)
    return response.data.room.id

}
export default async function ChatRom ({
    params
}:{
    params:{
        slug:string
    }
}){
    // console.log(params.slug)
    // params =await params
    const{ slug}= await params;
    // console.log(slug)
    const roomId=await getRoom(slug)

    return <ChatRoom id={roomId} />
}