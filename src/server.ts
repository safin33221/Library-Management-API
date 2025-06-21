import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const PORT = 8000;

let server: Server;
const uri = process.env.MONGODB_URI
async function main() {
    try {
        if (!uri) {
            throw new Error('mongodb env variable not found')
        }
        await mongoose.connect(uri);
        console.log("db is connected");
        server = app.listen(PORT, () => {
            console.log(`app is running or port ${PORT}`);
        })

    } catch (error) {
        console.log('sever error', error); 
    }
}

main()