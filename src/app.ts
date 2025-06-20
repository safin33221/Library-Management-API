import express, { Request, Response } from 'express'
import { Application } from "express";
import cors from 'cors';


const app: Application = express()
app.use(cors());

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send(`Library management server is running`)
})

export default app


