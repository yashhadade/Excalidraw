import express from "express"
import {  Request,Response } from "express";
import  jwt  from "jsonwebtoken"
import * as dotenv from 'dotenv';
import { middleware } from "./middleWare/middleware";
// import {JWT_SECRETE} from "@repo/backendcommon/config"
import {CreateUserSchema,SignInSchema,CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"

dotenv.config();
const JWT_SECRETE = process.env.SECRET_KEY;
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
app.post("/signIn", async (req: Request, res: Response): Promise<any> => {
    try {
        console.log(req.body);

        // Validate input
        const data = SignInSchema.safeParse(req.body);
console.log(data)
        if (!data.success) {
            return res.status(400).json({
                data: data,
                message: "Incorrect Input"
            });
        }

        // Try to find the user in the database
        const user = await prismaClient.user.findFirst({
            where: {
                email: data.data?.email,
                password: data.data?.password
            }
        });
        console.log(user)
        // If user not found, return 404
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
console.log(JWT_SECRETE);
        // Generate JWT token
        const token = jwt.sign({
            userId: user?.id
        }, JWT_SECRETE as string);
        console.log(token)
        // Return the success response with the token
        return res.json({
            success: true,
            token: token
        });

    } catch (error) {
        // Catch and handle errors gracefully
        console.error("Internal Server Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


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