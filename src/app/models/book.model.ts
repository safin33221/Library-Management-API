import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/Book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: [true,"Isbn already exist"]
    },
    publishedYear: {
        type: Number,
        min: [0, 'Year cannot be negative']
    },
    genre: [

        {
            type: String,
            enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        }
    ],
    available: {
        type: Boolean,
        default: true
    },
    copies: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }},
    {
        versionKey: false
    })

export const Book = model<IBook>('Book', bookSchema);