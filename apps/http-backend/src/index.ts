import express from "express"
import {  Request,Response } from "express";
import  jwt  from "jsonwebtoken"
import * as dotenv from 'dotenv';
import { middleware } from "./middleWare/middleware";
import {JWT_SECRETE} from "@repo/backendcommon/config"
import {CreateUserSchema,SignInSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"

// dotenv.config();
// const JWT_SECRETE = process.env.SECRET_KEY;
const app=express()
app.use(express.json())
app.post("/signUp",async (req,res)=>{
    const parsedData=CreateUserSchema.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message:"Incorrect Input"
        })
    }
    try {
       const user= await prismaClient.user.create({
            data: {
              username: parsedData.data?.username ?? 'default_username', 
              password: parsedData.data?.password ?? 'default_password', 
              email: parsedData.data?.email ?? 'default_email@example.com', 
            },
          });

          res.json({
            userId:user.id
        })
    } catch (error) {
        res.status(411).json({
            message:"User alredy exists with this username"
        })
    }
    
      
   
})
app.post("/signIn", async (req:Request,res:Response): Promise<any>=>{
    const data=SignInSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"Incorrect Input"
        })
    }
    try {
        
    } catch (error) {
        
    }
const user= await prismaClient.user.findFirst({
    where:{
        email:data.data?.username,
        password: data.data?.password
    }
})
if(!user){
    return res.status(404).json({
        message:"user Not found"
    })
}
  const token= jwt.sign({
        userId:user?.id
    }, JWT_SECRETE as string)

    res.json({
        token
    })
})

app.post("/room",middleware,async (req:Request,res:Response): Promise<any>=>{
const data = CreateRoomSchema.safeParse(req.body);
if(!data.success){
    return res.json({
        message:"Incurrect Input"
    })
}
const userId=req.userId;
await prismaClient.room.create({
    data:{
        slug:data.data?.name,
        adminId:userId,
        
    }
})
    res.json({
        roomId:123
    })
})
app.listen(5000,()=>{
    console.log("server is running on 5000")
})