import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
export const bookRoutes = express.Router()


bookRoutes.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await Book.find()
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'Failed to retrieve books',
            error: {
                name: error.name,
                message: error.message,
            }
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

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'Failed to retrieve the book',
            error: {
                name: error.name,
                message: error.message,
            }
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

    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: 'Book creation failed',
            error: {
                name: error.name,
                message: error.message,
            }
        })

    }
})





bookRoutes.put('/books/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const updateBook = req.body
        const book = await Book.findByIdAndUpdate(bookId, updateBook, { new: true })
        if (!book) {
            res.status(404).send({
                success: false,
                message: 'book not found',
                data: null

            })
        }
        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'Failed to update book',
            error: {
                name: error.name,
                message: error.message,
            }
        })

    }
})


bookRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const book = await Book.findByIdAndDelete(bookId)
        res.status(200).send({
            success: true,
            message: "Book deleted successfully ",
            data: null
        })

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'Failed to delete book',
            error: {
                name: error.name,
                message: error.message,
            }
        })

    }
})