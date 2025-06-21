import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
export const bookRoutes = express.Router()


bookRoutes.get('/books', async (req: Request, res: Response) => {
    try {
        const filter = req.query.filter as string | undefined;
        const sortBy = req.query.sortBy as string | undefined;
        const sortOrderStr = req.query.sort as string | undefined;
        const limitStr = req.query.limit as string;

        const query: Record<string, unknown> = {};


        if (filter) {
            query.genre = filter;
        }

        let bookQuery = Book.find(query);

        if (sortBy && sortOrderStr) {
            const sortOrder = sortOrderStr === 'asc' ? 1 : -1;
            bookQuery = bookQuery.sort({ [sortBy]: sortOrder });
        }


        if (limitStr) {
            const limit = parseInt(limitStr) || 10;
            if (!isNaN(limit)) {
                bookQuery = bookQuery.limit(limit);
            }
        }

        const books = await bookQuery;

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
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

    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        let errorName = 'Error';
        if (error instanceof Error) {
            errorMessage = error.message;
            errorName = error.name;
        }
        res.status(500).send({
            success: false,
            message: 'Failed to retrieve the book',
            error: {
                name: errorName,
                message: errorMessage,
            }
        });


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

    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        let errorName = 'Error';
        if (error instanceof Error) {
            errorMessage = error.message;
            errorName = error.name;
        }
        res.status(400).send({
            success: false,
            message: 'Book creation failed',
            error: {
                name: errorName,
                message: errorMessage,
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
    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        let errorName = 'Error';
        if (error instanceof Error) {
            errorMessage = error.message;
            errorName = error.name;
        }
        res.status(500).send({
            success: false,
            message: 'Failed to update book',
            error: {
                name: errorName,
                message: errorMessage,
            }
        })

    }
})


bookRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        await Book.findByIdAndDelete(bookId)
        res.status(200).send({
            success: true,
            message: "Book deleted successfully ",
            data: null
        })

    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        let errorName = 'Error';
        if (error instanceof Error) {
            errorMessage = error.message;
            errorName = error.name;
        }
        res.status(500).send({
            success: false,
            message: 'Failed to delete book',
            error: {
                name: errorName,
                message: errorMessage,
            }
        })

    }
})