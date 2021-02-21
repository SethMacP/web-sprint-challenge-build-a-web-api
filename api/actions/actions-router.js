// Write your "actions" router here!
// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
// [GET] /api/actions/:id returns an action with the given id as the body of the response.
// [POST] /api/actions returns the newly created action as the body of the response.
// [PUT] /api/actions/:id returns the updated action as the body of the response.
// [DELETE] /api/actions/:id returns no response body.
const express = require('express')
const model = require('./actions-model');
//middleware placeholder
const { validateActionID, validateResource, } = require('../middleware/actionMiddleware')
const router = express.Router();

router.get("/api/actions", (req,res)=>{
    model.get()
        .then((allActions)=>{
            res.status(200).json(allActions)
        })
        .catch(()=>{
            res.status(500).json({message:"Server Error"})
        })
})
router.get("/api/actions/:id", validateActionID(), (req,res, next)=>{
    res.json(req.action);
})
router.post("/api/actions",validateResource(), (req,res, next)=>{
    //Returns an odd error, but the error seems to not effect the code.
    //error:`.returning() is not supported by sqlite3 and will not have any effect.`
    model.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(()=>{
            res.status(500).json({message:"Server Error"})
        })
})
router.put("/api/actions/:id", validateResource(), validateActionID(),  (req,res)=>{
    model.update( req.params.id , req.body )
        .then((action)=>{
            res.status(200).json(action)
        })
        .catch(()=>{
           res.status(500).json({message:"Server Error"}) 
        })
})
router.delete("/api/actions/:id", validateActionID(), (req,res)=>{
    model.remove(req.params.id)
        .then( () => {
            res.status(200).json({message:"Action Deleted"})
        })
        .catch( () => {
            res.status(500).json({message:"Server Error"})
        })
})

module.exports = router;