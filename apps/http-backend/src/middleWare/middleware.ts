import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"
import { JsonWebTokenError } from "jsonwebtoken";
import {JWT_SECRETE} from "@repo/backendcommon/config"
// import * as dotenv from 'dotenv';
// dotenv.config();
// const JWT_SECRETE = process.env.SECRET_KEY;

declare module "express" { 
    export interface Request {
        userId?: any
    }
  }
  interface JwtPayload {
    userId?: string;
}
export function middleware(req:Request,res:Response,next:NextFunction){
    const token =req.headers["authorization"]??"";

    const decoded=jwt.verify(token,JWT_SECRETE as string) as JwtPayload

    if(decoded){
        req.userId=decoded.userId;
        next()
    }else{
        res.status(403).json({
            message:"Unauthorized",
        })
    }
}