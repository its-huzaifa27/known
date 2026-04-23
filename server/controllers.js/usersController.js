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
        res.status(400);
        throw new Error("User already exists. Please login.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName,
        email,
        password: hashPassword
    });

    if (user) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }},
            process.env.ACCESS_TOKEN,
            { expiresIn: "30d" } // Increased for better UX during dev
        );
        res.status(201).json({ 
            accessToken, 
            user: { id: user.id, email: user.email, userName: user.userName } 
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// desc login user
// route Post /api/users/login
// access public
const loginUser = expressAsyncHandler (async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please fill all the login details");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user : {
                userName: user.userName,
                email: user.email,
                id: user.id
            }},
            process.env.ACCESS_TOKEN,
            { expiresIn: "30d" }
        );
        res.status(200).json({ 
            accessToken, 
            user: { id: user.id, email: user.email, userName: user.userName } 
        }); 
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});


// desc register user
// req type Post/users/register
//access private
const currentUser = async (req, res) => {
    res.status(200).json(req.user);
}

const changePassword = expressAsyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findById(req.user.id);

    if (user && (await bcrypt.compare(currentPassword, user.password))) {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    } else {
        res.status(401);
        throw new Error("Current password is incorrect");
    }
});


export {
    registerUser,
    loginUser,
    currentUser,
    changePassword
}