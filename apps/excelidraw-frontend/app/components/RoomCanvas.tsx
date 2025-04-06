"use client"

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "../config";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: {
    roomId: string
}) {
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState<WebSocket>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYTY4MzgzZi1hZDVmLTRjNmUtOTRlZC1jMzhkZGUzYTFlNDciLCJpYXQiOjE3NDM4NzI1NDl9.OImZZJSraW5amSy-XpzCV8iNkull-4tp3gsQLGMKcRA`)
        
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);

            ws.send(JSON.stringify({
                type:"join_room",
                roomId:Number(roomId)
            }))
        }
    }, [])
    if(!socket){
        return <div>
            Connecting to server ......
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket}/>
        
    </div>
}