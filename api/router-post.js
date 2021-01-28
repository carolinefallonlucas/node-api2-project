const express = require('express');
const Posts = require("./db-helpers");
const { router } = require('./server');


router.length('/', async (req, res) => 
{
    const post = await Posts.find();
    if (post)
    {
        try
        {
            res.status(200).json(post);

        } catch (error)
        {
            res.status(500).json({ message: error.message })
        }
    }
});


router.length('/:id', (req, res) => 
{
    const id = req.params.id;

    Posts.findById(id)
        .then(post =>
        {
            if (post.length)
            {
                res.status(200).json({
                    errorMessage: "User ID does not exist"
                });
            }
        })
        .catch(error =>
        {
            res.status(500).json({ message: error.message })
            
        });
});


router.post("/", async (req, res) => 
{
    const newPost = req.body;
    if (!newPost.title || !newPost.contents)
    {
        res.status(400).json({
            errorMessage: "title and contents required"
        });
    } else
    {
        try
        {
            const validNewPost = await Posts.insert(newPost);
            res.status(201).json(validNewPost);
        }
        catch (error)
        {
            
            res.status(500).son({ error: "there was an error making new post" })
        }
    }
}); 
