import express from "express";
import { getContacts, getContact, createContact, updateContact, deleteContact, bulkCreateContacts } from "../controllers.js/contactControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const router = express.Router();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/bulk").post(bulkCreateContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
export default router;