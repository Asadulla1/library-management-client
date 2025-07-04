import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "@/pages/Books";
import AddANewBook from "@/pages/AddANewBook";
import ViewBookDetails from "@/pages/ViewBookDetails";
import BorrowABook from "@/pages/BorrowABook";
import BorrowSummary from "@/pages/BorrowSummary";
import EditABook from "@/pages/EditABook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Books,
      },
      {
        path: "/getAllBooks",
        Component: Books,
      },
      {
        path: "/AddNewBooks",
        Component: AddANewBook,
      },
      {
        path: "/viewBookDetails/:id",
        Component: ViewBookDetails,
      },
      {
        path: "/borrowABook/:id",
        Component: BorrowABook,
      },
      {
        path: "/borrowSummary",
        Component: BorrowSummary,
      },
      {
        path: "/editABook/:id",
        Component: EditABook,
      },
    ],
  },
]);
