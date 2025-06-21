export interface IBook {
    title: string;
    author: string;
    isbn: string;
    publishedYear?: number;
    genre?: string[];
    available: boolean;
    copies:number;
    createdAt:Date;
    updatedAt:Date;
}