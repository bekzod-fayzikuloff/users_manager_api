import {Router} from "express";

import {catchValidationResult, userController} from "../controllers/users.js";
import {userLoginValidate, userRegisterValidate} from "../validations/user.validation.js";
import {authenticateToken} from "../middlewares/index.js";

const router = Router();


router.post("/register", userRegisterValidate, [catchValidationResult, userController.create])
router.post("/login",userLoginValidate, [catchValidationResult, userController.login])
router.get("/", [authenticateToken, userController.notBlocked,  userController.getAll])
router.get("/:id", [authenticateToken,  userController.getDetail])
router.patch("/:id", [authenticateToken, userController.notBlocked, userController.change])
router.delete("/:id", [authenticateToken, userController.notBlocked, userController.delete])


export {router as userRouter};