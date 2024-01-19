const { Signup, Login, GetUserEmail } = require("../Controllers/AuthController");
const { UserVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

//Routes for SignUP, Login, Userverification
router.post("/signup", Signup);
router.post('/login', Login);
router.get('/',UserVerification, GetUserEmail);

module.exports = router;