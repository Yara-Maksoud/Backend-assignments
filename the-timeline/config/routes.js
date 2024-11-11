const express = require("express");
const route = express.Router();
const controller = require("../controllers/controller")

route.get('/', controller.homePage);
route.post('/add-new-post', controller.addNewPost);
route.get('/view-post/:id', controller.viewPost);
route.get('/delete-post/:id', controller.deletePost);

route.post('/add-comment/:postId', controller.addComment);
route.get('/delete-comment/:commentId/:postId', controller.deleteComment);

module.exports = route;