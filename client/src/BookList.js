import './BookList.css';
import Card from './card';
import Form from './BookForm'
import bookCover1 from './images/book1.jpg'; 
import bookCover2 from './images/book2.jpg'; 
import bookCover3 from './images/book3.jpg'; 
import bookCover4 from './images/book4.jpg'; 
import bookCover5 from './images/book5.jpg'; 
import bookCover6 from './images/book6.jpg'; 
import bookCover7 from './images/book7.jpg'; 

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function BookList() {
  const booksData = [
    { id: 1, title: 'Book 1', author: 'Author 1', genres: ['Mystery', 'Thriller', 'Thriller','Thriller'], coverImage: bookCover1 },
    { id: 2, title: 'You Only Live Once You Only Live Once', author: 'Stuti Changle Stuti Changle ', genres: ['Personal finance', 'Self-help book'], coverImage: bookCover2 },
    { id: 3, title: 'Book 3', author: 'Author 3', genres: ['Mystery', 'Thriller'], coverImage: bookCover3 },
    { id: 4, title: 'Book 4', author: 'Author 4', genres: ['Mystery', 'Thriller'], coverImage: bookCover4 },
    { id: 5, title: 'Book 5', author: 'Author 5', genres: ['Mystery', 'Thriller'], coverImage: bookCover5 },
    { id: 6, title: 'Book 6', author: 'Author 6', genres: ['Mystery', 'Thriller'], coverImage: bookCover6 },
    { id: 7, title: 'Book 7', author: 'Author 7', genres: ['Historical Fiction'], coverImage: bookCover7 },
];
  
  return (
    <div className="book-list" >
      <div className="card-grid">
        {booksData.map((book) => (
          <div className='card' key={book.id}>
            <Card photo={book.coverImage} author={book.author} title={book.title} genres={book.genres}  />
          </div>
        ))}
      </div>
      <div className="form-visible"><Form /></div>
      <div className='add-btn'>
        <div className='glow-on-hover'>
        <Fab  color="primary" aria-label="add"><AddIcon /></Fab>
        </div>
      </div>
    </div>
  );
}

export default BookList;
