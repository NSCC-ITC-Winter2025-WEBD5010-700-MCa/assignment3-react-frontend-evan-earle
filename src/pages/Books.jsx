import { useQuery } from "@tanstack/react-query";
import BooksTable from "../components/books/BooksTable";
import { Outlet } from "react-router-dom";

const Books = () => {
  const {
    isPending,
    error,
    data: books,
  } = useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/books");
      return response.json();
    },
    //staleTime: Infinity,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Outlet />
      <h1 className="text-2xl font-bold">Books</h1>
      {isPending ? <p>Loading...</p> : <BooksTable books={books} />}
    </div>
  );
};
export default Books;
