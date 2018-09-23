const router = require("express").Router();
const mongoose = require("mongoose");
const path = require("path");

const Post = mongoose.model("Post");

router.get("/", (req, res) => {
    try {
        console.log(__basedir);
        res.status(200).sendFile(path.join(__basedir, "public", "index.html"));
    } catch (error) {
        res.status(500);
    }
});

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (error) {
        res.status(500);
    }
});

router.get("/posts/:postId", async (req, res) => {
    try {
        const post = await Post.find({ _id: req.params.postId });
        res.send(post);
    } catch (error) {
        res.status(500);    
    }
});

router.put("/posts/:postId", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate({
            _id: req.params.postId
        }, req.body, {
            new: true,
            runValidators: true
        });

        res.send(post);
    } catch (error) {
        res.status(500); 
    }
});

router.delete("/posts/:postId", async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove({ _id: req.params.postId});
        res.send(post);
    } catch (error) {
        res.status(500); 
    }
});

router.post('/posts', async (req, res) => {
    try {
        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);  
    } catch (error) {
        res.status(500);
    }
});

module.exports = router;