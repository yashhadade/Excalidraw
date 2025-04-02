type Shape={
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number;
}|{
    type:"circle";
    centerX:number;
    centerY:number;
    radius:number;
}
export function initDraw(canvas:HTMLCanvasElement){
    const ctx= canvas.getContext("2d")
    let existingShapes:Shape[]=[]
            if(!ctx){
                return
            }
    ctx.fillStyle = "rgba(0,0,0)";
    ctx?.fillRect(0,0,canvas.width,canvas.height)
    let clicked= false;
    let startX=0;
    let starty=0;
    canvas.addEventListener("mousedown",(e)=>{
        clicked =true;
        startX=(e.clientX)
        starty=(e.clientX)
    console.log("mousedown X"+e.clientX)
    console.log("mousedown y"+e.clientY)
   })
   canvas.addEventListener("mouseup",(e)=>{
    clicked=false
    console.log("mouseup X"+e.clientX)
    console.log("mouseup y"+e.clientY)
   })
   canvas.addEventListener("mousemove",(e)=>{
    if(clicked){
        const width=e.clientX-startX;
        const height=e.clientY-starty;
    console.log("mousemove X"+e.clientX)
    console.log("mousemove y"+e.clientY)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle="rgba(255,255,255)"
    ctx.strokeRect(startX,starty,width,height)
    }
   })
}