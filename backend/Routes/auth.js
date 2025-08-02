const express = require ('express');
const app = express();
const {registerUser , loginUser} = require ('../controllers/authController');

const router = express.Router();

router.post ('/register', registerUser);
router.post ('/login', loginUser);

module.exports = router;