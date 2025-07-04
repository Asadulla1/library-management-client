import type { BookType } from "@/app/types";
import { useGetAllBooksQuery } from "../baseApi/baseApi";
import Book from "./Book";
import { Toaster } from "react-hot-toast";

const Books = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const books: BookType[] = data?.data ?? [];
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen overflow-x-auto mx-5 mt-10 ">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Serial</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Available</th>
              <th>Copies</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <Book book={book} key={book._id} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Books;
