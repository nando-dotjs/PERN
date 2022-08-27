const { Router } = require('express');
const router = Router();

const {
    register, 
    login, 
    forgotpassword, 
    resetpassword
    } = require('../controllers/auth.controllers')

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotpassword);

router.put('/resetpassword/:resetToken', resetpassword);

module.exports = router;