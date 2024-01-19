const Book = require("../Models/BookModel")

module.exports.GetBooks=async(req, res)=>{
    try {
        // Retrieve the user based on the email provided in req.email
        const user = req.user
        // Retrieve the book objects using the IDs in the user's 'books' array
        const bookIds = user.books; // Assuming 'books' is an array of ObjectId references
        const books = await Book.find({ _id: { $in: bookIds } });
        // Return the list of books
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.AddBook=async(req, res)=>{
    try{
        const { bookTitle, bookAuthor, bookGenre } = req.body;
        const genreArr = bookGenre.split(',')
        let bookCover = null
        //If book cover present then it we add it to the database else null
        if(req.files){
            bookCover = {
                imgBuffer:req.files.bookCover.data,
                imgExt:req.files.bookCover.mimetype.split('/').pop()
            }
        }
        const newBook = new Book({
            bookCover,
            bookTitle,
            bookAuthor,
            bookGenre: genreArr,
        });
        
        const savedBook = await newBook.save();
        const user = req.user;
        // Append the book created object Id to the user books arrray
        user.books.push(savedBook._id);
        await user.save();
        res.status(201).json(savedBook);
    }
    catch (error) {
        console.error('Error creating book and updating user:', error);
        res.status(500).send({ success: false });
        
    }
}

module.exports.RemoveBook=async(req, res)=>{
    try {
        const bookId = req.params.id;
    
        // Removes the Book from the Book Database
        const removedBook = await Book.deleteOne({ _id: bookId });
        if(!removedBook) return res.status(404).send({ error: 'Book cannot be removed' });

        // Remove the book ID from the user's books array
        req.user.books.pull(bookId);
        await req.user.save();
    
        res.status(200).json({ message: 'Book deleted successfully' });
      } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
