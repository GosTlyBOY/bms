const { GetBooks, AddBook, RemoveBook } = require("../Controllers/BooksController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.use(userVerification)

router.get("/getbooks", GetBooks);
router.post('/addbook', AddBook);
//put/patch or delete req ???
router.delete('/removebook',RemoveBook);

module.exports = router;