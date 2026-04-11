import { User } from "../models/usersModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler"


// desc register user
// req type Post/users/register
//access public
const registerUser = expressAsyncHandler (async(req, res) => {

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("all the fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(401);
        throw new Error("this user is available please login");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword)

    const user = await User.create({
        userName,
        email,
        password: hashPassword
    })

    if (user) {
        res.status(200);
        res.json({ _id: user.id, email: user.email })
    }
})


// desc login user
// req type Post/users/register
//access public
const loginUser = expressAsyncHandler (async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please fill all the login details");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password,user.password))) {
        const accessToken = jwt.sign({
            user : {
            userName: user.userName,
            email: user.email,
            id: user.id
        }},
        process.env.ACCESS_TOKEN,
        {
          expiresIn:  "15m"
        }    
        )
        res.status(200).json(accessToken); 
    }else{
        res.status(400);
        throw new Error("the user is not verified")
    }

    res.status(200).json("login with existing user");
})


// desc register user
// req type Post/users/register
//access private
const currentUser = async (req, res) => {
    res.status(200).json(req.user);
}


export {
    registerUser,
    loginUser,
    currentUser
}