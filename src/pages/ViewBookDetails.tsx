import { useGetBookByIdQuery } from "@/baseApi/baseApi";
import { useParams } from "react-router";

const ViewBookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(id);
  const book = data?.data;
  const isAvailable = book?.copies > 0;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Book Name: {book.title}
        </h2>

        <p className="text-gray-700 text-base md:text-lg mb-2">
          👤 <span className="font-semibold">Author:</span> {book.author}
        </p>

        <p className="text-gray-600 text-base md:text-lg mb-2">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>

        <p className="text-gray-600 text-base md:text-lg mb-2">
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>

        <p className="text-gray-800 text-base md:text-lg mt-4">
          <span className="font-semibold">Description:</span> {book.description}
        </p>

        <div className="mt-6 flex flex-col md:flex-row md:justify-between gap-4">
          <span
            className={`text-sm px-4 py-2 rounded font-bold text-white ${
              isAvailable ? "bg-green-600" : "bg-red-600"
            } w-max`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>

          <span
            className={`text-base font-semibold ${
              book.copies === 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            Remaining Copies: {book?.copies}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
