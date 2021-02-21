const model = require('../projects/projects-model')

function validateProjectID (){
    return (req,res,next) => {
            model.get(req.params.id)
            .then(project=>{
                if(project){
                    next();
                }else{
                    res.status(404).json({message:'Nothing found with that ID'})
                }
            })
            .catch(err=>{
                console.log("uh oh")
                res.status(500).json({message: "Server Error"})
            })
    }
}

function validateResource(){
    return( req , res , next ) => {
        if(!req.body){ 
            return res.status(400).json({message:"Missing body"})
        }
        if(!req.body.description){
           return res.status(400).json({message:"Missing description"})
        }
        if(!req.body.name){
           return res.status(400).json({message:"Missing notes"})
        } 
        next(); 
}
}

module.exports = {
    validateProjectID,
    validateResource,
}