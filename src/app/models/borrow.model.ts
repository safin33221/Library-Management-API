import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,

    },
    dueDate: {
        type: Date,
        default: new Date
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date,
        default: new Date
    },
}, {
    versionKey: false
}

)



//pre save book: ensure book is available before recording borrow

borrowSchema.pre("save", async function (next) {
    const borrow = this as IBorrow;
    try {
        const book = await Book.findById(borrow.book);
        if (!book) {
            return next(new Error('Book not found'));
        }

        if (!book.available) {
            return next(new Error('Book is currently not available'));
        }

        if (book.copies < borrow.quantity) {
            return next(
                new Error(`Only ${book.copies} copies available, but ${borrow.quantity} requested`)
            )
        }
        if (typeof book.copies === 'number' && typeof borrow.quantity === 'number') {

            book.copies = book.copies - borrow.quantity;
        }
        if (book.copies === 0) {
            book.available = false;
        }

        await book.save()
        next();
    } catch (err) {
        next(err as Error);
    }
});

export const Borrow = model('Borrow', borrowSchema)