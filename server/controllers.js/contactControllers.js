import { Contact } from "../models/contactModels.js";
import bcrypt from "bcrypt";
//desc- get all contact
//route Get /api/contacts
//access public
const getContacts = async(req, res) => {
    const conatct = await Contact.find({user_id:req.user.id});
    res.status(200).json(conatct);
};


//desc- craete contact
//route Post /api/contacts
//access public
const createContact = async(req, res) => {
    const { name, email, phone } = req.body;
    console.log("the request body is:", req.body)
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("all the fields are mendatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id :req.user.id
    });
    res.status(200).json({ message: "craeted a contact" });
};

//desc- update a contact
//route Get /api/contacts
//access public
const getContact = async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
};

//desc- update a contact
//route Get /api/contacts
//access public
const updateContact = async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("contact is not in the data base");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedContact);
};

//desc- delete the contact
//route Get /api/contacts
//access public
const deleteContact = async(req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `delete the id :${req.params.id}` });
};


export {
    getContacts,getContact, createContact, updateContact, deleteContact
}