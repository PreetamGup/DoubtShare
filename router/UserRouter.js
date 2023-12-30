import { Router } from "express";
import userController from "../controller/UserController.js";

const router = Router();

router.post("/login", userController.loginController)
router.post("/register", userController.registerController)
router.get("/logout", userController.logoutController)


export default router