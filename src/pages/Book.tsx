import type { BookProps } from "@/app/types";
import { useDeleteABookMutation } from "@/baseApi/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Book = ({ book, index }: BookProps) => {
  const navigate = useNavigate();
  const [deleteABook, { isLoading }] = useDeleteABookMutation();
  const handleViewButton = (bookId: string) => {
    navigate(`/viewBookDetails/${bookId}`);
  };
  const handleDeleteButton = async (bookId: string) => {
    // console.log(bookId);
    const res = await deleteABook(bookId);
    if (res.data.success) {
      toast.success("Successfully deleted!");
    }
  };
  const handleBorrowButton = (bookId: string) => {
    navigate(`/borrowABook/${bookId}`);
  };
  const handleEditButton = (bookId: string) => {
    navigate(`/editABook/${bookId}`);
  };
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return (
    <>
      <tr className="text-center">
        <td>{index + 1}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.isbn}</td>
        <td>
          <span
            className={`badge ${
              book.available ? "badge-success" : "badge-error"
            }`}
          >
            {book.available ? "Yes" : "No"}
          </span>
        </td>
        <td>{book.copies}</td>
        <td>{book.description}</td>
        <td>
          <div className="flex flex-wrap justify-evenly items-center gap-2">
            <button
              className="btn btn-outline"
              onClick={() => handleViewButton(book._id)}
            >
              View
            </button>
            <button
              className="btn btn-dash"
              onClick={() => handleEditButton(book._id)}
            >
              Edit
            </button>
          </div>
          <div className="flex flex-wrap justify-evenly items-center gap-2 mt-2">
            <button
              className="btn bg-red-600 text-white"
              onClick={() => handleDeleteButton(book._id)}
            >
              Delete
            </button>
            <button
              className="btn bg-green-600 text-white"
              onClick={() => handleBorrowButton(book._id)}
            >
              Borrow
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Book;
