import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
const route = Router();

route.post("/register-user", registerUser);
route.post("/login-user", loginUser);

export default route;
