import { useEffect, useState, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/Booklist";

import BooksContext from "./context/books";

function App() {
  const { fetchBooks}=useContext(BooksContext)
  
  useEffect(() =>{
    fetchBooks();
    },[])

  

  return (
    <div>
      <BookList  />
      <BookCreate  />
    </div>
  );
}

export default App;
