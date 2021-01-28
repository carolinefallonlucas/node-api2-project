const express = require('express');

const server = express();

server.use(express.json());
server.get("/", (req, res) =>
{
    res.status(200)
        .json({
            name: "Caroline's Server",
            environment: process.env.NODE_ENV
        
        });
});
module.exports = server; 