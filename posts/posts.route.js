const {Router} = require('express');
const Post = require('../models/post.model');
const postModel = require('../models/post.model');
const { isValidObjectId } = require('mongoose');
const { message } = require('../validations/user.validation');

const postRouter = Router();

postRouter.get('/', async(req, res) => {
    const posts = await Post.find().sort({_id:-1}).populate({path:'author', selcet:'fullName email'});
    res.status(200).json(posts);
}
)

postRouter.post('/', async (req, res) => {
    const {content} = req.body;
    if(!content){
        return res.status(400).json({message: 'Content is required'})
    }
    await postModel.create({content, author: req.userId})
    res.status(201).json({message: 'Post created successfully'})
})

postRouter.delete('/:id', async(req,res)=>{
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:'Id is invalid'})
    }
    const post = await postModel.findById(id)
    if(post.author.toString() !== req.userId){
        return res.status(401).json({message: 'you dont have permition'})
    }
    await postModel.findByIdAndDelete(id)
    res.status(200).json({message:"post deleted successfully"})

})

module.exports = postRouter;

