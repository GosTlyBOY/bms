const { GetBooks, AddBook, RemoveBook } = require("../Controllers/BooksController");
const { UserVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.use(UserVerification)

router.get("/getbooks", GetBooks);
router.post('/addbook', AddBook);
//put/patch or delete req ???
router.delete('/removebook/:id',RemoveBook);

module.exports = router;