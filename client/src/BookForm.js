import React, { useState } from 'react';
import './BookForm.css'; // Import the CSS file for styling
import UploadIcon from '@mui/icons-material/Upload';

const BookForm = () => {
  const [formData, setFormData] = useState({
    bookImg: null,
    name: '',
    author: '',
    genre: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

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
    // Trigger the hidden file input when card is clicked
    document.getElementById('fileInput').click();
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
    console.log('Form submitted with data:', formData);
    // Reset the form after submission
    setFormData({
      bookImg: null,
      name: '',
      author: '',
      genre: '',
    });
  };

  return (
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
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
            id="fileInput"
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
          required
        />
      </label>
      <br />

      <label>
        Genre :
        <input
          className='input-control'
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <div style={{display:"flex",justifyContent:"center"}}>
        <button type="submit" className='glow-on-hover1'>Submit</button>
      </div>
      </div>
      
    </form>
  );
};

export default BookForm;
