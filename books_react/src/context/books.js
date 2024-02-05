import { createContext, useState} from 'react'
import axios from 'axios'

const BooksContext = createContext()

function Provider({ children }){
    const [books, setBooks] = useState([]);
  const fetchBooks = async()=> {
    const response = await axios.get('http://localhost:3001/books')
    setBooks(response.data)
  }
  const editBookById = async(id, newTitle)=>{
    const response = await axios.put(`http://localhost:3001/books/${id}`, {title: newTitle})

    console.log(response)
    const updatedBooks= books.map((book)=>{
        if(book.id===id){
            return{...book, ...response.data}
        }

        return book;
    })

    setBooks(updatedBooks)
  }



  const deleteBookById = async(id) => {
    await axios.delete(`http://localhost:3001/books/${id}`)
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    try {
      // Make sure 'id' is provided in the request
      const response = await axios.post('http://localhost:3001/books', {
        id: Math.round(Math.random() * 9999),
        title,
      });
      const updatedBooks = [...books,response.data]
      setBooks(updatedBooks)
      
      // ... rest of your code
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

   
    
    return <BooksContext.Provider value={{}}>
        {children}
    </BooksContext.Provider>
}
export { Provider}
export default BooksContext 