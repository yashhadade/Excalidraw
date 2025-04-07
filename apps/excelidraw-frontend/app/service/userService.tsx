import { server } from "../server"


const userSignin=(data:any)=>{
    return server.post('/signIn',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}
const userSignUp=(data:any)=>{
    return server.post('/signUp',data)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        return err.response.data;
    })
}

const userService={
    userSignin,
    userSignUp
}
export default userService;