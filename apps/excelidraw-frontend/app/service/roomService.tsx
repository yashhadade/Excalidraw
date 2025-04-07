import { server } from "../server"

const getRooms=()=>{
    return server.get('/room')
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response.data;
    })
}
const getAllRooms=()=>{
    return server.get('/allroom')
    .then(res=>{
        return res.data
    })
    .catch(err=>{
        return err.response.data;
    })
}
const createRoom=(name:string)=>{
    return server.post('/room',{
        name
    })
    .then(res=>{
        return res.data
    })
}
const roomService={
    getRooms,
    getAllRooms,
    createRoom
}

export default roomService
