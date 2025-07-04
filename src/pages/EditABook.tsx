import { useNavigate, useParams } from "react-router";
import { useEditABookMutation, useGetBookByIdQuery } from "@/baseApi/baseApi";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditABook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [editABook, { isLoading: updating }] = useEditABookMutation();
  const book = data?.data;

  const form = useForm({
    defaultValues: {
      id: "",
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
    },
  });

  useEffect(() => {
    if (book) {
      form.reset({
        id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [book, form]);
  // @ts-ignore
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        available: data.copies > 0,
      };

      const res = await editABook({ id, ...payload }).unwrap();
      if (res.success) {
        toast.success("Successfully updated!");
      }

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Failed to update book!");
      console.error(error);
    }
  };

  if (isLoading || !book) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 lg:p-0 p-5">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Book</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* id  */}
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select genre</option>
                    <option value="FICTION">Fiction</option>
                    <option value="NON_FICTION">Non-Fiction</option>
                    <option value="SCIENCE">Science</option>
                    <option value="HISTORY">History</option>
                    <option value="BIOGRAPHY">Biography</option>
                    <option value="FANTASY">Fantasy</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISBN  */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full bg-green-700 text-white">
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditABook;
