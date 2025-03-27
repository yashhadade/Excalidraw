import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRETE } from "@repo/backendcommon/config";
import {prismaClient} from "@repo/db/client"
const wss = new WebSocketServer({ port: 8080 });

interface JwtPayload {
    userId?: string;
}

interface User {
    ws: WebSocket;
    room: string[];
    userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        console.log("line number 21"+token)
        const decode = jwt.verify(token, JWT_SECRETE);

        if (typeof decode === "string") {
            return null;
        }

        if (!decode || !decode.userId) {
            return null;
        }

        return decode.userId;
    } catch (error) {
        return null;
    }
}

wss.on("connection", function connection(ws: WebSocket, request) {
    const url = request.url;
    if (!url) {
        console.log("ghjghjk")
        return;
        
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    
    const token = queryParams.get('token') || "";

    const userId = checkUser(token);


    if (userId == null) {
        console.log("ertyui")
        ws.close();
        return;
    }

    // Add user to the list
    users.push({
        userId,
        room: [],
        ws,
    });

    ws.on("message",async  function message(data) {
        let parsedData;
        try {
            parsedData = JSON.parse(data as unknown as string);
        } catch (e) {
            console.error("Failed to parse message", e);
            return; // Ignore malformed messages
        }

        // Handle 'join_room' event
        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            if (user && parsedData.roomId) {
                user.room.push(parsedData.roomId);
            }
        }

        // Handle 'leave_room' event
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (user && parsedData.roomId) {
                user.room = user.room.filter(room => room !== parsedData.roomId); // Fix: filter correctly
            }
        }

        // Handle 'chat' event
        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            await prismaClient.chat.create({
                data:{
                    roomId,
                    message,
                    userId
                }
            })
            users.forEach(user => {
                if (user.room.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }));
                }
            });
        }
    });

});
