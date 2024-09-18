const { Router } = require ('express');
const { 
    createArticle, 
    getArticle, 
    getArticleById,
    updateArticleById, 
    deleteArticleById,
    createLike,
    getLike,
} = require ('../controller/article');
const { auth } = require ('../middleware/middleware');

const articleRoute = Router();

// CRUD = create, read, update, delete
// entity=user routes=post, get, put, delete
// create the article and pass it to the controller /api/v1/article/..
articleRoute
    .post('/articles', auth, createArticle) 
    .get('/articles', auth, getArticle)
    .get('/articles/:id', auth, getArticleById)
    .put('/articles/:id', auth, updateArticleById)
    .delete('/articles/:id', auth, deleteArticleById)
    .post('/articles/:id/likes', auth, createLike)
    .get('/articles/:id/likes', getLike);

module.exports = { articleRoute };