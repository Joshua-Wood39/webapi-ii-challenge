const express = require('express');
const postsRouter = require('./posts/posts-router.js');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send(`
        <h2>Josh's WebApi-II Challenge</h2>
        <p>Because Ice Cream Has No Bones</p>
    `);
});

server.use(`/api/posts`, postsRouter);

module.exports = server;