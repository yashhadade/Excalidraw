"use client"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import axios from "axios"
import { useRef } from "react"
import { HTTP_BACKEND } from "../config"
import userService from "../service/userService"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
        const emailRef=useRef<HTMLInputElement>(null)
        const passwordRef=useRef<HTMLInputElement>(null)
        const usernameRef=useRef<HTMLInputElement>(null)
    async function handleSignin(){
        console.log("handleSignin")
        const email=emailRef.current?.value
        const password=passwordRef.current?.value
        const username=usernameRef.current?.value
        if(!email||!password){
            return
        }
        let data
        if(isSignin){
            data={
                email,
                password,
            }
        }else{
            data={
                email,
                password,
                username
            }
        }
       
        try {
            if(isSignin){
                const res = await userService.userSignin(data)
                if(res && res.success){
                    sessionStorage.setItem('authorization', res.token)
                    window.location.href = "/room"
                }
            }else{
                console.log(data)
                const res = await userService.userSignUp(data)
                if(res && res.success){
                    window.location.href = "/signin"
                }
            } 
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 via-black to-gray-900">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg">
                <div className="text-center text-4xl font-semibold text-gray-700 mb-6">
                    {isSignin ? "Sign In" : "Sign Up"}
                </div>
                <div className="space-y-4">
                {!isSignin&&<div>
                        <Input
                            type="text"
                            placeholder="username"
                            ref={usernameRef}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>}
                    <div>
                        <Input
                            type="text"
                            placeholder="Email"
                            ref={emailRef}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => {handleSignin()}}
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                        >
                            {isSignin ? "Sign In" : "Sign Up"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
