
import { RoomCanvas } from "@/app/components/RoomCanvas";
import { initDraw } from "@/app/draw";
import { useEffect, useRef } from "react"

export default async function CanvasPage({
    params
}:{
    params:{
        roomId:string
    }
}){
    const{ roomId}= await params;
    console.log(roomId)
   
    return <RoomCanvas roomId={roomId}/>
}