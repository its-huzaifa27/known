import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";


const validateToken = expressAsyncHandler(async (req, res,next) => {
    console.log("All headers:", req.headers);
    //to verify the access token 
    //craete a var 
    let token;

    // take the header token from header 
    let authHeader = req.headers.Authorization || req.headers.authorization;
   
    // making the token equals to header token
    if (authHeader && authHeader.startsWith("Bearer")) {

        token = authHeader.split(" ")[1];

        // verify it 
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(400);
                throw new Error("the user is not verified");
            }
                req.user = decoded.user;
                console.log(decoded.user)
                res.status(200).json(req.user);
                next();
        })
    }else{
        res.status(401);
        throw new Error("the function failed")
    }

})

export default validateToken