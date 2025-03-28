"use client"
import { useEffect, useState } from "react";
import { WS_URL } from "../config";



export function useSocket(){
    const [loading,setLoading]=useState(false);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws=new WebSocket(WS_URL+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk2MGM3OS04ZTU4LTQzZjktOGZhZi01MDkwMWQwZjkwODYiLCJpYXQiOjE3NDMwMDc5NTl9.XOyVnMeoPtNGMeJ1nyIh3N7v4G7mgcn8_RkpQVujJ4c");
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);

        }
    },[])

    return{
        socket,
        loading
    }
}
