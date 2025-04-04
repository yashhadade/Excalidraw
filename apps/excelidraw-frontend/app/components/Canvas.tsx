"use client"
import { useEffect, useRef } from "react";
import { initDraw } from "../draw";

export function Canvas({roomId,socket}:{
    roomId:string;
    socket:WebSocket
}){
      const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
            if (canvasRef.current) {
                const canvas = canvasRef.current
    
                initDraw(canvas, roomId,socket)
            }
        }, [canvasRef])

    return <div>
    <canvas ref={canvasRef} width={2000} height={1080}></canvas>
    <div className=" absolute righbutton bottom-0">
        <button className=" bg-white text-black">Rect</button>
        <button className="  bg-white text-black">Circle</button>
    </div>
</div>
}