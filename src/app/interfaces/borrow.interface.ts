import { Schema } from "mongoose";

export interface IBorrow {
    book: Schema.Types.ObjectId;
    quantity: Number;
    dueDate: Date;

}