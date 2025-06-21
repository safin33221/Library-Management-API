import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/Book.interface";

const bookSchema = new Schema<IBook>({
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

export const Book = model<IBook>('Book', bookSchema);