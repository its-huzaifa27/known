import express from "express";
import { registerUser,loginUser,currentUser, changePassword } from "../controllers.js/usersController.js";
import validateToken from "../middlewares/validateTokenHandler.js";
const router = express();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser);
router.put("/change-password", validateToken, changePassword);
export default router