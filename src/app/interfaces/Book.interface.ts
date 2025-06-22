import { Model } from "mongoose";

export interface IBook {
    title: string;
    description: string;
    author: string;
    isbn: string;
    publishedYear?: number;
    genre?: string[];
    available: boolean;
    copies: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookModel extends Model<IBook> {
  borrowBook(bookId: string, quantity: number): Promise<IBook>;
}