import express, { Request, Response, Application } from 'express'
import { bookRoutes } from './app/controllers/book.controllers';
import { borrowRoutes } from './app/controllers/borrow.controllers';
const app: Application = express()
app.use(express.json())



app.use('/api', bookRoutes)
app.use('/api', borrowRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send(`Library management server is running`)
})

export default app;


