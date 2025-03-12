import {WebSocketServer} from "ws"
import jwt from "jsonwebtoken"
// import * as dotenv from 'dotenv';
// dotenv.config();
// const JWT_SECRETE = process.env.SECRET_KEY;
import {JWT_SECRETE} from "@repo/backendcommon/config"
const wss=new WebSocketServer({port:8080});

interface JwtPayload {
    userId?: string;
}
wss.on("connection",function connection(ws,request){

    const url=request.url;
    if(!url){
        return 
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token =queryParams.get('token')||"";

   
    const decode =jwt.verify(token,JWT_SECRETE as string)as JwtPayload
    if(!decode||!decode.userId){
        ws.close();
        return
    }
    ws.on("message",function message(data){
        console.log("pong");
    })
    // ws.send('something');
})