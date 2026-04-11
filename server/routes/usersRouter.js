import express from "express";
import { registerUser,loginUser,currentUser } from "../controllers.js/usersController.js";
import validateToken from "../middlewares/validateTokenHandler.js";
const router = express();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser);
export default router