const express = require("express");
const route = express.Router();
const controller = require("../controllers/controller")

route.get('/', controller.homePage);
route.post('/add-new-post', controller.addNewPost);
route.get('/view-post/:id', controller.viewPost);
route.get('/delete-post/:id', controller.deletePost);

module.exports = route;