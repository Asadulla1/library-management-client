import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-rose-ten.vercel.app/",
  }),
  tagTypes: ["books", "summary"],
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => "api/books",
      providesTags: ["books"],
    }),
    addANewBook: build.mutation({
      query: (data) => ({
        url: "api/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    getBookById: build.query({
      query: (id) => `api/books/${id}`,
    }),
    deleteABook: build.mutation({
      query: (id) => ({
        url: `api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    editABook: build.mutation({
      query: ({ id, ...data }) => ({
        url: `api/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["books", "summary"],
    }),
    borrowABook: build.mutation({
      query: (data) => ({
        url: "api/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books", "summary"],
    }),
    borrowSummary: build.query({
      query: () => `api/borrow`,
      providesTags: ["summary"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useAddANewBookMutation,
  useGetBookByIdQuery,
  useDeleteABookMutation,
  useBorrowABookMutation,
  useBorrowSummaryQuery,
  useEditABookMutation,
} = booksApi;
