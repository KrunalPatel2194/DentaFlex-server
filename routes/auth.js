// server/routes/auth.js
const express = require('express');
const { signUp ,login} = require('../controllers/authController');
const { ForgotPassword, ResetPassword } = require('../controllers/passwordcontroller');
const router = express.Router();
const {getAllshift,bookShift} = require('../controllers/shiftcontroller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', signUp);
router.post('/login',login);
router.post('/forgotpwd',ForgotPassword);
router.get('/resetpwd/:id/:jwttoken',ResetPassword);
router.post('/reset/:id/:jwttoken',ResetPassword);
router.get('/shifts',authMiddleware ,getAllshift);
router.post('/book',authMiddleware ,bookShift);


module.exports = router;
