import axios from "axios";
import { HTTP_BACKEND } from "../config";

export async function getExistingShape(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
    const message = res.data.message;

    const shapes = message.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })
    return shapes;
}