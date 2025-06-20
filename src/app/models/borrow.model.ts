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
    },
    createdAt:{
        type:Date,
        default: new Date
    },
    updatedAt:{
        type:Date,
        default: new Date
    },
})

export const Borrow = model('Borrow', borrowSchema)