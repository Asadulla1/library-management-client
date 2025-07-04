import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useAddANewBookMutation } from "@/baseApi/baseApi";
import { useNavigate } from "react-router";
import type { BookType } from "@/app/types";

const AddANewBook = () => {
  const navigate = useNavigate();
  const [addANewBook, { isLoading }] = useAddANewBookMutation();
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      available: true,
      copies: 1,
      description: "",
    },
  });

  const onSubmit = async (data: BookType) => {
    const copies =
      typeof data.copies === "string" ? parseInt(data.copies, 10) : data.copies;
    const finalData = { ...data, copies };

    try {
      await addANewBook(finalData).unwrap();
      toast.success("Book added successfully!");
      form.reset();
      navigate("/");
    } catch (error) {
      toast.error("Failed to add book. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toaster position="top-right" reverseOrder={false} />
      <Form {...form}>
        {/* @ts-ignore */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
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
                  <Input placeholder="Enter author name" {...field} />
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
                    <option value="">Select a genre</option>
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
          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Available */}
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Available</FormLabel>
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
                  <Input
                    type="number"
                    placeholder="Enter number of copies"
                    {...field}
                  />
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
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-700 text-white"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddANewBook;
