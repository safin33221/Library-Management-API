import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model'
export const borrowRoutes = express.Router()


borrowRoutes.post('/borrow', async (req: Request, res: Response) => {
    try {
        const borrowData = req.body
        const borrow = await Borrow.create(borrowData)
        res.status(201).send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        }); 

    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: 'Failed to create borrow record',
            error: {
                name: error.name,
                message: error.message,
            }
        });
    }
})