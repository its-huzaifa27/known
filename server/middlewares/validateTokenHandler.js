import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/usersModels.js";

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
   
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

export default validateToken;