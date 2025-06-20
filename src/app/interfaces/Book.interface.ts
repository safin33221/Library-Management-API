export interface IBook {
    title: string;
    author: string;
    isbn: string;
    publishedYear?: number;
    genre?: string[];
    available: boolean;
    copies:Number;
    createdAt:Date;
    updatedAt:Date;
}