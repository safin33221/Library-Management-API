import express, { Request, Response } from 'express';
import { Book } from '../book.model';
export const bookRoutes = express.Router()


bookRoutes.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await Book.find()
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error) {
        res.status(400).send({
            message: 'book not create',
            success: false,
            error: error
        })
    }
})


bookRoutes.get('/books/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId)
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data: book
        })

    } catch (error) {
        res.status(400).send({
            message: 'sever error',
            success: false,
            error: error
        })
    }
})


bookRoutes.post('/books', async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        console.log(req.body);
        const book = await Book.create(bookData)
        res.status(200).send({
            success: true,
            message: "Book created successfully",
            data: book
        })

    } catch (error) {
        res.status(400).send({
            message: 'book not create',
            success: false,
            error: error
        })
    }
})