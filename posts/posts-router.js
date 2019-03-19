const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

router.post('/', (req, res) => { 
    const { title, contents } = req.body;
    const newPost = req.body;
    console.log(req.body.contents)
    if( title === undefined || contents === undefined) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db
        .insert(newPost)
        .then(post => {
            //let the client know what happened
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    

    db
    .findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(post);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    db
    .findById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            db
            .remove(id)
            .then(deleted => {
                res.status(200).json(post);
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be removed" })
            })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Server could not find post..."})
    })

        
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    const changes = req.body;

    db
    .findById(id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            if(title === undefined || contents === undefined) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the user." })
            } else {
                db
                .update(id, changes)
                .then(created => {
                    res.status(200).json(created); 
                })
                .catch(error => {
                    res.status(500).json({ error: "The post information could not be modified." })
                })
            }
        }
    })   
})


module.exports = router;