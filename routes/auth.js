// server/routes/auth.js
const express = require('express');
const { signUp ,login} = require('../controllers/authController');
const { ForgotPassword, ResetPassword } = require('../controllers/passwordcontroller');
const router = express.Router();

router.post('/register', signUp);
router.post('/login',login);
router.post('/forgotpwd',ForgotPassword);
router.get('/resetpwd/:id/:jwttoken',ResetPassword);
router.post('/reset/:id/:jwttoken',ResetPassword);


module.exports = router;
