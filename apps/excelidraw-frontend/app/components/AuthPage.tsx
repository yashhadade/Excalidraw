"use client"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 via-black to-gray-900">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg">
                <div className="text-center text-4xl font-semibold text-gray-700 mb-6">
                    {isSignin ? "Sign In" : "Sign Up"}
                </div>
                <div className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="Email"
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => {}}
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
