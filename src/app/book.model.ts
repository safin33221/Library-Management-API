import { model, Schema } from "mongoose";
import { IBook } from "./interfaces/Book.interface";

const bookSchema = new Schema<IBook>({
    title: {
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
        unique: true
    },
    publishedYear: {
        type: Number,
        min: [0, 'Year cannot be negative']
    },
    genre: [{ type: String }],
    available: {
        type: Boolean,
        default: true
    }

})

export const Book = model<IBook>('Book', bookSchema);