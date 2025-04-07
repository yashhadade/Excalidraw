import { canvas } from "framer-motion/client";
import { getExistingShape } from "./http";
import { Tool } from "../components/Canvas";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: 'pencil',
    path: { x: number; y: number }[];
    line: number;
} | {
    type: "triangle",
    x: number;
    y: number;
    base: number;
    height: number;
};

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private socket: WebSocket;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";
    private path: { x: number; y: number }[] = []; // Path now an array of points
    private base = 0;
    private triHeight = 0;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.clearCanvas();
        this.initHandlers();
        this.initMouseHandlers();
        this.resizeCanvas(); // Initial resizing
    }

    setTool(tool: "circle" | "pencil" | "rect" | "triangle") {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShape(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const response = JSON.parse(event.data);

            if (response.type === "chat") {
                const parsedShape = JSON.parse(response.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.forEach((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === 'pencil') {
                this.ctx.lineWidth = shape.line;
                this.ctx.lineCap = 'round';
                const path = shape.path || [];

                if (path.length > 1) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(path[0].x, path[0].y);

                    path.forEach(point => {
                        this.ctx.lineTo(point.x, point.y);
                    });
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            } else if (shape.type === "triangle") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.x, shape.y + shape.height);
                this.ctx.lineTo(shape.x + shape.base, shape.y + shape.height);
                this.ctx.lineTo(shape.x + shape.base / 2, shape.y);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        });
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.clicked = true;
            this.startX = e.clientX;
            this.startY = e.clientY;
        });

        this.canvas.addEventListener("mouseup", (e) => {
            this.clicked = false;
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            const selectedTool = this.selectedTool;
            let shape: Shape | null = null;

            if (selectedTool === "rect") {
                shape = {
                    type: "rect",
                    x: this.startX,
                    y: this.startY,
                    height,
                    width,
                };
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                shape = {
                    type: "circle",
                    centerX: this.startX + radius,
                    centerY: this.startY + radius,
                    radius: radius,
                };
            } else if (selectedTool === 'pencil') {
                shape = {
                    type: 'pencil',
                    path: this.path,
                    line: 2,
                };
                this.path = []; // Clear path after sending
            } else if (selectedTool === 'triangle') {
                shape = {
                    type: "triangle",
                    base: this.base,
                    height: this.triHeight,
                    x: this.startX,
                    y: this.startY,
                };
            }

            if (shape) {
                this.existingShapes.push(shape);
                this.socket.send(JSON.stringify({
                    type: "chat",
                    message: JSON.stringify({ shape }),
                    roomId: Number(this.roomId),
                }));
            }
        });

        this.canvas.addEventListener("mousemove", (e) => {
            if (this.clicked) {
                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;
                this.clearCanvas();
                this.ctx.strokeStyle = "rgba(255,255,255)";
                const selectedTool = this.selectedTool;

                if (selectedTool === "rect") {
                    this.ctx.strokeRect(this.startX, this.startY, width, height);
                } else if (selectedTool === "circle") {
                    const radius = Math.max(width, height) / 2;
                    const centerX = this.startX + radius;
                    const centerY = this.startY + radius;

                    this.ctx.beginPath();
                    this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                } else if (selectedTool === 'pencil') {
                    const x = e.clientX;
                    const y = e.clientY;
                    this.path.push({ x, y });
                    this.clearCanvas();
                    this.ctx.lineWidth = 2;
                    this.ctx.lineCap = 'round';
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.path[0].x, this.path[0].y);
                    this.path.forEach(point => {
                        this.ctx.lineTo(point.x, point.y);
                    });
                    this.ctx.stroke();
                    this.ctx.closePath();
                } else if (selectedTool === 'triangle') {
                    this.base = Math.abs(width);
                    this.triHeight = Math.abs(height);
                    this.clearCanvas();
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.startX, this.startY + this.triHeight);
                    this.ctx.lineTo(this.startX + this.base, this.startY + this.triHeight);
                    this.ctx.lineTo(this.startX + this.base / 2, this.startY);
                    this.ctx.closePath();
                    this.ctx.stroke();
                }
            }
        });
    }

    resizeCanvas() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.clearCanvas(); // Redraw all existing shapes
        });
    }
}
