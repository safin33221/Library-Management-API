import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

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
    }
})

const Borrow = model('Borrow', borrowSchema)