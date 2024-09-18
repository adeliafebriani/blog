const { Router } = require ('express');
const { createComment, getComment } = require ('../controller/comment');
const { auth } = require ('../middleware/middleware');

const commentRoute = Router();

commentRoute
    .post('/comment', auth, createComment)
    .get('/comment', auth, getComment);

module.exports = { commentRoute };