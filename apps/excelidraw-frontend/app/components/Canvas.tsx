"use client"
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
type Shape= "circle"|"rect"|"pencil"
export function Canvas({ roomId, socket }: {
    roomId: string;
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool,setSelectedTool]=useState<Shape>("circle")

    useEffect(()=>{
        //@ts-ignore
        window.selectedTool=selectedTool
    },[selectedTool])
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current

            initDraw(canvas, roomId, socket)
        }
    }, [canvasRef])

    return <div style={{ height: "100vh", overflow: "hidden" }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

    </div>
}

function TopBar({selectedTool,setSelectedTool}:{
    selectedTool:Shape,
    setSelectedTool:(s:Shape)=>void
}) {
    return <div style={{ position: "fixed", top: 10, left: 10 }}>
        <div className=" flex gap-1">
            <IconButton activated={selectedTool==="pencil"} icon={<Pencil />} onClick={() => {setSelectedTool("pencil") }}/>
            <IconButton  activated={selectedTool==="rect"} icon={<RectangleHorizontalIcon />} onClick={() => {setSelectedTool("rect") }}/>
            <IconButton activated={selectedTool==="circle"} icon={<Circle />} onClick={() => {setSelectedTool("circle") }}/>

        </div>
    </div>
}