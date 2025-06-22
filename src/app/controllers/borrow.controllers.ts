import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model'
import { Book } from '../models/book.model';
export const borrowRoutes = express.Router()


borrowRoutes.post('/borrow', async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;

        // Validate
        if (!book || !quantity || !dueDate) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }
        // Check and update book inventory
        await Book.borrowBook(book, quantity);

        // Create borrow record
        const borrowRecord = await Borrow.create({ book, quantity, dueDate });

        res.status(201).send({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowRecord
        });

    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        let errorName = 'Error';
        if (error instanceof Error) {
            errorMessage = error.message;
            errorName = error.name;
        }
        res.status(400).send({
            success: false,
            message: 'Failed to create borrow record',
            error: {
                name: errorName,
                message: errorMessage,
            }
        });
    }
})

borrowRoutes.get('/borrow', async (req: Request, res: Response) => {
    try {
        const borrows = await Borrow.aggregate([

            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'bookData'
                }
            },
            {
                $unwind: '$bookData'
            },
            {
                $group: {
                    _id: '$bookData._id',
                    book: {
                        $first: {
                            title: '$bookData.title',
                            isbn: '$bookData.isbn'

                        }
                    },

                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    book: 1,
                    totalQuantity: 1
                }
            }

        ])
        console.log(borrows);

        res.status(201).send({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: borrows
        });
    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        let errorName = 'Error';
        if (error instanceof Error) {
            errorMessage = error.message;
            errorName = error.name;
        }
        res.status(400).send({
            success: false,
            message: 'Borrowed books summary retrieved failed',
            error: {
                name: errorName,
                message: errorMessage,
            }
        });

    }
})