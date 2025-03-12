import express from "express"
import  jwt  from "jsonwebtoken"
import * as dotenv from 'dotenv';
import { middleware } from "./middleWare/middleware";
import {JWT_SECRETE} from "@repo/backendcommon/config"
import {CreateUserSchema} from "@repo/common/types"
// dotenv.config();
// const JWT_SECRETE = process.env.SECRET_KEY;
const app=express()

app.post("/signUp",(req,res)=>{
    const data=CreateUserSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message:"Incorrect Input"
        })
    }

    res.json({
        userId:"123"
    })
})
app.post("/signIn",(req,res)=>{
    const userId=1;
  const token= jwt.sign({
        userId
    }, JWT_SECRETE as string)

    res.json({
        token
    })
})

app.post("/room",middleware,(req,res)=>{

    res.json({
        roomId:123
    })
})
app.listen(5000,()=>{
    console.log("server is running on 5000")
})