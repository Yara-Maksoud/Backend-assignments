const postModel = require("../model/postModel");

const homePage = (req, res) => {
    postModel.find()
    .then( result => {
        res.render('index', { data: result});        
    })
    .catch(err => console.log(err))
};

const addNewPost = (req, res) => {
    let newPost = new postModel(req.body);
    newPost.save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err))      
}

const viewPost = (req, res) => {
    postModel.findById(req.params.id)
    .then(result => {
        res.render('viewPost', {post : result});
    })
    .catch(err => console.log(err))
}

const deletePost = (req, res) => {
    
    postModel.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err))  
}

module.exports = {
    homePage,
    addNewPost,
    viewPost,
    deletePost
};