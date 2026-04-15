import express from "express";
import { getGroups, createGroup, updateGroup, deleteGroup } from "../controllers.js/groupControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const router = express.Router();

router.use(validateToken);
router.route("/").get(getGroups).post(createGroup);
router.route("/:id").put(updateGroup).delete(deleteGroup);

export default router;
