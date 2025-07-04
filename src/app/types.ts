export type BookType = {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number | string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface BookProps {
  book: BookType;
  index: number;
}
