import mongoose, { model, Schema } from "mongoose";
import { IBook, IBookModel } from "../interfaces/Book.interface";

const bookSchema = new Schema<IBook, IBookModel>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: [true, "ISBN is not correct"],
    }
    ,
    publishedYear: {
        type: Number,
        min: [0, 'Year cannot be negative']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: 'Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY',
        },
    },
    available: {
        type: Boolean,
        default: true
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies cannot be negative"]
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
},
    {
        versionKey: false
    })


// Static method to handle update on borrow
bookSchema.statics.borrowBook = async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (!book.available) {
        throw new Error('Book is currently not available');
    }
    if (book.copies < quantity) throw new Error(`Only ${book.copies} copies available, but ${quantity} requested`);

    book.copies -= quantity;
    if (book.copies === 0) {
        book.available = false;
    }
    await book.save();
    return book;
};


export const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);