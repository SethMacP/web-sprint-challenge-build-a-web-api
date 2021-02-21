actionsModel = require('../actions/actions-model');


function validateActionID (){
    return (req,res,next) => {
            actionsModel.get(req.params.id)
            .then(res=>{
                if(res){
                    req.action = res;
                    next();
                }else{
                    res.status(404).json({message:'Nothing found with that ID'})
                }
            })
            .catch(err=>{
                res.status(404).json({message: "Server Error"})
            })

    }
}

function validateResource(){
    return( req , res , next ) => {
        if(!req.body){ 
            return res.status(400).json({message:"Missing body"})
        }
        if(!req.body.project_id){
            return res.status(400).json({message:"Missing project_id"})
        }
        if(!req.body.description){
           return res.status(400).json({message:"Missing description"})
        }
        if(!req.body.notes){
           return res.status(400).json({message:"Missing notes"})
        } 
        next(); 
}
}


module.exports = {
    validateActionID,
    validateResource
}