import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [ true ,"please enter the name "],
    },
    email : {
        type : String ,
        required : [true,"please enter the email"]
    },
    phone : {
        type : String,
        required : [true ,"please enter phone no "]
    }
}
,
{
    timestamps:true
})

export const Contact = mongoose.model("Contact", contactSchema);