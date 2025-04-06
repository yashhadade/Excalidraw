import axios from "axios";
import { HTTP_BACKEND } from "../config";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d")
    let existingShapes: Shape[] = await getExistingShape(roomId)
    if (!ctx) {
        return
    }

    socket.onmessage = (event) => {
        const respsone = JSON.parse(event.data)

        if (respsone.type === "chat") {
            const parseShape = JSON.parse(respsone.message)

            existingShapes.push(parseShape.shape);
            clearCanvas(existingShapes, canvas, ctx)
        }
    }
    clearCanvas(existingShapes, canvas, ctx)
    let clicked = false;
    let startX = 0;
    let starty = 0;
    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = (e.clientX)
        starty = (e.clientX)
    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const width = e.clientX - startX;
        const height = e.clientY - starty;
        //@ts-ignore
        const selectedTool = window.selectedTool;
        let shape: Shape | null=null
        if (selectedTool == "rect") {
            shape = {
                type: "rect",
                x: startX,
                y: starty,
                height,
                width
            }
           
        } else if (selectedTool == "circle") {
            const radius = Math.max(width, height)/2
            shape = {
                type: "circle",
                centerX: startX + radius,
                centerY: starty + radius,
                radius:radius
            }
           
        }
        if(!shape){
            return
        }
        existingShapes.push(shape)
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: Number(roomId)
        }))
    })
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - starty;
            clearCanvas(existingShapes, canvas, ctx)
            ctx.strokeStyle = "rgba(255,255,255)"
            //@ts-ignore
            const selectedTool = window.selectedTool
            if (selectedTool === "rect") {
                ctx.strokeRect(startX, starty, width, height)
            } else if (selectedTool === "circle") {
                const redius = Math.max(width, height) / 2;
                const centerX = startX +redius;
                const centerY = starty +redius;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, redius, 0, Math.PI * 2);
                ctx.stroke()
                ctx.closePath()
            }
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
        else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            ctx.stroke()
            ctx.closePath()
        }
    })
}

async function getExistingShape(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
    const message = res.data.message;

    const shapes = message.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })
    return shapes;
}