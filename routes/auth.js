const express = require("express");
const {protect} = require("../middleware/auth");
const {
    register,
    login,
    logout,
    updatePassword,
    getMe
} = require("../controllers/auth");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',protect, getMe);
router.put('/updatepassword',protect, updatePassword);


module.exports = router; 