import { constants } from "../constant.js";
const errorHnadler = (req,res,error,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (key) {
        case constants.VALIDATION_ERROR:
            res.json({title :"the fields are invalid", message : error.message,stackTrace:error.stackTrace})
            break;
        case constants.NOT_FOUND:
            res.json({title :"not found", message : error.message,stackTrace:error.stackTrace}) 

        case constants.FORBIDDEN:
            res.json({title :"Fornidden", message : error.message,stackTrace:error.stackTrace})

        case constants.SERVER_ERROR:
            res.json({title :"not found", message : error.message,stackTrace:error.stackTrace})

        case constants.UNAUTHORIZED:
            res.json({title :"unauthorized user", message : error.message,stackTrace:error.stackTrace})
            
        default:
            res.json({message : "all good"})
            break;
    }
    
    res.json({title :"not found", message : error.message,stackTrace:error.stackTrace})
}

export {errorHnadler}