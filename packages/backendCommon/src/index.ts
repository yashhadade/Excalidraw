import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
export const JWT_SECRETE= process.env.SECRET_KEY
console.log("JWT "+ process.env.SECRET_KEY)
