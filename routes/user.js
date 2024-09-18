const { Router } = require ('express');
const { createUser, login, getUser, updateUser, deleteUser } = require ('../controller/user');
const { auth } = require ('../middleware/middleware');

const userRoute = Router();

// create the user and pass it to the controller /api/v1/user/..
userRoute
    .post('/user', createUser) // entity=user routes=post, get, put, delete
    .get('/user', auth, getUser)
    .put('/user', auth, updateUser)
    .delete('/user', auth, deleteUser)
    .post('/user/login', login);

module.exports = { userRoute };