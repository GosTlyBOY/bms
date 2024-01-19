import React, { useState, useRef } from 'react';
import '../css/BookForm.css'; // Import the CSS file
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';


const BookForm = ({addBookToState, closeForm, setSnackBarShow,setSnackBarMsg}) => {
  const [bookCover, setBookCover] = useState(null);
  const fileInputElement = useRef(null);
  const [formData, setFormData] = useState({
    bookImg: null,
    name: '',
    author: '',
    genre: '',
  });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBookCover(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          bookImg: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          bookImg: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleClick = () => {
    if (fileInputElement) fileInputElement.current.click()
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic here
    const currformData = new FormData();
    currformData.append('bookCover', bookCover);
    currformData.append('bookTitle', formData.name.trim());
    currformData.append('bookAuthor', formData.author.trim());
    currformData.append('bookGenre', formData.genre.trim());
    
    try{
      setSnackBarMsg("Adding book...")
      setSnackBarShow(true)
      const addBook =  async()=>{
        const res = await axios.post(
          "http://localhost:4000/booksmgmt/addbook",
          currformData,
          { headers:{
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true }
          );
      setSnackBarShow(false)
          addBookToState(res.data)
        }
        addBook();

      }catch(error){
        console.log(error)
      }

      // Reset the form after submission
      setFormData({
        bookImg: null,
        name: '',
        author: '',
        genre: '',
      });
      
      
    };
    
    return (
      <>
      <button className="close-btn"title="Close" onClick={closeForm}><CloseIcon fontSize='small'/></button>
      <form onSubmit={handleSubmit} className="book-form"> 
      
      <div className='prev'>
      <div
      className="card-preview"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      >
      <label className="card-image">
      <input
      type="file"
      accept="image/jpeg, image/jpg, image/png"
      onChange={handleImageChange}
      className="image-input"
      id="fileInput"
      ref={fileInputElement}
      />
      {formData.bookImg ? (
        <img src={formData.bookImg} alt="Book Preview" className="image-preview" />
        ) : (
          <React.Fragment>
          <div className='upload-content'>
          <b style={{fontSize:"18px"}}>Upload Book Cover</b>
          <p><UploadIcon fontSize='large'/></p>
          <p>Click to Browse files or drag and drop an image</p>
          </div>
          </React.Fragment>
          )}
      </label>
      </div>
      </div> 
      <div className='form-text'>
        <label>
          Book Name :
          <input
          className='input-control'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Book Name"
          required
          />
        </label>
          <br />
          
        <label>
          Author :
          <input
          className='input-control'
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter Author of the Book"
          required
          />
        </label>
          <br />
          
        <label>
          Genre : <i style={{fontSize:'14px'}}> (Add Comma ',' between multiple genre)</i>
          <input
          className='input-control'
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Enter Genre of the Book"
          />
        </label>
          <br />
        <div style={{display:"flex",justifyContent:"center"}}>
        <button type="submit" className='glow-on-hover1'>Submit</button>
        </div>
        </div>
        </form>
        </>          
      );
  };
        
export default BookForm;
