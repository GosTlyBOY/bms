import '../css/BookList.css';
import Card from './card';
import Form from './BookForm'
import { useEffect, useState } from "react";
import axios from "axios";


import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function BookList({setSnackBarShow, setSnackBarMsg}) {
  const [booksData, setBooksData] = useState([]);
  //to open form
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(()=>{
    const getBooks =  async()=>{
      const res = await axios.get(
        "http://localhost:4000/booksmgmt/getbooks",
        { withCredentials: true }
        );
        setBooksData(res.data)
      }
      getBooks();
    },[])
    
    
    const addBookToState = (newBookData)=>{
      setBooksData(prev=>{
        return [...prev, newBookData]
      })
      setIsFormOpen(false)
    }
    
    const deleteBookFromState = (bookIDToDelete)=>{
      setBooksData(prev=>{
        return prev.filter(book=>{
          return book._id !== bookIDToDelete
        })
      })
    }   
    return (
      <div className="book-list" >
      <div className="card-grid">
      {booksData.map((book) => (
        <div className='card' key={book._id}>
        <Card photo={book.bookCover} author={book.bookAuthor} title={book.bookTitle} id={book._id} genres={book.bookGenre} deleteBookFromState={deleteBookFromState} setSnackBarShow={setSnackBarShow} setSnackBarMsg={setSnackBarMsg}/>
        </div>
        ))}
        </div>
        {isFormOpen && <div className="form-visible"><Form setSnackBarShow={setSnackBarShow} setSnackBarMsg={setSnackBarMsg} addBookToState={addBookToState} closeForm={()=>{setIsFormOpen(false)}}/></div>} 
        <div className='add-btn' onClick={()=>{setIsFormOpen(prev=>!prev)}}>
        <div className='glow-on-hover'>
        <Fab  color="primary" aria-label="add"><AddIcon /></Fab>
        </div>
        </div>
        </div>
        );
      }
      
      export default BookList;
