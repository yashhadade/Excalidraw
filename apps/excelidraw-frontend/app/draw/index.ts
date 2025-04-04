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
}
export  async function initDraw(canvas: HTMLCanvasElement,roomId:string,socket:WebSocket) {
    const ctx = canvas.getContext("2d")
    let existingShapes: Shape[] = await getExistingShape(roomId)
    if (!ctx) {
        return
    }
    // socket.onmessage=(event)=>{
    //     const message=JSON.parse(event.data)
    //     console.log(message)
    //     if(message.type=="chat"){
    //         console.log(message)
    //         const parsedShape=JSON.parse(message.message)
    //         console.log(parsedShape)
    //         existingShapes.push(parsedShape.shape)
    //         clearCanvas(existingShapes,canvas,ctx)
    //     }
    // }
    socket.onmessage = (event) => {
        const respsone = JSON.parse(event.data)

        if (respsone.type === "chat") {
            const parseShape = JSON.parse(respsone.message)

            existingShapes.push(parseShape);
            clearCanvas(existingShapes, canvas, ctx)
        }
    }
    clearCanvas(existingShapes,canvas,ctx)
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
        const shape:Shape={
            type: "rect",
            x: startX,
            y: starty,
            height,
            width
        }
        existingShapes.push(shape)
        socket.send(JSON.stringify({
            type:"chat",
            message:JSON.stringify({shape}),
           roomId:Number(roomId)
        }))
    })
    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - starty;
            clearCanvas(existingShapes,canvas,ctx)
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(startX, starty, width, height)
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    console.log("huuu")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })
}

async function getExistingShape(roomId:string){
   const res= await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
   const message=res.data.message;

   const shapes=message.map((x:{message:string})=>{
    const messageData=JSON.parse(x.message)
    return messageData.shape;
   })
   return shapes;
}