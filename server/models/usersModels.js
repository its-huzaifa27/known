import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please enter your name"],

    },
    email: {
        type: String,
        required: [true, "please enter your working email"]
    },
    password: {
        type: String,
        required: [true, "enter your strong password"]
    }

},
    {
        timestamps: true
    }
)

export const User = mongoose.model ("User",usersSchema)