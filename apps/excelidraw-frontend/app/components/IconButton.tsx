import { LineChart } from "lucide-react";
import { ReactNode } from "react";
export function IconButton({icon,onClick,activated}:{
icon:ReactNode,
onClick:()=>void,
activated:Boolean
}){
    return <div className={ `pointer-events-auto rounded-2xl border p-2 bg-black hover:bg-gray-600  ${activated ?"text-red-600":" text-white"}`} onClick={onClick}>
        {icon}
    </div>
}