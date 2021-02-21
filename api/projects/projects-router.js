// Write your "projects" router here!
// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
// [GET] /api/projects/:id returns a project with the given id as the body of the response.
// [POST] /api/projects returns the newly created project as the body of the response.
// [PUT] /api/projects/:id returns the updated project as the body of the response.
// [DELETE] /api/projects/:id returns no response body.
// Inside api/projects/projects-router.js add an endpoint for retrieving the list of actions for a project:
// [GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.

const express = require('express');
const model = require('./projects-model');
const {validateProjectID, validateResource} = require('../middleware/projectsMiddleware');
const router = express.Router();

router.get("/api/projects", (req,res)=>{
    model.get()
        .then( projects => {
            res.status(200).json(projects)
        })
        .catch(()=>{
            res.status(500).json({message: "Server Error"})
        })
})
router.get("/api/projects/:id", validateProjectID(), (req,res)=>{
    model.get(req.params.id)
        .then(projects=>{
            res.status(200).json(projects)
        })
        .catch(()=>{
            res.status(500).json({message:"Server Error"})
        })
    
})
router.post("/api/projects", validateResource(), (req,res)=>{
    model.insert(req.body)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(()=>{
            res.status(500).json({message: "Server Error"})
        })
})
router.put("/api/projects/:id", validateResource(), validateProjectID(),  (req,res)=>{
    // console.log(req.params.id)
    // console.log("reqbody", req.body)
    model.update(req.params.id, req.body)
        .then( project => {
            res.status(200).json(project)
        })
        .catch(()=>{
            res.status(500).json({message:"Server Error"})
        })
})
router.delete("/api/projects/:id", validateProjectID(), (req,res)=>{
    model.remove(req.params.id)
        .then(()=>{
            res.status(200).json({message:`Deleted : ${req.params.id}`})
        })
        .catch(()=>{
            
            res.status(500).json({message:"Server Error"})
        }) 
})

router.get("/api/projects/:id/actions", validateProjectID(), (req,res)=>{
    model.getProjectActions(req.params.id)
        .then( projectActions =>{
            res.status(200).json(projectActions)
        })
        .catch(()=>{
            res.status(500).json({message: "Server Error"})
        })
})

module.exports = router;