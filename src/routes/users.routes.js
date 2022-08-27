const { Router } = require('express');
const router = Router();

const { 
    getAllUsers, 
    getUser, 
    createUser, 
    deleteUser, 
    updateUser
} = require('../controllers/users.controllers')


router.get('/users', getAllUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', updateUser);



module.exports = router;