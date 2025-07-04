import { Link } from "react-router";
import { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral text-neutral-content">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full mr-2" />
          <span className="text-xl font-bold">BookNest</span>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/getAllBooks"
            className="hover:underline hover:text-white text-lg font-medium"
          >
            View All Books
          </Link>
          <Link
            to="/AddNewBooks"
            className="hover:underline hover:text-white text-lg font-medium"
          >
            Add A New Book
          </Link>
          <Link
            to="/borrowSummary"
            className="hover:underline hover:text-white text-lg font-medium"
          >
            View Borrow Summary
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-4 pb-4 space-y-2">
          <Link
            to="/getAllBooks"
            className="hover:underline text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            View All Books
          </Link>
          <Link
            to="/AddNewBooks"
            className="hover:underline text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Add A New Book
          </Link>
          <Link
            to="/borrowSummary"
            className="hover:underline text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            View Borrow Summary
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
