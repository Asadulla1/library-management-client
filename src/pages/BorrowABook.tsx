import { useNavigate, useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBorrowABookMutation, useGetBookByIdQuery } from "@/baseApi/baseApi";
import toast, { Toaster } from "react-hot-toast";
const BorrowABook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      quantity: 1,
      dueDate: "",
      book: id,
    },
  });
  // @ts-ignore
  const [borrowABook, { isLoading }] = useBorrowABookMutation();
  const { data, isLoading: bookLoading } = useGetBookByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const bookCopies = data?.data?.copies;
  // @ts-ignore
  const onSubmit = async (data) => {
    const res = await borrowABook(data);
    if (res.data.success) {
      toast.success("Borrowed Successfully");
    }

    form.reset();
    setTimeout(() => {
      navigate("/borrowSummary");
    }, 1000);
  };
  if (bookLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {bookCopies === 0 ? (
        <>
          <div className="h-screen flex items-center justify-center bg-base-100 px-4">
            <div className="card w-full max-w-md bg-white shadow-xl border border-gray-200">
              <div className="card-body text-center">
                <h2 className="card-title text-error justify-center">
                  Unavailable
                </h2>
                <p className="text-gray-600">
                  Sorry, copies are not available for borrow.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-md mx-auto mt-10  min-h-screen flex flex-col justify-center">
            <div>
              <h1 className="text-3xl font-bold text-center my-10 text-purple-600">
                Borrow A Book
              </h1>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Hidden Book ID (optional to show) */}
                <FormField
                  control={form.control}
                  name="book"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Book ID</FormLabel>
                      <FormControl>
                        <Input type="text" readOnly {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={bookCopies}
                          placeholder="Enter quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Due Date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Borrow Book
                </Button>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default BorrowABook;
