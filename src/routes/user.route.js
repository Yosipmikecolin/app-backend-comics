import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
const route = Router();

route.get("/register-user", registerUser);
route.get("/login-user", loginUser);

export default route;
