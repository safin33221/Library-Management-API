import express, { Request, Response, Application } from 'express'
import { bookRoutes } from './app/controllers/book.controllers';
import { borrowRoutes } from './app/controllers/borrow.controllers';
import cors from 'cors';
const app: Application = express()
app.use(express.json())
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://library-mangement-client-side.vercel.app']
    })
);


app.use('/api', bookRoutes)
app.use('/api', borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send(`Library management server is running`)
})

export default app;


