const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');


const server = express();
server.use(express.json());
server.use(actionsRouter);
server.use(projectsRouter);

server.get('/', (req,res)=>{
    res.send(`<h4>Time to code</h4>`)
})
module.exports = server;
