const postModel = require("../model/postModel");
const commentModel = require("../model/commentModel");
const mongoose = require('mongoose');

const homePage = (req, res) => {
    postModel.find().sort({createdAt : -1})
    .populate('comments', 'commentBody')
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
    .populate('comments', 'commentBody')
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

const addComment =  (req, res) => {
    if(req.body.commentBody != ""){
        let commentData = {
            ...req.body,
            post: req.params.postId
        }     
        let newComment =  new commentModel(commentData);
        newComment.save()
        .then(() => {
            postModel.findById(req.params.postId)
            .then((post) => {
                post.comments.push(newComment._id)
                post.save()
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
            }) 
            .catch(err => console.log(err))           
        })
        .catch(err => console.log(err))
    }
    
}

const deleteComment = (req, res) => {    
    commentModel.findByIdAndDelete(req.params.commentId)
    .then(() => {
        postModel.findById(req.params.postId)
        .then(post =>{
            let commentId = new mongoose.Types.ObjectId(req.params.commentId);            
            const commentIndex = post.comments.indexOf(commentId);
            if (commentIndex > -1) { 
                post.comments.splice(commentIndex, 1); 
              }
            post.save()
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err)) 
    })
    .catch(err => console.log(err))
}

module.exports = {
    homePage,
    addNewPost,
    viewPost,
    deletePost,
    addComment,
    deleteComment
};