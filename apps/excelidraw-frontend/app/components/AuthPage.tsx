"use client"

export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    return <div className=" w-screen h-screen flex justify-center items-center bg-black">
        <div className=" p-10 m-2 bg-white rounded-xl flex-col justify-center items-center">
            <div>
                <input type="text" placeholder="Email" className=" border p-2 rounded-2xl"></input>
            </div>
            <div className=" mt-2">
                <input type="password" placeholder="Password" className=" border p-2  rounded-2xl" ></input>
            </div>
            <div className=" flex justify-center mt-2">
                <button onClick={() => {

                }} className=" border p-2  rounded-2xl">{isSignin ? "Sign in" : "Sign Up"}</button>
            </div>
        </div>
    </div>
}